# SIH26101 — StatSarthi Build Context (Handover Document)

> **Read this first.** This document provides full context for transforming EduResources Pro into "StatSarthi" — an AI-powered capacity building platform for India's Official Statistical System. This was planned in a previous session with the project owner.

---

## Who Is Building This

- **Builder:** Chandrakant Kelgire, BCA student, solo vibecoder
- **Team:** 6 members, no traditional coding skills — entire project is AI-assisted (vibecoded)
- **Other project:** [pptmaker.co.in](https://pptmaker.co.in) — a production React 19 + Vite + Firebase app with 15+ PPT themes, Gemini AI integration, resume builder, mock interviews. Built with the same approach.
- **Hackathon:** Smart India Hackathon (SIH) 2026
- **Idea submission deadline:** 20 September 2026

---

## The Problem Statement (SIH26101)

| Field | Value |
|---|---|
| **S.No** | 101 |
| **Organization** | MoSPI (Ministry of Statistics & Programme Implementation) |
| **PS Title** | Develop an AI enabled learning platform that identifies competency gaps, recommends personalized training through integration with the iGOT Karmayogi ecosystem, and capable of generating Quizzes and Multiple choice questions (MCQs) from uploaded learning materials to strengthen capacity building in India's Official Statistical System. |
| **Category** | Software |
| **PS Number** | SIH26101 |
| **Theme** | Smart Education |
| **Deadline** | 20 September 2026 |

---

## The Solution: "StatSarthi"

> *Sarthi = Guide/Navigator. StatSarthi = Your AI guide through India's statistical competency framework.*

### 3 Core Pillars

| Pillar | Name | What It Does |
|---|---|---|
| **1** | Competency Gap Finder (Diagnose) | Official selects role → takes AI diagnostic quiz → gets radar chart showing competency gaps |
| **2** | iGOT Pathway Recommender (Learn) | Based on gaps, recommends prioritized iGOT Karmayogi courses with progress tracking |
| **3** | AI Quiz/MCQ Generator (Assess) | Upload any PDF/DOCX training material → AI generates MCQs at multiple Bloom's levels |

---

## Why We're Forking EduResources (Not Building From Scratch)

EduResources already has **70-80% of the technical plumbing** needed:

### What We KEEP (Untouched)

| Feature | File(s) | How We Use It |
|---|---|---|
| **Gemini AI service** | `src/services/geminiService.ts` | ADD new methods alongside existing ones (don't modify originals) |
| **PDF upload → Gemini grounding** | `AITutor.tsx` + `geminiService.createChat()` | COPY pattern into `statsarthi/QuizGenerator.tsx` (don't modify original) |
| **Quiz question generation** | `geminiService.generateQuizQuestion()` | KEEP, add `generateCompetencyMCQs()` alongside |
| **Answer evaluation** | `geminiService.evaluateAnswer()` | KEEP, add `evaluateCompetency()` alongside |
| **shadcn/ui components** | `src/components/ui/` | Full UI library — Tabs, Cards, Badges, Progress, etc. |
| **Recharts** | Already in `package.json` | For competency radar chart |
| **React Markdown + KaTeX** | `react-markdown`, `remark-math`, `rehype-katex` | For rendering AI responses with stats formulas |
| **Supabase code** | `src/integrations/supabase/` | PRESERVED untouched for post-hackathon EduResources restoration |
| **All original pages** | `src/pages/*.tsx` | PRESERVED in codebase, hidden from routes |

### What We HIDE (Not Delete — Comment Out Routes)

| Hide From Routes | Why | File Preserved? |
|---|---|---|
| `/practice` + `PracticeDirectory.tsx` | Coding arena irrelevant for MoSPI | ✅ Yes |
| `/practice/:problemId` + `ProblemArena.tsx` | Code editor not needed | ✅ Yes |
| `/pyqs`, `/notes`, `/assignments` | University LMS pages | ✅ Yes |
| `/resources` + `ResourceBrowser.tsx` | University resource catalog | ✅ Yes |
| `/ai-tutor` + `AITutor.tsx` | Pattern copied to QuizGenerator | ✅ Yes |
| `<StudyAssistant />` | Calls Supabase Edge Functions | ✅ Yes |
| Dark gamer theme (orange/rust) | Replaced with government blue — original preserved as CSS comments | ✅ Yes |

### What We BUILD NEW (in `statsarthi/` directories)

**Backend:** Firebase (Auth + Firestore + Storage) — added alongside existing Supabase code.


| New Feature | Est. Days | Details |
|---|---|---|
| **Firebase setup** | 0.5 | Auth + Firestore + Storage config alongside existing Supabase |
| **Professional government UI theme** | 2 | Clean, light, trustworthy. Think gov.in aesthetic. |
| **Role selection + FRAC competency data model** | 2 | Designation picker, competency framework, required levels per role |
| **Diagnostic assessment flow** | 2 | Reuse quiz engine internals, new UI for timed competency quiz |
| **Competency gap radar chart** | 1 | Recharts radar with green (strong) / red (gap) zones |
| **iGOT course catalog + recommendation engine** | 2 | Firestore catalog mapping courses → competencies, deep links to iGOT |
| **Personalized learning pathway UI** | 2 | Progress-tracked cards ordered by priority |
| **Admin analytics dashboard** | 2 | Department-level aggregate gap data |
| **Landing page + StatSarthi branding** | 1 | Hero, features section, CTA |
| **Total** | **~14.5 days** | |

---

## MoSPI Competency Domains (4 Domains, 30+ Areas — as per Official PS)

### Domain 1: Statistical Competencies
1. **Survey Design & Sampling** — Sampling techniques, questionnaire design, pilot testing, survey ethics
2. **National Accounts & GDP** — SNA methodology, GDP estimation, deflators
3. **Price Statistics** — CPI/WPI computation, index number theory
4. **Labour Statistics** — Employment surveys, workforce indicators
5. **Agricultural Statistics** — Crop estimation, land use, agricultural census
6. **Industrial Statistics** — IIP, ASI, manufacturing surveys
7. **SDG Indicators** — Sustainable Development Goal tracking, metadata
8. **Metadata Standards** — SDDS, GDDS, statistical classifications
9. **Data Quality Frameworks (SQAF)** — MoSPI's Statistical Quality Assessment Framework

### Domain 2: Technical Competencies
10. **Python & R Programming** — Data analysis, statistical computing
11. **SQL & Database Management** — Query design, data warehousing
12. **Stata, SPSS & SAS** — Statistical software proficiency
13. **GIS & Spatial Analysis** — Geographic Information Systems, mapping
14. **Data Visualization** — Dashboards, charts, data storytelling
15. **AI & Machine Learning** — ML models, NLP, predictive analytics
16. **Cloud Computing** — Government cloud (MeghRaj), cloud services
17. **APIs & Open Data** — API integration, open data portals

### Domain 3: Digital Governance
18. **Cybersecurity** — Information security, threat management
19. **Data Privacy** — Data protection, GDPR awareness, statistical confidentiality
20. **Digital Signatures** — e-Sign, digital certificates
21. **Government Cloud (MeghRaj)** — NIC cloud infrastructure
22. **Digital Public Infrastructure** — India Stack, UPI, DigiLocker, eKYC

### Domain 4: Behavioural & Managerial
23. **Leadership** — Team leadership, strategic thinking
24. **Communication** — Written/verbal, stakeholder engagement
25. **Project Management** — Planning, execution, monitoring
26. **Ethics & Integrity** — Professional ethics, statistical integrity
27. **Decision Making** — Evidence-based, analytical decision making
28. **Change Management** — Organizational change, digital transformation

---

## Key Government Ecosystem Context

### iGOT Karmayogi
- India's government online learning platform for civil servants (igotkarmayogi.gov.in)
- **NO public API, NO public course catalog** — platform is entirely behind official login
- Built on Sunbird open-source stack (sunbird-client-services on GitHub)
- Has AI Tutor, AI Sarthi, AI-CBP tools, Karma Points, Specialization Badges
- Supports 23 Indian languages, 1.7 crore+ registered users
- **For our app:** Use **illustrative courses** in Sunbird's content schema shape, clearly labeled as "Example iGOT-style course" — do NOT invent specific course titles as if real
- Frame integration as "ecosystem-ready for iGOT API integration" for judges — honest, defensible

### NSSTA TPAC (Training Programme Advisory Committee)
- NSSTA runs formal training programmes via TPAC recommendations
- **nssta.gov.in blocks scraping entirely** (robots disallowed, confirmed)
- **Real data source:** NSSTA Training Calendar FY 2021-22 PDF from mospi.gov.in
  - URL: `https://mospi.gov.in/sites/default/files/main_menu/training/Training%20Calendar%20of%20NSSTA%20for%20FY%202021-22.pdf`
  - This is the most recent NSSTA syllabus document that is actually publicly fetchable
- **15 real courses already seeded** in `src/data/nsstaCourses.ts` with real titles, durations, and delivery partners (IIT Kanpur, IIM Ahmedabad, C.R. Rao AIMSC, etc.)
- In SIH submission, describe honestly as "seeded from NSSTA's published training calendar"

### FRAC (Framework of Roles, Activities, and Competencies)
- Official competency mapping system used across Indian government
- Four domains in our model: Statistical, Technical, Digital Governance, Behavioural & Managerial
- **FRAC's actual 5-level scale (use these labels, not generic numbers):**
  - **Level 1: Aware** — Basic awareness of the competency
  - **Level 2: Apply** — Can apply knowledge with guidance
  - **Level 3: Advise** — Can advise others, independent practitioner
  - **Level 4: Expert** — Deep expertise, trains others
  - **Level 5: Ustad** — Mastery, shapes policy and practice
- iGOT itself uses these exact labels — judges will notice the domain knowledge

### SQAF (Statistical Quality Assessment Framework)
- MoSPI's own quality framework, built on the UN's NQAF 2019
- Real: `mospi.gov.in/sites/default/files/Statistical-Quality-Assessment-Framework-Guidelines.pdf`
- Legitimate competency area, not a hallucination

### MoSPI Training Infrastructure
- **NSSTA** (National Statistical Systems Training Academy) — nodal training institute
- **Capacity Development Division (CDD)** — manages all MoSPI training
- **Annual Capacity Building Plans (ACBP)** — prepared with Capacity Building Commission

---

## Technical Data Model

```typescript
// FRAC's actual 5-level scale (iGOT uses these exact labels)
type FRACLevel = 1 | 2 | 3 | 4 | 5;
const FRAC_LEVEL_LABELS: Record<FRACLevel, string> = {
  1: 'Aware',
  2: 'Apply',
  3: 'Advise',
  4: 'Expert',
  5: 'Ustad',
};

// 4-Domain Competency Framework
interface CompetencyDomain {
  id: string;
  name: 'Statistical' | 'Technical' | 'Digital Governance' | 'Behavioural & Managerial';
  areas: CompetencyArea[];
}

interface CompetencyArea {
  id: string;
  domainId: string;
  name: string;
  description: string;
  subCompetencies: string[];
}

// Comprehensive Official Profile (as per PS)
interface OfficialProfile {
  uid: string;
  designation: string;
  department: string;
  currentAssignment: string;
  educationalQualification: string;
  yearsOfExperience: number;
  previousTrainings: string[];
  selfAssessedLevels: Record<string, number>;
}

interface RoleProfile {
  id: string;
  designation: string;
  department: string;
  level: 'junior' | 'mid' | 'senior';
  requiredCompetencies: {
    competencyId: string;
    requiredLevel: FRACLevel;
  }[];
}

// Gap Report with domain-level breakdown
interface GapReport {
  userId: string;
  roleId: string;
  assessedAt: string;
  domainScores: {
    domainId: string;
    areas: {
      competencyId: string;
      requiredLevel: number;
      currentLevel: number;
      gap: number;
    }[];
  }[];
  overallScore: number;
}

// Dual course sources: iGOT + NSSTA
interface IGOTCourse {
  id: string;
  title: string;
  url: string;
  competencyTags: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  provider: string;
  karmaPoints: number;
}

interface NSSTACourse {
  id: string;
  title: string;
  programme: string;
  url: string;
  competencyTags: string[];
  duration: string;
  targetGroup: string;
  provider: 'NSSTA';
}

// Quiz with instant evaluation
interface GeneratedMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;       // Instant feedback per PS
  bloomsLevel: string;
  difficulty: string;
  sourceReference: string;
}
```

---

## Demo Flow for Judges

1. **Landing Page** → Clean government UI, "StatSarthi" branding
2. **Role Selection** → "Assistant Statistical Officer → CSO → Mid-career"
3. **Diagnostic Assessment** → 15-20 AI-generated questions across 5 competency areas
4. **Gap Report** ⭐ → Radar chart showing levels vs. requirements
5. **Learning Path** → Prioritized iGOT courses mapped to gaps, with progress bars
6. **Quiz Generator** ⭐ → Upload PDF → AI generates 20 MCQs → Edit, assign, export
7. **Admin Analytics** → "42% of Statistical Officers have gaps in Data Quality"

---

## Build Order

1. Hide unused pages (comment out routes in App.tsx, NOT delete files)
2. Set up Firebase alongside Supabase (both coexist)
3. Retheme to professional government UI (preserve original theme as CSS comments)
4. Build Pillar 3 first (Quiz Generator) — most impressive demo, copies existing AI code
5. Build Pillar 1 (Gap Finder) — diagnostic assessment + radar chart
6. Build Pillar 2 (Pathway) — iGOT catalog + recommendation
7. Admin analytics dashboard
8. Landing page + final polish
9. Idea submission document + video

---

## Stack Summary

| Layer | Technology | Status |
|---|---|---|
| Frontend | React 18 + Vite 5 + TypeScript | ✅ Already configured |
| UI Kit | shadcn/ui + Tailwind CSS | ✅ Already configured |
| Auth | Firebase Auth (Email/Google) | 🔧 New (alongside preserved Supabase Auth) |
| Database | Cloud Firestore | 🔧 New (alongside preserved Supabase PostgreSQL) |
| Storage | Firebase Storage | 🔧 New (alongside preserved Supabase Storage) |
| AI | Google Gemini 2.5 Flash (`@google/genai`) | ✅ Already configured |
| Charts | Recharts | ✅ Already in package.json |
| PDF Processing | Base64 → Gemini inline data | ✅ Already working |
| Math Rendering | KaTeX + remark-math | ✅ Already configured |
