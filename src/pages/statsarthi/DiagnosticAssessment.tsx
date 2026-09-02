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
      // Collect all competency area info for the selected role
      const competencyAreas: { name: string; subCompetencies: string[]; id: string }[] = [];
      for (const req of selectedRole.requiredCompetencies) {
        for (const domain of competencyDomains) {
          const area = domain.areas.find(a => a.id === req.competencyId);
          if (area) {
            competencyAreas.push({ name: area.name, subCompetencies: area.subCompetencies, id: area.id });
            break;
          }
        }
      }

      const profileRaw = localStorage.getItem('statsarthi_profile');
      const profileContext = profileRaw ? JSON.parse(profileRaw) : undefined;

      setLoadingText(`Generating ${competencyAreas.length * 2} diagnostic questions across ${competencyAreas.length} competency areas...`);

      // SINGLE API call for ALL competency areas (prevents free-tier rate limit exhaustion)
      const allQuestions = await geminiService.generateBatchDiagnosticQuestions(
        competencyAreas,
        'intermediate',
        2,
        language,
        profileContext
      );

      setQuestions(allQuestions);
    } catch (error) {
      toast.error(`API Error: ${error instanceof Error ? error.message : "Unknown error"}. Check DevTools Console.`); console.error("Gemini API Error:", error);
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
      <div className="container mx-auto py-24 px-4 relative">
        <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl border border-border shadow-sm relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary-900">Assessment Language</h2>
              <p className="text-sm text-slate-500">Choose the language for your diagnostic questions.</p>
            </div>
            <div className="w-[200px]">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <RoleSelector onSelect={handleRoleSelect} />
        {loading && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-4 border-primary-400 animate-spin opacity-75" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-4 rounded-full border-b-4 border-primary-300 animate-spin opacity-50" style={{ animationDuration: '2s' }}></div>
                <Brain className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">StatSarthi AI Engine</h2>
              <p className="text-slate-500 font-medium h-12 flex items-center justify-center text-sm">{loadingText}</p>
              
              <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden relative">
                <div className="bg-primary h-full rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-full origin-left scale-x-[0.85] opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="w-full flex justify-between mt-3 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <span>Connecting to LLM</span>
                <span>Generating payload</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-primary-100 flex flex-col items-center text-center animate-in fade-in duration-500">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-r-4 border-primary-400 animate-spin opacity-75" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 rounded-full border-b-4 border-primary-300 animate-spin opacity-50" style={{ animationDuration: '2s' }}></div>
            <Brain className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Responses</h2>
          <p className="text-slate-500 font-medium h-12 flex items-center justify-center text-sm">{loadingText}</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full rounded-full animate-pulse transition-all duration-500 w-[90%]"></div>
          </div>
          <div className="w-full flex justify-between mt-3 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            <span>Mapping Gaps</span>
            <span>FRAC Evaluation</span>
          </div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Assessment Generation Failed</h2>
        <p className="text-slate-600 mb-6">The Gemini API could not generate valid questions. Check your API key or DevTools console for details.</p>
        <Button onClick={() => navigate('/dashboard')} variant="default">Return to Dashboard</Button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  
  if (!currentQ) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Question Data</h2>
        <p className="text-slate-600 mb-6">The local AI returned malformed question data.</p>
        <Button onClick={() => navigate('/dashboard')} variant="default">Return to Dashboard</Button>
      </div>
    );
  }

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


