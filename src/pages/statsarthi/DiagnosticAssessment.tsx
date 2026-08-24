import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { RoleSelector } from '@/components/statsarthi/RoleSelector';
import { roleProfiles } from '@/data/roleProfiles';
import { competencyDomains } from '@/data/competencyFramework';
import { RoleProfile, DiagnosticQuestion, FRACLevel, GapReport } from '@/types/statsarthi';
import { geminiService } from '@/services/geminiService';
import { computeGapReport } from '@/services/gapUtils';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function DiagnosticAssessment() {
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleProfile | null>(null);
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [report, setReport] = useState<GapReport | null>(null);
  const [language, setLanguage] = useState('English');

  const handleRoleSelect = async (selectedRole: RoleProfile) => {
    setRole(selectedRole);
    setLoading(true);
    setLoadingText('Generating custom diagnostic assessment...');
    try {
      let allQuestions: DiagnosticQuestion[] = [];
      // Only generate 1 question per required competency for demo speed
      for (const req of selectedRole.requiredCompetencies) {
        // Find competency area details
        let areaInfo = null;
        for (const domain of competencyDomains) {
          const area = domain.areas.find(a => a.id === req.competencyId);
          if (area) {
            areaInfo = area;
            break;
          }
        }
        
        if (areaInfo) {
          setLoadingText(`Generating questions for ${areaInfo.name}...`);
          
          const profileRaw = localStorage.getItem('statsarthi_profile');
          const profileContext = profileRaw ? JSON.parse(profileRaw) : undefined;
          
          const generated = await geminiService.generateDiagnosticQuestions(
            areaInfo.name, 
            areaInfo.subCompetencies, 
            'intermediate', 
            3,
            language,
            profileContext
          );
          allQuestions = [...allQuestions, ...generated];
        }
      }
      setQuestions(allQuestions);
    } catch (error) {
      toast.error("Failed to generate assessment. Please try again.");
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoadingText('Analyzing competency gaps and generating report...');
    try {
      // Compute real gap report from actual answers
      const report = computeGapReport(questions, answers, role!, competencyDomains);
      
      // Save latest report
      localStorage.setItem('latestGapReport', JSON.stringify(report));
      
      // Append to assessment history for before/after comparison
      const historyRaw = localStorage.getItem('assessmentHistory');
      const history: GapReport[] = historyRaw ? JSON.parse(historyRaw) : [];
      history.push(report);
      localStorage.setItem('assessmentHistory', JSON.stringify(history));
      
      toast.success('Assessment complete! Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to generate report.');
    } finally {
      setLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary-900">Assessment Language</h2>
              <p className="text-muted-foreground text-sm">Select the language for your diagnostic assessment.</p>
            </div>
            <div className="w-full md:w-64">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi (हिंदी)</SelectItem>
                  <SelectItem value="Marathi">Marathi (मराठी)</SelectItem>
                  <SelectItem value="Bengali">Bengali (বাংলা)</SelectItem>
                  <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
                  <SelectItem value="Telugu">Telugu (తెలుగు)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <RoleSelector onSelect={handleRoleSelect} />
        {loading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-primary-700">{loadingText}</h2>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-primary-700">{loadingText}</h2>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx) / questions.length) * 100;

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="text-muted-foreground hover:text-foreground hover:bg-muted -ml-4 rounded-full h-10 px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-foreground">Diagnostic Assessment</h1>
          <p className="text-muted-foreground/80 mt-4 text-lg">
            Assessing competencies for <span className="font-semibold text-primary">{role.designation}</span>
          </p>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-t-4 border-t-primary shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start gap-4 mb-2">
            <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-600">
              {currentQ.competencyArea}
            </span>
            <span className="inline-flex items-center rounded-full border border-surface-200 bg-surface-50 px-2.5 py-0.5 text-xs font-medium text-surface-600">
              {currentQ.difficulty}
            </span>
          </div>
          <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((opt, idx) => (
            <div 
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                answers[currentIdx] === idx 
                  ? 'border-primary bg-primary-50' 
                  : 'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  answers[currentIdx] === idx 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={answers[currentIdx] === idx ? 'font-medium text-primary-900' : 'text-foreground'}>
                  {opt}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between pt-6 border-t border-border mt-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentIdx(prev => prev - 1)}
            disabled={currentIdx === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          {currentIdx === questions.length - 1 ? (
            <Button 
              className="bg-success-600 hover:bg-success-700 text-white"
              disabled={answers[currentIdx] === undefined}
              onClick={handleSubmit}
            >
              Submit Assessment <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={() => setCurrentIdx(prev => prev + 1)}
              disabled={answers[currentIdx] === undefined}
            >
              Next Question <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
