import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Shield, Users, BarChart3, GraduationCap } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary-50/50 -z-10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-100/50 to-transparent -z-10" />
        
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
            Built for Smart India Hackathon 2026 (Problem Statement SIH26101 — MoSPI)
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-900 mb-6 leading-tight">
            AI-Powered Capacity Building for India's <span className="text-primary-600">Official Statistical System</span>
          </h1>
          
          <p className="text-xl text-surface-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            StatSarthi identifies competency gaps in MoSPI officials and recommends personalized iGOT Karmayogi learning pathways to bridge them.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg" asChild>
              <Link to="/assessment">
                Start Diagnostic Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
              <Link to="/quiz">
                Try Quiz Generator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">The Three Pillars of StatSarthi</h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              A comprehensive solution aligned with Mission Karmayogi's FRAC framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
            {/* Feature 1: Large Span */}
            <div className="md:col-span-8 p-10 rounded-[2rem] bg-gradient-to-br from-primary-50 to-white border border-primary-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-sm border border-primary-100 flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500">
                    <Target className="h-8 w-8 text-primary-700" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">AI Gap Finder</h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                    Role-based diagnostic assessments using AI to map an official's current skills against the 4 domains of the competency framework.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Vertical Stack */}
            <div className="md:col-span-4 p-8 rounded-[2rem] bg-slate-900 text-white border border-slate-800 shadow-xl hover:-translate-y-2 transition-transform duration-500">
              <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6">
                <GraduationCap className="h-7 w-7 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Pathway Recommender</h3>
              <p className="text-slate-400 leading-relaxed">
                Personalized learning journeys curating relevant illustrative iGOT modules and real NSSTA TPAC programmes to bridge identified gaps.
              </p>
            </div>

            {/* Feature 3: Wide Bottom */}
            <div className="md:col-span-12 p-10 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:border-primary-300 transition-colors duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="h-14 w-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-primary-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Quiz Generator</h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  Instantly convert any training manual, PDF, or document into high-quality MCQs mapped to Bloom's Taxonomy levels.
                </p>
              </div>
              <div className="hidden md:block">
                {/* Decorative element */}
                <div className="w-32 h-32 rounded-full border-8 border-primary-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary-100 animate-pulse opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary-900 text-primary-100 py-12 mt-auto">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-accent-500" />
            <span className="text-2xl font-bold text-white">StatSarthi</span>
          </div>
          <div className="text-center md:text-right text-sm text-primary-300">
            <p>Smart India Hackathon 2026 Submission</p>
            <p className="mt-1">Ministry of Statistics and Programme Implementation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
