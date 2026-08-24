import React, { useState } from 'react';
import { GeneratedMCQ } from '@/types/statsarthi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, BrainCircuit, RefreshCcw, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizTakerProps {
  questions: GeneratedMCQ[];
  onRestart: () => void;
}

export function QuizTaker({ questions, onRestart }: QuizTakerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) return null;

  const isFinished = currentIndex >= questions.length;
  
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary-500">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="mx-auto bg-primary-100 w-20 h-20 flex items-center justify-center rounded-full mb-2">
            <CheckCircle2 className="h-10 w-10 text-primary-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Assessment Complete!</CardTitle>
          <CardDescription className="text-lg">
            You scored {score} out of {questions.length} ({percentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={percentage} className="h-3 w-full bg-gray-100" />
          <div className="bg-surface-50 p-4 rounded-lg border text-center">
            {percentage >= 80 ? (
              <p className="text-success-700 font-medium">Excellent work! You have a strong grasp of these concepts.</p>
            ) : percentage >= 50 ? (
              <p className="text-warning-700 font-medium">Good effort. Reviewing the Feynman analogies will help solidify your understanding.</p>
            ) : (
              <p className="text-danger-700 font-medium">This is a great opportunity to upskill! We recommend exploring the related iGOT modules.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button onClick={onRestart} className="gap-2" variant="outline">
            <RefreshCcw className="h-4 w-4" /> Generate New Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
    if (idx === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentIndex(i => i + 1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground px-1">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <Progress value={((currentIndex) / questions.length) * 100} className="h-2" />

      <Card className="shadow-lg border-primary-200">
        <CardHeader className="bg-surface-50 border-b border-border pb-6 rounded-t-xl">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div className="flex gap-2">
              <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                Bloom's: {currentQ.bloomsLevel}
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600 capitalize">
                {currentQ.difficulty}
              </span>
            </div>
          </div>
          <CardTitle className="text-xl leading-snug">{currentQ.question}</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-3">
          {currentQ.options.map((opt, idx) => {
            let optionStyle = "border-border bg-white hover:bg-surface-50 cursor-pointer";
            let icon = null;
            
            if (showFeedback) {
              if (idx === currentQ.correctIndex) {
                optionStyle = "border-success-500 bg-success-50 text-success-900";
                icon = <CheckCircle2 className="h-5 w-5 text-success-600" />;
              } else if (idx === selectedOption) {
                optionStyle = "border-danger-500 bg-danger-50 text-danger-900";
                icon = <XCircle className="h-5 w-5 text-danger-600" />;
              } else {
                optionStyle = "border-border bg-gray-50 opacity-50 cursor-not-allowed";
              }
            }

            return (
              <div 
                key={idx} 
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-lg border-2 transition-all flex justify-between items-center ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400 bg-gray-100 w-8 h-8 flex items-center justify-center rounded">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`font-medium ${showFeedback && idx === selectedOption && !isCorrect ? 'line-through opacity-70' : ''}`}>
                    {opt}
                  </span>
                </div>
                {icon}
              </div>
            );
          })}

          {showFeedback && (
            <div className="mt-8 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className={`p-5 rounded-lg border ${isCorrect ? 'bg-success-50 border-success-200' : 'bg-warning-50 border-warning-200'}`}>
                <h4 className={`font-bold flex items-center gap-2 mb-2 ${isCorrect ? 'text-success-800' : 'text-warning-800'}`}>
                  {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h4>
                <p className="text-gray-700 text-sm mb-4"><span className="font-semibold text-gray-900">Technical Explanation:</span> {currentQ.explanation}</p>
                
                {/* FEYNMAN MODE FEEDBACK */}
                {!isCorrect && currentQ.beginnerExplanation && (
                  <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg shadow-inner">
                    <h5 className="font-bold text-primary-800 flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-primary-600" />
                      Feynman Mode (Explain like I'm 5)
                    </h5>
                    <p className="text-primary-900 text-sm leading-relaxed">{currentQ.beginnerExplanation}</p>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-4 font-mono">Source Ref: {currentQ.sourceReference}</p>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleNext} size="lg" className="gap-2 bg-gray-900 text-white hover:bg-gray-800">
                  {currentIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'} <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
