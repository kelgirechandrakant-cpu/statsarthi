export type FRACLevel = 1 | 2 | 3 | 4 | 5;

export const FRAC_LEVEL_LABELS: Record<FRACLevel, string> = {
  1: 'Aware',
  2: 'Apply',
  3: 'Advise',
  4: 'Expert',
  5: 'Ustad',
};

// === COMPETENCY FRAMEWORK ===
export interface CompetencyDomain {
  id: string;
  name: 'Statistical' | 'Technical' | 'Digital Governance' | 'Behavioural & Managerial';
  icon: string;
  areas: CompetencyArea[];
}

export interface CompetencyArea {
  id: string;
  domainId: string;
  name: string;
  description: string;
  subCompetencies: string[];
}

// === OFFICIAL PROFILE ===
export interface OfficialProfile {
  uid: string;
  designation: string;
  department: string;
  currentAssignment: string;
  educationalQualification: string;
  yearsOfExperience: number;
  previousTrainings: string[]; // IDs of completed courses
  selfAssessedLevels: Record<string, FRACLevel>; // competencyId -> FRAC level
  assessedFRACLevels?: Record<string, FRACLevel>; // system-assessed levels (post-quiz)
  karmaPoints?: number; // iGOT Karma Points
  completedCourses?: string[]; // IDs of validated courses
  createdAt: string;
  updatedAt: string;
}

// === ROLE PROFILE ===
export interface RoleProfile {
  id: string;
  designation: string;
  department: string;
  level: 'junior' | 'mid' | 'senior';
  requiredCompetencies: {
    competencyId: string;
    requiredLevel: FRACLevel;
  }[];
}

// === GAP REPORT ===
export interface GapReport {
  id: string;
  userId: string;
  roleId: string;
  assessedAt: string;
  domainScores: {
    domainId: string;
    domainName: string;
    areas: {
      competencyId: string;
      competencyName: string;
      requiredLevel: number;
      currentLevel: number;
      gap: number;
    }[];
  }[];
  overallScore: number;
  overallLevel: FRACLevel;
}

// === COURSES ===
export interface IGOTCourse {
  id: string;
  title: string;
  url: string;
  competencyTags: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  provider: string;
  description: string;
  karmaPoints: number;
  isIllustrative: boolean; // Grounding: True as no real catalog exists
}

export interface NSSTACourse {
  id: string;
  title: string;
  programme: string;
  url: string; // mospi.gov.in link
  competencyTags: string[];
  duration: string;
  targetGroup: string;
  provider: string;
  description: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];           // 4 options
  correctIndex: number;        // 0-3
  competencyArea: string;
  subCompetency: string;
  bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
  difficulty: string;
  explanation: string;
}

export interface CompetencyScore {
  competencyArea: string;
  score: number;               // 0-100
  level: 1 | 2 | 3 | 4 | 5;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// === QUIZ/MCQ ===
export interface GeneratedMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  beginnerExplanation?: string; // Feynman / Analogy mode explanation
  bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
  difficulty: 'easy' | 'medium' | 'hard';
  sourceReference: string;
}

export interface Quiz {
  id: string;
  title: string;
  sourceDocument: string;
  competencyArea?: string;
  questions: GeneratedMCQ[];
  createdBy: string;
  createdAt: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  totalQuestions: number;
  feedback: string;
  completedAt: string;
}

// === LEARNING PATHWAY ===
export interface LearningPathway {
  userId: string;
  steps: PathwayStep[];
  createdAt: string;
}

export interface PathwayStep {
  priority: number;
  competencyArea: string;
  domainId: string;
  currentLevel: number;
  targetLevel: number;
  recommendedCourses: {
    igot: string[];
    nssta: string[];
  };
  status: 'not_started' | 'in_progress' | 'completed';
  validated?: boolean; // Has passed validation gate quiz
}

// === iGOT INTEGRATION TYPES (from SIH26101 research) ===
export type EnrollmentStatus = 
  | 'recommended'
  | 'viewed'
  | 'enrolled'
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'expired'
  | 'certificate_issued';

export interface EnrollmentRecord {
  userId: string;
  courseId: string;
  igotCourseId?: string;
  status: EnrollmentStatus;
  recommendedAt?: string;
  enrolledAt?: string;
  startedAt?: string;
  completedAt?: string;
  certificateIssuedAt?: string;
  finalScore?: number;
  learningHours?: number;
  lastSyncedAt: string;
  sourceSystem: 'statsarthi' | 'igot';
}

export interface CompetencyAuditEntry {
  id: string;
  userId: string;
  competencyId: string;
  previousScore: number;
  newScore: number;
  previousLevel: number;
  newLevel: number;
  reason: string;
  components: {
    w1_previousScore: number;
    w2_courseResult: number;
    w3_platformQuiz: number;
    w4_practicalExercise: number;
  };
  timestamp: string;
}

// === TRAINER REVIEW WORKFLOW ===
export type ReviewStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published';

export interface ReviewableQuestion extends GeneratedMCQ {
  reviewStatus: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComments?: string;
  generatedBy: 'gemini-ai' | 'manual';
  version: number;
  language: string;
  competencyId?: string;
  sourcePageOrSlide?: string;
}

