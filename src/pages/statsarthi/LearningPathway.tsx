import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GapReport, PathwayStep } from '@/types/statsarthi';
import { generateLearningPathway } from '@/services/recommendationEngine';
import { igotCourses } from '@/data/igotCourses';
import { nsstaCourses } from '@/data/nsstaCourses';
import { CourseCard } from '@/components/statsarthi/CourseCard';
import { GraduationCap, ArrowRight, BookMarked, AlertCircle, KeyRound, ServerCog, Database, Link2, Brain } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LearningPathway() {
  const navigate = useNavigate();
  const [report, setReport] = useState<GapReport | null>(null);
  const [pathway, setPathway] = useState<PathwayStep[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('latestGapReport');
    if (saved) {
      const parsedReport = JSON.parse(saved);
      setReport(parsedReport);
      setPathway(generateLearningPathway(parsedReport));
    }
  }, []);

  if (!report) {
    return (
      <div className="container mx-auto py-24 px-4 text-center max-w-2xl">
        <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
        <h1 className="text-3xl font-bold tracking-tight text-primary-700 mb-4">Learning Pathway Unavailable</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You need to complete a diagnostic assessment first to generate your personalized learning pathway.
        </p>
        <Button size="lg" className="px-8" onClick={() => navigate('/assessment')}>
          Take Assessment <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 max-w-6xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Navigation & Header */}
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="text-muted-foreground hover:text-foreground hover:bg-muted -ml-4 rounded-full h-10 px-4"
        >
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back
        </Button>
        <div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-foreground">Personalized Learning Pathway</h1>
          <p className="text-muted-foreground/80 mt-4 text-lg max-w-2xl">
            Curated courses from iGOT Karmayogi and NSSTA specifically selected to bridge your competency gaps.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-3">
                <ServerCog className="h-6 w-6 text-primary-400" />
                API Architecture Readiness
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                The iGOT courses below are illustrative placeholders mapped to the open-source <strong className="text-white">Sunbird telemetry schema</strong>. The NSSTA courses are real data from the FY 2021-22 calendar.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Ecosystem Ready
              </span>
            </div>
          </div>

          <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-6">Production API Flow</h4>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Step 1: SSO */}
              <div className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-5 text-center relative group hover:border-primary-500 transition-colors">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-primary-900/50 transition-colors">
                  <KeyRound className="h-6 w-6 text-slate-300 group-hover:text-primary-400" />
                </div>
                <h5 className="font-semibold text-white mb-1">Jan Parichay SSO</h5>
                <p className="text-xs text-slate-400">Official MoSPI Auth</p>
              </div>

              <ArrowRight className="hidden md:block h-6 w-6 text-slate-600 shrink-0" />
              <div className="md:hidden h-6 w-px bg-slate-700"></div>

              {/* Step 2: Engine */}
              <div className="flex-1 w-full bg-primary-900 border border-primary-700 rounded-xl p-5 text-center shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary-800 flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h5 className="font-semibold text-white mb-1">StatSarthi Engine</h5>
                <p className="text-xs text-primary-200">Maps Gaps to Schema</p>
              </div>

              <ArrowRight className="hidden md:block h-6 w-6 text-slate-600 shrink-0" />
              <div className="md:hidden h-6 w-px bg-slate-700"></div>

              {/* Step 3: Sunbird */}
              <div className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-5 text-center relative group hover:border-emerald-500 transition-colors">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-emerald-900/50 transition-colors">
                  <Database className="h-6 w-6 text-slate-300 group-hover:text-emerald-400" />
                </div>
                <h5 className="font-semibold text-white mb-1">Karmayogi Bharat</h5>
                <p className="text-xs text-slate-400">Sunbird Search API</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {pathway.length === 0 ? (
        <div className="text-center p-12 bg-success-50 rounded-xl border border-success-200">
          <h3 className="text-2xl font-semibold text-success-900 mb-2">You have no competency gaps!</h3>
          <p className="text-success-700">You have met or exceeded all requirements for your role. Keep up the excellent work.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {pathway.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border translate-x-[2.5rem]" />
              
              <div className="md:grid md:grid-cols-12 gap-8 items-start relative">
                <div className="md:col-span-3 flex flex-col items-start md:items-end md:text-right pt-2 pb-4 md:pb-0 z-10">
                  <div className="flex items-center gap-3 md:flex-row-reverse">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold shadow-md ring-4 ring-background">
                      {step.priority}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground capitalize">
                        {step.competencyArea.replace('-', ' ')}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Level {step.currentLevel} → <span className="font-bold text-primary">Level {step.targetLevel}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-9 space-y-6 bg-surface-50 rounded-xl border border-border p-6 shadow-sm">
                  <h4 className="flex items-center gap-2 font-medium text-surface-700">
                    <BookMarked className="h-5 w-5 text-primary" />
                    Recommended Training Modules
                  </h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {step.recommendedCourses.igot.map(courseId => {
                      const course = igotCourses.find(c => c.id === courseId);
                      return course ? <CourseCard key={course.id} course={course} type="igot" /> : null;
                    })}
                    
                    {step.recommendedCourses.nssta.map(courseId => {
                      const course = nsstaCourses.find(c => c.id === courseId);
                      return course ? <CourseCard key={course.id} course={course} type="nssta" /> : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
