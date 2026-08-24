import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { geminiService } from "@/services/geminiService";
import { Message } from "@/types/coding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Send, Upload, FileText, Image as ImageIcon, X, Loader2, 
  Sparkles, Key, Check, HelpCircle, BookOpen, Trash2,
  Headphones, ListChecks, GraduationCap, Baby, FileQuestion, Layers
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I am your EduResources AI Study Mentor. Upload any **Previous Year Question Paper (PYQ)** or **Study Notes PDF** using the button below, and I will tutor you strictly based on your syllabus! Or upload an image of a math/coding problem for step-by-step KaTeX explanations.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comprehensionMode, setComprehensionMode] = useState<'standard' | 'analogy' | 'step_by_step' | 'exam_precision'>('standard');

  const handleNotebookLMAction = async (type: 'podcast' | 'guide' | 'faq') => {
    if (isLoading) return;
    setIsLoading(true);

    const titleMap = {
      podcast: "🎙️ Generating NotebookLM Audio Overview Script (Alex & Dr. Sam)...",
      guide: "📋 Compiling Deep-Dive Study Guide & PYQ Predictor...",
      faq: "❓ Building High-Yield Socratic FAQ & Flashcard Matrix..."
    };

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `**[NotebookLM Studio Action]**: Please generate a ${type === 'podcast' ? '2-host Audio Overview Script' : type === 'guide' ? 'Deep-Dive Study Guide & PYQ Predictor' : 'High-Yield Socratic FAQ & Flashcards'} from the attached syllabus context.`,
        timestamp: Date.now()
      },
      {
        role: "model",
        content: titleMap[type],
        timestamp: Date.now()
      }
    ]);

    try {
      let resultText = "";
      if (type === 'podcast') {
        resultText = await geminiService.generateNotebookLMPodcast(uploadedPdfData || undefined);
      } else if (type === 'guide') {
        resultText = await geminiService.generateDeepDiveGuide(uploadedPdfData || undefined);
      } else if (type === 'faq') {
        resultText = await geminiService.generateSocraticFAQ(uploadedPdfData || undefined);
      }

      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "model",
          content: resultText,
          timestamp: Date.now()
        };
        return copy;
      });
      setIsLoading(false);
      toast.success(`Generated NotebookLM ${type === 'podcast' ? 'Audio Overview' : type === 'guide' ? 'Study Guide' : 'FAQ Matrix'}!`);
    } catch (err: any) {
      setIsLoading(false);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "model",
          content: `⚠️ Failed to generate synthesis. Error: ${err.message || 'API error'}`,
          timestamp: Date.now()
        };
        return copy;
      });
    }
  };

  // File Upload states
  const [uploadedPdfData, setUploadedPdfData] = useState<string | null>(null);
  const [uploadedPdfName, setUploadedPdfName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // API Key modal/setting
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKeySetting, setShowApiKeySetting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    geminiService.createChat(messages, uploadedPdfData || undefined);
  }, [uploadedPdfData]);

  const handleApiKeySave = () => {
    if (apiKeyInput.trim()) {
      geminiService.setApiKey(apiKeyInput.trim());
      toast.success("Gemini API Key saved for this session!");
      setShowApiKeySetting(false);
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a valid PDF document.");
        return;
      }
      setUploadedPdfName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setUploadedPdfData(base64);
        toast.success(`Attached syllabus PDF: ${file.name}`);
        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            content: `I have uploaded my syllabus/notes: **${file.name}**. Please base your answers on this document.`,
            timestamp: Date.now()
          },
          {
            role: "model",
            content: `Document **${file.name}** processed successfully! I have analyzed the topics and patterns. What concept or PYQ problem from these notes shall we tackle first?`,
            timestamp: Date.now()
          }
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success("Image attached for analysis!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePdf = () => {
    setUploadedPdfData(null);
    setUploadedPdfName(null);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    toast.info("Syllabus PDF detached.");
  };

  const handleSend = async () => {
    if ((!input.trim() && !imagePreview) || isLoading) return;

    const userMessageText = input.trim() || "Please explain or solve this image problem step-by-step.";
    const currentImgPreview = imagePreview;
    
    const newMessage: Message = {
      role: 'user',
      content: userMessageText,
      timestamp: Date.now(),
      imagePreview: currentImgPreview || undefined
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare placeholder for model streaming
    setMessages((prev) => [
      ...prev,
      {
        role: 'model',
        content: "",
        timestamp: Date.now()
      }
    ]);

    try {
      let accumulatedText = "";
      await geminiService.sendMessageStream(
        userMessageText,
        currentImgPreview || undefined,
        (chunk) => {
          accumulatedText += chunk;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: 'model',
              content: accumulatedText,
              timestamp: Date.now()
            };
            return copy;
          });
        },
        comprehensionMode
      );
      setIsLoading(false);
      removeImage();
    } catch (error: any) {
      setIsLoading(false);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'model',
          content: `⚠️ **AI Tutor Notice:** Unable to reach Google Gemini API right now. Please check your API Key in settings or verify your network connection. (${error.message || 'API Error'})`,
          timestamp: Date.now()
        };
        return copy;
      });
      toast.error("Failed to generate response. Please verify API key.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 flex flex-col max-w-5xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                EduResources AI Companion
                <Badge variant="secondary" className="text-xs font-mono">
                  Gemini 2.5 Flash
                </Badge>
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Trained to analyze your university PYQs, Study Notes, and solve math/code problems using KaTeX.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeySetting(!showApiKeySetting)}
              className="text-xs flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-primary" />
              API Key
            </Button>
            {messages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessages([messages[0]])}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Chat
              </Button>
            )}
          </div>
        </div>

        {/* API Key Modal/Inline Config */}
        {showApiKeySetting && (
          <div className="bg-card border border-border rounded-xl p-4 mb-6 animate-in fade-in flex flex-col sm:flex-row items-center gap-3 shadow-sm">
            <Key className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1 text-xs">
              <span className="font-semibold text-foreground">Google Gemini API Key: </span>
              <span className="text-muted-foreground">If your `.env` does not have `VITE_GEMINI_API_KEY`, you can enter your personal AI Studio key below to activate live tutoring.</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="bg-background border-input text-xs h-8 w-48 text-foreground"
              />
              <Button size="sm" onClick={handleApiKeySave} className="h-8 px-3 text-xs font-semibold">
                Save Key
              </Button>
            </div>
          </div>
        )}

        {/* Active Syllabus Banner */}
        {uploadedPdfName && (
          <div className="bg-muted/40 border border-border rounded-xl p-3.5 mb-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground flex items-center gap-2">
                  <span>Syllabus Context Active: {uploadedPdfName}</span>
                  <Badge variant="secondary" className="font-bold text-[10px] px-1.5">PDF Grounded</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  AI will prioritize answers and generating practice exercises from this syllabus document.
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removePdf} className="h-7 w-7 text-muted-foreground hover:text-destructive">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* NotebookLM Studio Toolbar */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">NotebookLM Studio Synthesis</span>
              <Badge variant="secondary" className="text-[10px]">AI Grounded</Badge>
            </div>
            <span className="text-[11px] text-muted-foreground">Generate structured learning assets directly from your notes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={() => handleNotebookLMAction('podcast')}
              className="text-xs h-9 justify-start gap-2 transition-all"
            >
              <Headphones className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Audio Overview Script</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={() => handleNotebookLMAction('guide')}
              className="text-xs h-9 justify-start gap-2 transition-all"
            >
              <ListChecks className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Deep-Dive Study Guide</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={() => handleNotebookLMAction('faq')}
              className="text-xs h-9 justify-start gap-2 transition-all"
            >
              <FileQuestion className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>High-Yield FAQ & Cards</span>
            </Button>
          </div>
        </div>

        {/* Chat Messages Box */}
        <div className="flex-1 bg-card border border-border rounded-xl p-4 sm:p-6 overflow-y-auto mb-6 max-h-[600px] min-h-[420px] space-y-4 shadow-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? "ml-auto bg-primary text-primary-foreground rounded-br-none shadow-sm"
                  : "mr-auto bg-muted/40 border border-border text-foreground rounded-bl-none shadow-sm"
              }`}
            >
              <div className="font-semibold text-xs uppercase tracking-wider mb-1.5 opacity-75 flex items-center gap-1.5">
                {msg.role === 'user' ? "You" : (
                  <span className="text-primary flex items-center gap-1.5 font-bold">
                    <Bot className="w-4 h-4" /> EduResources AI Mentor
                  </span>
                )}
              </div>

              {msg.imagePreview && (
                <div className="mb-3">
                  <img src={msg.imagePreview} alt="Uploaded problem" className="max-h-48 rounded-lg border border-border object-contain" />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed overflow-x-auto">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="mr-auto bg-muted/40 border border-border rounded-2xl p-4 text-sm text-primary flex items-center gap-3 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Analyzing syllabus context and compiling pedagogical explanation...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview bar if selected */}
        {imagePreview && (
          <div className="bg-card border border-border rounded-xl p-3 mb-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded object-cover border border-border" />
              <div>
                <div className="text-xs font-semibold text-foreground">Image Attached</div>
                <div className="text-[11px] text-muted-foreground">Ready to send for math OCR / code explanation</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeImage} className="h-7 w-7 text-muted-foreground hover:text-destructive">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Understand-Anything Comprehension Selector */}
        <div className="bg-card border border-border rounded-xl p-2.5 mb-3 flex items-center justify-between flex-wrap gap-2 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Comprehension Level (`Understand-Anything`):</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setComprehensionMode('standard')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                comprehensionMode === 'standard'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setComprehensionMode('analogy')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                comprehensionMode === 'analogy'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <Baby className="w-3 h-3" />
              👶 5-Yr-Old / Analogy
            </button>
            <button
              onClick={() => setComprehensionMode('step_by_step')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                comprehensionMode === 'step_by_step'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <ListChecks className="w-3 h-3" />
              🔍 Step-by-Step Trace
            </button>
            <button
              onClick={() => setComprehensionMode('exam_precision')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                comprehensionMode === 'exam_precision'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              🎓 Exam Precision
            </button>
          </div>
        </div>

        {/* Input Bar & Attachment Controls */}
        <div className="bg-card border border-border rounded-xl p-3 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input type="file" ref={pdfInputRef} onChange={handlePdfUpload} accept=".pdf" className="hidden" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => pdfInputRef.current?.click()}
              className="h-10 px-3 text-xs flex items-center gap-1.5 shrink-0"
              title="Attach Syllabus or PYQ PDF"
            >
              <Upload className="w-3.5 h-3.5 text-primary" />
              <span>Attach Syllabus PDF</span>
            </Button>

            <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 shrink-0"
              title="Attach Math or Code Screenshot"
            >
              <ImageIcon className="w-4 h-4 text-primary" />
            </Button>
          </div>

          <div className="flex items-center gap-2 flex-1 w-full">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={uploadedPdfName ? `Ask a question about ${uploadedPdfName}...` : "Ask a concept, paste code to debug, or request a practice problem..."}
              className="h-10 bg-background border-input text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !imagePreview)}
              className="h-10 px-5 font-semibold text-xs shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
