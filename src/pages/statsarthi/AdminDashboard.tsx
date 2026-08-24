import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, Target, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GapReport } from '@/types/statsarthi';

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
          <h1 className="text-3xl font-bold tracking-tight text-primary-700">Training Coordinator Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of competency gaps and training metrics across the department.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Report
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

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Top Competency Gaps</CardTitle>
            <CardDescription>Areas with the largest deficit across all roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Data Privacy & Protection</span>
                <span className="text-danger-600 font-semibold">-1.8 Avg Gap</span>
              </div>
              <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full bg-danger-500 w-[85%] rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">AI & Machine Learning</span>
                <span className="text-warning-600 font-semibold">-1.4 Avg Gap</span>
              </div>
              <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full bg-warning-500 w-[65%] rounded-full" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Cloud Computing (MeghRaj)</span>
                <span className="text-warning-600 font-semibold">-1.2 Avg Gap</span>
              </div>
              <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full bg-warning-500 w-[55%] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Latest diagnostic results from officials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssessments.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-surface-50 rounded-lg transition-colors border border-transparent hover:border-border">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary-700">{item.score}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="shadow-sm border-primary-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🕸️</span>
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
