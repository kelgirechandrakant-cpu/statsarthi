import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, Target, TrendingUp, Download, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GapReport } from '@/types/statsarthi';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const forecastingData = [
  { year: '2026', currentSupply: 1200, requiredDemand: 1300 },
  { year: '2027', currentSupply: 1100, requiredDemand: 1500 },
  { year: '2028', currentSupply: 950, requiredDemand: 1800 },
  { year: '2029', currentSupply: 800, requiredDemand: 2200 },
];

const emergingSkillsData = [
  { subject: 'Cloud (MeghRaj)', A: 85, fullMark: 100 },
  { subject: 'Big Data', A: 90, fullMark: 100 },
  { subject: 'Predictive Analytics', A: 75, fullMark: 100 },
  { subject: 'Geospatial mapping', A: 60, fullMark: 100 },
  { subject: 'CAPI Advanced', A: 80, fullMark: 100 },
  { subject: 'Cybersecurity', A: 95, fullMark: 100 },
];

const effectivenessData = [
  { name: 'Survey Design', before: 2.1, after: 0.5 },
  { name: 'Data Privacy', before: 1.8, after: 0.4 },
  { name: 'CAPI', before: 1.2, after: 0.2 },
];

const gapData = [
  { name: 'Survey Design', gap: 2.1, officials: 450 },
  { name: 'Data Privacy', gap: 1.8, officials: 320 },
  { name: 'National Accounts', gap: 1.5, officials: 280 },
  { name: 'CAPI Collection', gap: 1.2, officials: 600 },
  { name: 'AI & ML', gap: 2.4, officials: 150 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOfficials: 1248,
    avgFracLevel: 3.2,
    criticalGaps: 84,
    coursesAssigned: 3492
  });

  const [recentAssessments, setRecentAssessments] = useState([
    { name: 'R. Sharma', role: 'JSO', score: 'Level 2', date: '2 hrs ago' },
    { name: 'S. Patel', role: 'SSO', score: 'Level 4', date: '5 hrs ago' },
    { name: 'A. Gupta', role: 'Director', score: 'Level 4', date: '1 day ago' },
    { name: 'M. Reddy', role: 'JSO', score: 'Level 1', date: '1 day ago' }
  ]);

  useEffect(() => {
    // Read real user data from local storage to blend into admin dashboard
    const historyRaw = localStorage.getItem('assessmentHistory');
    const profileRaw = localStorage.getItem('statsarthi_profile');
    
    if (historyRaw) {
      const history: GapReport[] = JSON.parse(historyRaw);
      if (history.length > 0) {
        const latest = history[history.length - 1];
        const profile = profileRaw ? JSON.parse(profileRaw) : { fullName: 'Current User' };
        
        // Calculate how many critical gaps this user has
        const userCriticalGaps = latest.domainScores
          .flatMap(d => d.areas)
          .filter(a => a.gap >= 4).length;
        
        // Add real user to recent assessments
        const userAssessment = {
          name: profile.fullName || 'Current User',
          role: latest.roleId.toUpperCase(),
          score: `Level ${latest.overallLevel}`,
          date: 'Just now'
        };
        
        setRecentAssessments(prev => [userAssessment, ...prev.slice(0, 3)]);
        
        // Update stats dynamically to reflect the real user
        setStats(prev => ({
          totalOfficials: 1248 + 1,
          avgFracLevel: Number(((3.2 * 1248 + latest.overallLevel) / 1249).toFixed(1)),
          criticalGaps: 84 + userCriticalGaps,
          coursesAssigned: 3492 + 3 // Estimating 3 courses mapped
        }));
      }
    }
  }, []);

  return (
    <div className="container mx-auto py-24 px-4 max-w-7xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 mb-4">
            <Shield className="h-3 w-3" />
            Environment: SIH MVP Prototype &nbsp;&nbsp;|&nbsp;&nbsp; Target Production: MeghRaj (GI-Cloud)
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-700">Administrator Dashboard (Sunbird Obsrv Telemetry)</h1>
          <p className="text-muted-foreground mt-2">
            Macro-level view of statistical system operational readiness and predictive capacity planning.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Telemetry Report
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Officials</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOfficials.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg FRAC Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">{stats.avgFracLevel}</div>
            <p className="text-xs text-muted-foreground mt-1">Advise Level</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical Gaps</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger-600">{stats.criticalGaps.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Officials needing urgent training</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses Assigned</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesAssigned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across iGOT and NSSTA</p>
          </CardContent>
        </Card>
      </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Workforce Competency Distribution</CardTitle>
            <CardDescription>Heatmaps illustrating the density of specific skills across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gapData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                  <XAxis type="number" domain={[0, 3]} />
                  <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="gap" name="Avg Gap Level (FRAC)" radius={[0, 4, 4, 0]}>
                    {gapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.gap > 2 ? '#ef4444' : entry.gap > 1.5 ? '#f97316' : '#eab308'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <p>
                <strong>Action Required:</strong> AI & ML and Survey Design show critical national deficits (&gt;2.0 gap). 
                Recommend scheduling immediate NSSTA intervention batches for these cohorts.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Ecosystem Telemetry</CardTitle>
            <CardDescription>Platform usage metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Validation Quizzes Passed</span>
                <span className="font-bold text-emerald-600">68%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[68%]" />
              </div>
              <p className="text-xs text-slate-400 mt-1">452 officials leveled up their FRAC score</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Total Karma Points Issued</span>
                <span className="font-bold text-amber-500">125,400</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[100%]" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-semibold mb-3">Top Recommended iGOT Courses</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex justify-between"><span>1. Intro to Data Governance</span> <strong>340</strong></li>
                <li className="flex justify-between"><span>2. CAPI Mobile Collection</span> <strong>280</strong></li>
                <li className="flex justify-between"><span>3. Advanced Excel for Stats</span> <strong>195</strong></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NEW TELEMETRY CHARTS FROM BLUEPRINT */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Predictive Analytics & Capacity Planning</CardTitle>
            <CardDescription>Forecasting structural skill deficits (Demand vs Supply)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="currentSupply" stroke="#3b82f6" name="Current Trained Supply" strokeWidth={2} />
                  <Line type="monotone" dataKey="requiredDemand" stroke="#ef4444" name="Projected Demand" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Training Effectiveness Evaluation (ROI)</CardTitle>
            <CardDescription>Pre vs Post Assessment Gap Correlation via IRT</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={effectivenessData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" name="Gap Before Training" fill="#f87171" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="after" name="Gap After Training" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="shadow-sm border-primary-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-500" />
              Knowledge Graph: FRAC to Training Mapping
            </CardTitle>
            <CardDescription>Visualizing how identified competency gaps automatically map to training interventions across the Official Statistical System.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-surface-50 p-6 rounded-xl border border-border flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
              
              {/* Node 1: Domain */}
              <div className="bg-white p-4 rounded-lg border-2 border-primary-100 shadow-sm w-48 text-center shrink-0 relative z-10">
                <div className="text-xs font-bold text-primary-500 uppercase tracking-wide mb-1">Domain</div>
                <div className="font-semibold text-foreground">Technical</div>
              </div>

              {/* Edge */}
              <div className="h-1 w-12 bg-primary-200 hidden md:block shrink-0 relative">
                <div className="absolute -top-1.5 -right-1 w-4 h-4 text-primary-300">▶</div>
              </div>
              <div className="h-8 w-1 bg-primary-200 block md:hidden shrink-0 relative">
                <div className="absolute -bottom-1 -left-1.5 w-4 h-4 text-primary-300 rotate-90">▶</div>
              </div>

              {/* Node 2: Competency Area */}
              <div className="bg-white p-4 rounded-lg border-2 border-warning-200 shadow-sm w-48 text-center shrink-0 z-10 relative">
                <div className="text-xs font-bold text-warning-600 uppercase tracking-wide mb-1">Competency Area</div>
                <div className="font-semibold text-foreground">Data Privacy</div>
                <div className="text-xs text-danger-600 mt-2 font-medium">Systemic Gap: -1.8 Levels</div>
              </div>

              {/* Edge */}
              <div className="h-1 w-12 bg-primary-200 hidden md:block shrink-0 relative">
                <div className="absolute -top-1.5 -right-1 w-4 h-4 text-primary-300">▶</div>
              </div>
              <div className="h-8 w-1 bg-primary-200 block md:hidden shrink-0 relative">
                <div className="absolute -bottom-1 -left-1.5 w-4 h-4 text-primary-300 rotate-90">▶</div>
              </div>

              {/* Node 3: Affected Roles */}
              <div className="bg-white p-4 rounded-lg border-2 border-secondary-200 shadow-sm w-48 text-center shrink-0 z-10 relative">
                <div className="text-xs font-bold text-secondary-600 uppercase tracking-wide mb-1">Affected Roles</div>
                <div className="font-semibold text-foreground">JSO, SSO</div>
                <div className="text-xs text-muted-foreground mt-2">Target: Level 3 (Advise)</div>
              </div>

              {/* Edge */}
              <div className="h-1 w-12 bg-primary-200 hidden md:block shrink-0 relative">
                <div className="absolute -top-1.5 -right-1 w-4 h-4 text-primary-300">▶</div>
              </div>
              <div className="h-8 w-1 bg-primary-200 block md:hidden shrink-0 relative">
                <div className="absolute -bottom-1 -left-1.5 w-4 h-4 text-primary-300 rotate-90">▶</div>
              </div>

              {/* Node 4: Recommended Interventions */}
              <div className="bg-white p-4 rounded-lg border-2 border-success-200 shadow-sm w-48 text-center shrink-0 z-10 relative">
                <div className="text-xs font-bold text-success-600 uppercase tracking-wide mb-1">Interventions</div>
                <div className="font-semibold text-foreground text-sm">NSSTA Cybersecurity</div>
                <div className="text-xs text-muted-foreground mt-1">+ iGOT InfoSec Module</div>
                <Button size="sm" variant="outline" className="w-full mt-3 h-7 text-xs border-success-200 text-success-700">Auto-Assign</Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


