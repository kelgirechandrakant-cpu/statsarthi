import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IGOTCourse, NSSTACourse } from '@/types/statsarthi';
import { ExternalLink, Clock, Target, Building, BrainCircuit } from 'lucide-react';
import { toast } from 'sonner';

import { CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: IGOTCourse | NSSTACourse;
  type: 'igot' | 'nssta';
  onValidate?: () => void;
  isValidated?: boolean;
}

export function CourseCard({ course, type, onValidate, isValidated }: CourseCardProps) {
  const isIGOT = type === 'igot';

  return (
    <Card className="flex flex-col h-full border-border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2 gap-2">
          <Badge 
            variant="outline" 
            className={isIGOT ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent/10 text-accent-foreground border-accent/20'}
          >
            {isIGOT ? 'iGOT Karmayogi' : 'NSSTA TPAC'}
          </Badge>
          {isIGOT && (course as IGOTCourse).isIllustrative && (
            <Badge variant="secondary" className="text-[10px] uppercase bg-muted text-muted-foreground">
              Illustrative
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-tight line-clamp-2">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{course.provider}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="capitalize">
              {isIGOT ? (course as IGOTCourse).difficulty : (course as NSSTACourse).targetGroup}
            </span>
          </div>
        </div>
      </CardContent>
      
            <CardFooter className="pt-4 border-t border-border mt-auto flex flex-col gap-2">
        {course.url === '#' ? (
          <Button variant="outline" className="w-full gap-2" onClick={(e) => {
            e.preventDefault();
            toast.info('Illustrative iGOT module. Real navigation requires MoSPI SSO integration.');
          }}>
            View on {isIGOT ? 'iGOT' : 'NSSTA'} <ExternalLink className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href={course.url} target="_blank" rel="noopener noreferrer">
              View on {isIGOT ? 'iGOT' : 'NSSTA'} <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        
        {isValidated ? (
          <div className="w-full py-2 flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 rounded-md border border-emerald-200 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" /> FRAC Level Updated
          </div>
        ) : (
          <Button 
            variant="default" 
            className="w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white" 
            onClick={onValidate}
          >
            Take Validation Quiz <BrainCircuit className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

