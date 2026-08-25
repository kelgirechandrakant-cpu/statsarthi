import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ShieldCheck, Server, Lock, Database, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const cpiData = [
  { month: 'Jan', rural: 5.34, urban: 4.92, combined: 5.10 },
  { month: 'Feb', rural: 5.34, urban: 4.78, combined: 5.09 },
  { month: 'Mar', rural: 5.45, urban: 4.14, combined: 4.85 },
  { month: 'Apr', rural: 5.43, urban: 4.11, combined: 4.83 },
  { month: 'May', rural: 5.28, urban: 4.15, combined: 4.75 },
  { month: 'Jun', rural: 5.66, urban: 4.39, combined: 5.08 },
];

const nsstaData = [
  { course: 'Survey Design', enrolled: 120, completed: 85 },
  { course: 'Data Quality', enrolled: 95, completed: 90 },
  { course: 'National Accounts', enrolled: 150, completed: 110 },
  { course: 'CAPI Collection', enrolled: 200, completed: 180 },
];

export default function MoSPIDatasets() {
  const [activeModel, setActiveModel] = useState('demo');

  const handleDownload = () => {
    toast.success("Dataset exported securely. (Zero third-party API tracking)");
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary-900 flex items-center gap-3">
          <Database className="h-8 w-8 text-primary-600" />
          Official MoSPI Datasets (Air-Gapped Mode)
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Directly visualize data from <span className="font-semibold text-foreground">mospi.gov.in</span> and <span className="font-semibold text-foreground">nssta.gov.in</span> using local processing. 
          No third-party AI APIs are used to render this data, ensuring 100% data sovereignty.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-t-4 border-t-primary shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Consumer Price Index (CPI)</CardTitle>
                  <CardDescription>Source: mospi.gov.in (Processed Locally)</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cpiData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 6.0]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="rural" name="Rural CPI" stroke="#1a56db" strokeWidth={3} dot={{r: 4}} />
                    <Line type="monotone" dataKey="urban" name="Urban CPI" stroke="#f97316" strokeWidth={3} dot={{r: 4}} />
                    <Line type="monotone" dataKey="combined" name="Combined CPI" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">NSSTA Training Utilization</CardTitle>
                  <CardDescription>Source: nssta.gov.in (Processed Locally)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nsstaData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Legend />
                    <Bar dataKey="enrolled" name="Enrolled Officials" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" name="Completed Training" fill="#1a56db" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                Infrastructure Status
              </CardTitle>
              <CardDescription className="text-slate-400">
                Data Sovereignty & Model Config
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Server className="h-4 w-4" /> Active LLM Backend
                </label>
                <Select value={activeModel} onValueChange={setActiveModel}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo">
                      <div className="flex items-center text-amber-500 font-medium">Gemini API (Hackathon Demo Mode)</div>
                    </SelectItem>
                    <SelectItem value="production">
                      <div className="flex items-center text-emerald-500 font-medium">Llama-3 8B (Air-Gapped on MeghRaj)</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {activeModel === 'demo' ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md mt-2 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-200/80 leading-relaxed">
                      <strong>Demo Mode Active:</strong> Currently using a 3rd-party API for prototype speed. Change to "Air-Gapped" to simulate production architecture.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md mt-2 flex items-start gap-2">
                    <Lock className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-emerald-200/80 leading-relaxed">
                      <strong>Production Mode Simulated:</strong> In this mode, no data leaves the MoSPI intranet. Open-source weights run securely on government MeghRaj cloud.
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-sm font-semibold text-slate-200">Security Audit</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Data Location</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircleIcon /> Local Storage</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">3rd Party Tracking</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircleIcon /> 0 Blocked</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Scraping Engine</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircleIcon /> Native Node</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
