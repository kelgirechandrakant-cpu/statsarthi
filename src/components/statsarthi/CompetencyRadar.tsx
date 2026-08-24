import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CompetencyRadarProps {
  data: {
    competency: string;
    required: number;
    current: number;
  }[];
}

export function CompetencyRadar({ data }: CompetencyRadarProps) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="competency" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 5]} 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickCount={6}
          />
          <Radar 
            name="Required Level" 
            dataKey="required" 
            stroke="hsl(var(--primary))" 
            fill="hsl(var(--primary))" 
            fillOpacity={0.1} 
          />
          <Radar 
            name="Your Current Level" 
            dataKey="current" 
            stroke="hsl(var(--success-500, 142 71% 45%))" 
            fill="hsl(var(--success-500, 142 71% 45%))" 
            fillOpacity={0.3} 
          />
          <Legend />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.5rem',
              color: 'hsl(var(--foreground))'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
