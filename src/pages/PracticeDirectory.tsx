import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { codingQuestions } from "@/data/codingQuestions";
import { Question, Language, Difficulty, Topic } from "@/types/coding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, Flame, Heart, Trophy, Search, Filter, Sparkles, 
  ArrowRight, CheckCircle2, Play, BookOpen 
} from "lucide-react";

export default function PracticeDirectory() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Stats from localStorage
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const savedScore = localStorage.getItem('codeStart_score');
    const savedStreak = localStorage.getItem('codeStart_dailyStreak');
    const savedLives = localStorage.getItem('codeStart_lives');
    if (savedScore) setScore(parseInt(savedScore));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLives) setLives(parseInt(savedLives));
  }, []);

  const languages = ["All", "C", "Python"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const topics = ["All", "Variables", "Conditions", "Loops", "Functions", "Basic Syntax", "Data Types", "Algorithms"];

  const filteredQuestions = codingQuestions.filter((q) => {
    const matchesLang = selectedLanguage === "All" || q.language === selectedLanguage;
    const matchesDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === "All" || q.topic === selectedTopic;
    const matchesSearch = searchQuery.trim() === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesDiff && matchesTopic && matchesSearch;
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Hard': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        {/* Gamified Hero Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-card border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm shrink-0 mt-1">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                EduResources Pro Coding Studio
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2.5 flex-wrap">
                <span>Interactive Code Arena</span>
                <Badge variant="secondary" className="text-xs font-mono">
                  Coddy & LeetCode Mode
                </Badge>
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                Master C and Python with gamified Coddy.tech and LeetCode-style exercises. Practice syntax, debug logic, and get step-by-step guidance from your embedded AI Coding Mentor.
              </p>
            </div>
          </div>

          {/* User Stats Card */}
          <div className="flex items-center gap-3 bg-muted/40 border border-border rounded-xl p-4 shadow-sm shrink-0 w-full md:w-auto justify-around md:justify-start">
            <div className="flex flex-col items-center px-3 border-r border-border">
              <div className="flex items-center gap-1.5 text-rose-500 font-bold text-lg">
                <Heart className="w-5 h-5 fill-rose-500" />
                <span>{lives}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold mt-0.5 tracking-wider">Lives</span>
            </div>

            <div className="flex flex-col items-center px-3 border-r border-border">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-lg">
                <Flame className="w-5 h-5 fill-amber-500" />
                <span>{streak}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold mt-0.5 tracking-wider">Streak</span>
            </div>

            <div className="flex flex-col items-center px-3">
              <div className="flex items-center gap-1.5 text-primary font-bold text-lg">
                <Trophy className="w-5 h-5" />
                <span>{score}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold mt-0.5 tracking-wider">XP Points</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coding problems by keyword..."
                className="pl-9 bg-background border-input text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase mr-1">Language:</span>
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`text-xs h-8 px-3 transition-all ${
                    selectedLanguage === lang 
                      ? "bg-primary text-primary-foreground shadow-sm font-medium" 
                      : "bg-background border-border text-muted-foreground hover:text-foreground font-medium"
                  }`}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-3 border-t border-border">
            {/* Difficulty Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase mr-1">Difficulty:</span>
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`text-xs h-7 px-2.5 transition-all ${
                    selectedDifficulty === diff 
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold" 
                      : "bg-background border-border text-muted-foreground hover:text-foreground font-medium"
                  }`}
                >
                  {diff}
                </Button>
              ))}
            </div>

            {/* Topic Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase mr-1">Topic:</span>
              {topics.slice(0, 6).map((top) => (
                <Badge
                  key={top}
                  variant="outline"
                  onClick={() => setSelectedTopic(top)}
                  className={`cursor-pointer text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    selectedTopic === top
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-foreground"
                  }`}
                >
                  {top}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-2 pb-1 uppercase tracking-wider">
            <span>Problem Title & Topic</span>
            <span>Difficulty & Mode</span>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border text-muted-foreground shadow-sm">
              <Code2 className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              No coding problems found matching your selected filters.
            </div>
          ) : (
            filteredQuestions.map((q) => (
              <Link
                key={q.id}
                to={`/practice/${q.id}`}
                className="group flex items-center justify-between p-4 bg-card hover:bg-card/90 rounded-xl border border-border hover:border-primary/40 transition-all shadow-sm hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-xs font-bold text-primary group-hover:bg-primary/20 transition-colors shadow-sm">
                    #{q.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2 text-sm sm:text-base">
                      {q.question || q.title}
                      {q.type === 'Full Coding Challenge' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono">LeetCode Mode</span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-mono">
                      <span>{q.language}</span>
                      <span>•</span>
                      <span>{q.topic}</span>
                      <span>•</span>
                      <span>{q.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={`text-xs px-2.5 py-0.5 border rounded-lg font-semibold ${getDifficultyColor(q.difficulty)}`}>
                    {q.difficulty}
                  </Badge>
                  <div className="w-9 h-9 rounded-xl bg-muted/40 border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shadow-sm">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
