import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Shield, Users, Database, BookOpen, GraduationCap } from "lucide-react";

export default function AboutMission() {
  return (
    <div className="min-h-screen bg-surface-50 pb-20">
      
      {/* Hero */}
      <div className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Mission & Context</h1>
          <p className="text-xl text-primary-100 max-w-3xl leading-relaxed">
            Addressing Problem Statement SIH26101: AI-Powered Capacity Building for India's Official Statistical System.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-12 space-y-12">
        
        {/* Background */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-8 w-8 text-primary-600" />
            <h2 className="text-3xl font-bold text-primary-900">The Challenge</h2>
          </div>
          <Card className="border-border shadow-sm">
            <CardContent className="pt-6 space-y-4 text-surface-600 leading-relaxed text-lg">
              <p>
                India's statistical system is undergoing rapid technology advancement with increasing adoption of Artificial Intelligence (AI), Machine Learning (ML), Big Data Analytics, GIS, cloud computing, and modern statistical methodologies.
              </p>
              <p>
                Officials engaged in data collection, processing, analysis, dissemination, and policy support require continuous upskilling to meet evolving technological and domain-specific requirements.
              </p>
              <p className="font-medium text-primary-800">
                While the iGOT Karmayogi platform offers a vast repository of learning resources, officials often face challenges in identifying the most relevant courses aligned with their job roles, current competencies, and future skill requirements. 
              </p>
              <p>
                Presently, there is no intelligent mechanism that performs comprehensive skill-gap assessment and recommends personalized learning pathways specifically for professionals working in Official Statistics.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FRAC Alignment */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-8 w-8 text-accent-600" />
            <h2 className="text-3xl font-bold text-primary-900">FRAC Framework Alignment</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary-900">The 4 Competency Domains</CardTitle>
                <CardDescription>Mapped to MoSPI requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-surface-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Statistical:</strong> Survey design, sampling, national accounts, and price statistics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Technical:</strong> Python, R, data visualization, and database management.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Digital Governance:</strong> AI/ML, MeghRaj cloud, and cybersecurity protocols.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <span><strong>Behavioural & Managerial:</strong> Leadership, communication, and project management.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary-900">Proficiency Levels</CardTitle>
                <CardDescription>Mission Karmayogi Standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { level: 1, name: 'Aware', desc: 'Basic knowledge, requires supervision' },
                    { level: 2, name: 'Apply', desc: 'Can perform tasks with some guidance' },
                    { level: 3, name: 'Advise', desc: 'Independent expert, can guide others' },
                    { level: 4, name: 'Expert', desc: 'Deep expertise, handles complex issues' },
                    { level: 5, name: 'Ustad', desc: 'Thought leader, shapes policy and frameworks' },
                  ].map((lvl) => (
                    <div key={lvl.level} className="flex items-center gap-3 bg-surface-50 p-2 rounded-md">
                      <div className="h-8 w-8 rounded bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                        L{lvl.level}
                      </div>
                      <div>
                        <div className="font-bold text-primary-900">{lvl.name}</div>
                        <div className="text-xs text-surface-500">{lvl.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Solution */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-8 w-8 text-success-600" />
            <h2 className="text-3xl font-bold text-primary-900">The StatSarthi Solution</h2>
          </div>
          <Card className="border-border shadow-sm bg-gradient-to-br from-white to-primary-50/30">
            <CardContent className="pt-8 pb-8">
              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="flex flex-col text-center items-center">
                  <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2">1. Diagnose</h3>
                  <p className="text-sm text-surface-600">
                    AI-powered diagnostic assessments evaluate an official's current FRAC levels across all mapped competencies for their specific role.
                  </p>
                </div>
                
                <div className="flex flex-col text-center items-center">
                  <div className="h-16 w-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2">2. Recommend</h3>
                  <p className="text-sm text-surface-600">
                    The engine cross-references identified gaps with the iGOT catalog (Sunbird schema) and NSSTA training programs to generate a personalized learning pathway.
                  </p>
                </div>

                <div className="flex flex-col text-center items-center">
                  <div className="h-16 w-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-success-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2">3. Assess</h3>
                  <p className="text-sm text-surface-600">
                    Continuous learning is supported by the Gemini AI Quiz Generator, instantly turning PDF manuals into Bloom's Taxonomy-aligned MCQs.
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
