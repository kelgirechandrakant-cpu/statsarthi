import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Upload, FileType, CheckCircle2, Loader2, X, Download, BrainCircuit, Settings2, ServerCog, Database } from "lucide-react";
import { geminiService } from "@/services/geminiService";
import { GeneratedMCQ } from "@/types/statsarthi";
import { QuizTaker } from "@/components/statsarthi/QuizTaker";

const BLOOMS_LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

export default function QuizGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState("10");
  const [difficulty, setDifficulty] = useState("mixed");
  const [selectedBlooms, setSelectedBlooms] = useState<string[]>(["Remember", "Understand", "Apply"]);
  const [competencyArea, setCompetencyArea] = useState("");
  const [language, setLanguage] = useState("English");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedMCQ[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Please upload a PDF document.");
      return;
    }
    if (selected.size > 15 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 15MB.");
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const match = dataUrl.match(/^data:(application\/pdf);base64,(.*)$/);
      if (match) {
        setMimeType(match[1]);
        setFileData(match[2]);
        toast.success("Document uploaded successfully");
      }
    };
    reader.readAsDataURL(selected);
  };

  const removeFile = () => {
    setFile(null);
    setFileData(null);
    setMimeType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleBlooms = (level: string) => {
    setSelectedBlooms(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleGenerate = async () => {
    if (!fileData || !mimeType) {
      toast.error("Please upload a document first.");
      return;
    }
    if (selectedBlooms.length === 0) {
      toast.error("Please select at least one Bloom's Taxonomy level.");
      return;
    }

    setIsGenerating(true);
    setGeneratedQuestions([]);
    try {
      const mcqs = await geminiService.generateMCQsFromDocument(fileData, mimeType, {
        count: parseInt(count, 10),
        difficulty: difficulty as 'easy' | 'medium' | 'hard' | 'mixed',
        bloomsLevels: selectedBlooms,
        competencyArea: competencyArea || undefined,
        language: language
      });
      
      // Post-generation validation layer to ensure high quality
      const validMcqs = mcqs.filter(q => {
        // Must have exactly 4 options (standard for MoSPI/government exams)
        if (!q.options || q.options.length !== 4) return false;
        // Correct index must be valid
        if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= 4) return false;
        // Options must be unique (prevent AI hallucinating duplicate answers)
        const uniqueOptions = new Set(q.options);
        if (uniqueOptions.size !== q.options.length) return false;
        // Must have explanation and source reference
        if (!q.explanation || !q.sourceReference) return false;
        return true;
      });

      if (validMcqs.length < mcqs.length) {
        toast.warning(`Filtered out ${mcqs.length - validMcqs.length} malformed questions.`);
      }

      setGeneratedQuestions(validMcqs);
      toast.success(`Generated ${validMcqs.length} high-quality questions successfully!`);
    } catch (error) {
      toast.error(`API Error: ${error instanceof Error ? error.message : "Unknown error"}. Check DevTools Console.`); console.error("Gemini API Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-24 px-4 max-w-5xl space-y-8">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Quiz Generator</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <ServerCog className="h-4 w-4" />
            Live MoSPI MCP Connection Active
          </div>
        </div>
        <p className="text-muted-foreground">
          Upload learning materials to automatically generate targeted MCQs mapped to Bloom's Taxonomy. The AI dynamically pulls real-world statistical datasets (CPI, PLFS, EC) via the <strong>MoSPI MCP API</strong> to contextualize math and analytical questions for officials.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileType className="h-5 w-5 text-primary" />
              1. Upload Learning Material
            </CardTitle>
            <CardDescription>Upload a PDF document (max 15MB).</CardDescription>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div 
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-muted transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground">Click to upload document</h3>
                <p className="text-sm text-muted-foreground mt-1">PDF, PPTX (via PDF export) - Max 15MB</p>
              </div>
            ) : (
              <div className="bg-muted border border-border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept=".pdf" 
              onChange={handleFileUpload} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              2. Generation Settings
            </CardTitle>
            <CardDescription>Configure how the AI generates questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Questions</Label>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Competency Area (Optional)</Label>
                <Input 
                  placeholder="e.g. Survey Design, Data Privacy" 
                  value={competencyArea}
                  onChange={(e) => setCompetencyArea(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Marathi">Marathi</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target Bloom's Taxonomy Levels</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {BLOOMS_LEVELS.map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`bloom-${level}`} 
                      checked={selectedBlooms.includes(level)}
                      onCheckedChange={() => toggleBlooms(level)}
                    />
                    <label 
                      htmlFor={`bloom-${level}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
              onClick={handleGenerate}
              disabled={!fileData || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Generate MCQs
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {generatedQuestions.length > 0 && (
        <div className="mt-12">
          <QuizTaker 
            questions={generatedQuestions} 
            onRestart={() => setGeneratedQuestions([])} 
          />
        </div>
      )}
    </div>
  );
}


