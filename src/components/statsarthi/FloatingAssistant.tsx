import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, BrainCircuit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { geminiService } from '@/services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState<any>(null);
  const [gapReport, setGapReport] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load context on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('statsarthi_profile');
    const savedReport = localStorage.getItem('latestGapReport');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedReport) setGapReport(JSON.parse(savedReport));
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting when opened first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const name = profile?.name ? profile.name.split(' ')[0] : 'Officer';
      setMessages([{
        role: 'model',
        content: `Hello ${name}! I am your AI Training Advisor. I have analyzed your competency gap report. How can I assist you with your capacity building today?`
      }]);
    }
  }, [isOpen, profile, messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.askTrainingAdvisor(
        userMsg,
        profile || {},
        gapReport || {},
        messages
      );
      
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error connecting to the AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show if the user is logged in / has a profile
  if (!profile) return null;

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-[0_8px_30px_rgb(var(--color-primary)/0.3)] transition-all hover:scale-105 active:scale-95 z-50 group flex items-center justify-center border border-white/10"
          aria-label="Open Training Advisor"
        >
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold tracking-wide text-sm">
              Ask AI Advisor
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[360px] md:w-[400px] h-[600px] max-h-[85vh] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col z-50 border-0 rounded-3xl overflow-hidden bg-background/95 backdrop-blur-xl animate-in slide-in-from-bottom-5 zoom-in-95 duration-300">
          <CardHeader className="bg-muted/50 backdrop-blur-md border-b border-border/20 p-5 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2.5 rounded-2xl shadow-sm border border-primary/10">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-foreground">Training Advisor</CardTitle>
                <CardDescription className="text-muted-foreground/70 text-xs font-medium tracking-wide">MoSPI Capacity Building</CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full h-9 w-9 transition-colors active:scale-90"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-5 space-y-6 bg-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-sm border ${msg.role === 'user' ? 'bg-background border-border/30 text-primary' : 'bg-primary border-primary text-white'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/10' 
                      : 'bg-card border border-border/20 text-foreground rounded-tl-sm shadow-sm'
                  }`}>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="shrink-0 h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-sm">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-4 bg-card border border-border/20 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          <CardFooter className="p-4 border-t border-border/20 bg-muted/30 backdrop-blur-md">
            <form onSubmit={handleSend} className="flex w-full gap-2 relative group">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your skill gaps..." 
                className="flex-1 bg-background border-border/30 focus-visible:ring-primary focus-visible:border-primary rounded-full px-5 py-6 text-sm pr-14 transition-all shadow-sm group-hover:border-border/50"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none">
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
