import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CompetencyRadar } from '@/components/statsarthi/CompetencyRadar';
import { GapReport, FRAC_LEVEL_LABELS } from '@/types/statsarthi';
import { roleProfiles } from '@/data/roleProfiles';
import { AlertCircle, Target, TrendingUp, BookOpen, GraduationCap, ChevronRight, Download, BarChart3, ArrowRight, Clock } from 'lucide-react';
import { getGapSeverity, GAP_SEVERITY_CONFIG, GapSeverity } from '@/services/gapUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LearnerDashboard() {
  const navigate = useNavigate();
  const [report, setReport] = useState<GapReport | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [previousReport, setPreviousReport] = useState<GapReport | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('statsarthi_profile');
    if (!savedProfile) {
      navigate('/onboarding');
      return;
    }
    setProfile(JSON.parse(savedProfile));

    const saved = localStorage.getItem('latestGapReport');
    if (saved) {
      setReport(JSON.parse(saved));
      // Load previous assessment for before/after comparison
      const historyRaw = localStorage.getItem('assessmentHistory');
      if (historyRaw) {
        const history: GapReport[] = JSON.parse(historyRaw);
        if (history.length >= 2) {
          setPreviousReport(history[history.length - 2]);
        }
      }
    }
  }, []);

  // Mock data for overall progress chart
  const progressData = [
    { month: 'Jan', score: 35 },
    { month: 'Feb', score: 42 },
    { month: 'Mar', score: 48 },
    { month: 'Apr', score: 55 },
    { month: 'May', score: Math.round(report?.overallScore || 60) },
  ];

  if (!report) {
    const userRole = profile?.designation ? roleProfiles.find(r => r.id === profile.designation) : null;

    return (
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="mx-auto bg-primary/10 w-20 h-20 flex items-center justify-center rounded-full mb-6">
            <Target className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Welcome, {profile?.name || 'Officer'}</h1>
          <p className="text-lg text-slate-600 mb-8">
            You are registered as a <strong className="text-primary">{userRole ? userRole.title : (profile?.designation || 'MoSPI Official')}</strong>. 
            To personalize your capacity building journey, you need to map your current skills against your role's FRAC requirements.
          </p>
          <Button size="lg" className="px-8 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg" onClick={() => navigate('/assessment')}>
            Start Diagnostic Assessment <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {userRole && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mt-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Required Competencies</h2>
            <p className="text-slate-500 mb-6">According to the MoSPI Capacity Building Framework, your role requires proficiency in these areas:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRole.requiredCompetencies.map((comp) => (
                <div key={comp.competencyId} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="font-medium text-slate-700 capitalize">{comp.competencyId.replace(/-/g, ' ')}</span>
                  <Badge variant="outline" className="bg-white border-primary/20 text-primary">
                    Level {comp.requiredLevel}: {FRAC_LEVEL_LABELS[comp.requiredLevel as keyof typeof FRAC_LEVEL_LABELS]}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Format data for radar
  const radarData = report.domainScores.flatMap(domain => 
    domain.areas.map(a => ({
      competency: a.competencyName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      required: a.requiredLevel,
      current: a.currentLevel
    }))
  );

  const totalGaps = report.domainScores.flatMap(d => d.areas).filter(a => a.gap > 0).length;

  return (
    <div className="container mx-auto py-12 md:py-16 px-4 max-w-6xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 print:py-4 print:space-y-4 print:max-w-none print:w-full">
      
      {/* Official Print Header (Only visible in PDF export) */}
      <div className="hidden print:flex flex-col items-center justify-center border-b-2 border-primary-900 pb-6 mb-6">
        <BarChart3 className="h-12 w-12 text-primary-900 mb-2" />
        <h1 className="text-2xl font-bold text-primary-900 uppercase tracking-widest">Ministry of Statistics and Programme Implementation</h1>
        <h2 className="text-xl font-semibold mt-1">Official Competency Gap Report (FRAC)</h2>
        <p className="text-sm text-gray-500 mt-2">Generated by StatSarthi • Assessment Date: {new Date(report.assessedAt).toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:flex-row print:items-end">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-foreground print:text-2xl print:hidden">Learner Dashboard</h1>
          <p className="text-muted-foreground/80 text-lg print:hidden">
            Your competency profile and personalized learning pathway.
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            Prototype Assessment-Calibration Layer (Percentage to FRAC mapping subject to official MoSPI validation)
          </div>
          <div className="hidden print:block text-sm mt-4">
            <p><strong>Official ID:</strong> {report.userId}</p>
            <p><strong>Role Profile:</strong> {report.roleId}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="print:hidden" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <div className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border print:border-none print:bg-transparent print:p-0">
            <div className="bg-primary/10 p-2 rounded-full print:hidden">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="text-right print:text-left">
              <p className="text-sm font-medium text-muted-foreground">Overall FRAC Level</p>
              <p className="text-xl font-bold text-foreground print:text-lg">
                Level {report.overallLevel} ({FRAC_LEVEL_LABELS[report.overallLevel as 1|2|3|4|5]})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 print:block print:space-y-6">
        <div className="md:col-span-2 space-y-8 print:space-y-6">
          <Card className="shadow-md print:shadow-none print:border-none print:break-inside-avoid">
            <CardHeader className="print:p-0 print:mb-4">
              <CardTitle className="print:text-lg">Competency Radar</CardTitle>
              <CardDescription className="print:hidden">Visual mapping of your current levels vs required levels for your role.</CardDescription>
            </CardHeader>
            <CardContent className="print:p-0">
              <CompetencyRadar data={radarData} />
            </CardContent>
          </Card>

          {/* Before/After Improvement Tracker */}
          {previousReport && (
            <Card className="shadow-md print:shadow-none print:border-none print:break-inside-avoid mt-8">
              <CardHeader className="print:p-0 print:mb-4">
                <CardTitle className="flex items-center gap-2 print:text-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Competency Improvement
                </CardTitle>
                <CardDescription className="print:hidden">Comparing your latest assessment with the previous one.</CardDescription>
              </CardHeader>
              <CardContent className="print:p-0">
                <div className="space-y-3">
                  {report.domainScores.flatMap(d => d.areas).map(area => {
                    const prevArea = previousReport.domainScores.flatMap(d => d.areas).find(a => a.competencyId === area.competencyId);
                    const prevLevel = prevArea?.currentLevel ?? area.currentLevel;
                    const delta = area.currentLevel - prevLevel;
                    return (
                      <div key={area.competencyId} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted">
                        <span className="font-medium text-sm">{area.competencyName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Level {prevLevel} → Level {area.currentLevel}</span>
                          {delta > 0 ? (
                            <Badge className="bg-green-100 text-green-800 border-green-300">↑ +{delta}</Badge>
                          ) : delta < 0 ? (
                            <Badge className="bg-red-100 text-red-800 border-red-300">↓ {delta}</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">No change</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary-200">
                  <p className="text-sm font-semibold text-primary">
                    Overall: Level {previousReport.overallLevel} → Level {report.overallLevel}
                    {report.overallLevel > previousReport.overallLevel && (
                      <span className="ml-2 text-green-700">↑ Improved by {report.overallLevel - previousReport.overallLevel} level(s)</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="shadow-md print:shadow-none print:border-none print:break-inside-avoid mt-8">
            <CardHeader className="print:p-0 print:mb-4">
              <CardTitle className="print:text-lg border-b pb-2">Identified Gaps</CardTitle>
              <CardDescription className="print:hidden">Areas where upskilling is recommended.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 print:p-0 print:space-y-2">
              {report.domainScores.flatMap(d => d.areas).filter(a => a.gap > 0).map(area => (
                <div key={area.competencyId} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 border border-warning-200 bg-warning-50 rounded-lg print:border-b print:border-gray-200 print:bg-transparent print:p-2 print:rounded-none">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5 shrink-0 print:hidden" />
                    <div>
                      <h4 className="font-semibold text-warning-900 print:text-black">{area.competencyName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h4>
                      <p className="text-sm text-warning-700 mt-1 print:text-gray-600">
                        Required: <span className="font-bold">Level {area.requiredLevel}</span> • 
                        Current: <span className="font-bold">Level {area.currentLevel}</span>
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`w-fit print:border-none print:text-black print:font-bold print:p-0 ${
                      GAP_SEVERITY_CONFIG[getGapSeverity(area.gap)].bgColor
                    } ${
                      GAP_SEVERITY_CONFIG[getGapSeverity(area.gap)].color
                    } ${
                      GAP_SEVERITY_CONFIG[getGapSeverity(area.gap)].borderColor
                    }`}
                  >
                    {GAP_SEVERITY_CONFIG[getGapSeverity(area.gap)].label} Gap ({area.gap} Level{area.gap !== 1 ? 's' : ''})
                  </Badge>
                </div>
              ))}

              {totalGaps === 0 && (
                <div className="text-center p-8 bg-success-50 rounded-lg border border-success-200 print:bg-transparent print:border-none print:text-left print:p-0">
                  <h4 className="font-semibold text-success-900 text-lg print:text-black">All Requirements Met</h4>
                  <p className="text-success-700 print:text-gray-600">You have met or exceeded all competency requirements for your current role.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 print:hidden">
          <Card className="shadow-md border-primary-200 bg-primary/10/50">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Learning Pathway
              </CardTitle>
              <CardDescription className="text-primary/80">
                Curated iGOT & NSSTA courses based on your gaps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-900 mb-6">
                Based on your diagnostic assessment, we have generated a personalized learning pathway containing {totalGaps > 0 ? 'recommended courses to bridge your competency gaps' : 'advanced courses for continuous learning'}.
              </p>
              <Button asChild className="w-full">
                <Link to="/pathway">
                  View Pathway <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-surface-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Reassessment
              </CardTitle>
              <CardDescription>
                Retake the diagnostic to measure your competency improvement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => navigate('/assessment')}>
                Retake Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {previousReport && (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Last assessed: {new Date(previousReport.assessedAt).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b pb-3">
                  <span className="text-foreground font-medium">Diagnostic Assessment</span>
                  <span className="text-muted-foreground">{new Date(report.assessedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-medium">Profile Created</span>
                  <span className="text-muted-foreground">{new Date(report.assessedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



