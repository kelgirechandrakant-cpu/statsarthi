import {
  DiagnosticQuestion,
  RoleProfile,
  GapReport,
  CompetencyDomain,
  FRACLevel,
} from '@/types/statsarthi';
import { competencyDomains as defaultCompetencyDomains } from '@/data/competencyFramework';

export type GapSeverity = 'none' | 'low' | 'medium' | 'high' | 'critical';

export interface GapSeverityConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

export const GAP_SEVERITY_CONFIG: Record<GapSeverity, GapSeverityConfig> = {
  none: {
    label: 'No Gap',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
    borderColor: 'border-green-200 dark:border-green-800',
    icon: 'CheckCircle2',
  },
  low: {
    label: 'Low',
    color: 'text-sky-700 dark:text-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950/40',
    borderColor: 'border-sky-200 dark:border-sky-800',
    icon: 'Info',
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    icon: 'AlertCircle',
  },
  high: {
    label: 'High',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
    icon: 'AlertTriangle',
  },
  critical: {
    label: 'Critical',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: 'AlertOctagon',
  },
};

export function getGapSeverity(gap: number, maxLevel: number = 5): GapSeverity {
  if (gap <= 0) return 'none';
  if (gap === 1) return 'low';
  if (gap === 2) return 'medium';
  if (gap >= 4) return 'critical';
  if (gap >= 3) return 'high';
  return 'none';
}

export function scoreToFRACLevel(scorePercent: number): FRACLevel {
  if (scorePercent <= 20) return 1;
  if (scorePercent <= 40) return 2;
  if (scorePercent <= 60) return 3;
  if (scorePercent <= 80) return 4;
  return 5;
}

export function computeGapReport(
  questions: DiagnosticQuestion[],
  answers: Record<number, number>,
  role: RoleProfile,
  competencyDomains: CompetencyDomain[] = defaultCompetencyDomains
): GapReport {
  // Helper to find domain and area by competency ID or Name
  const findCompetencyInfo = (competencyKey: string) => {
    const normalizedKey = competencyKey.trim().toLowerCase();
    for (const domain of competencyDomains) {
      const area = domain.areas.find(
        (a) =>
          a.id.toLowerCase() === normalizedKey ||
          a.name.toLowerCase() === normalizedKey
      );
      if (area) {
        return {
          domainId: domain.id,
          domainName: domain.name,
          competencyId: area.id,
          competencyName: area.name,
        };
      }
    }
    return null;
  };

  // Group questions by competency ID and calculate correct counts
  const questionsByCompetency = new Map<
    string,
    { total: number; correct: number; originalArea: string }
  >();

  questions.forEach((q, index) => {
    const info = findCompetencyInfo(q.competencyArea);
    const compId = info ? info.competencyId : q.competencyArea;

    if (!questionsByCompetency.has(compId)) {
      questionsByCompetency.set(compId, {
        total: 0,
        correct: 0,
        originalArea: q.competencyArea,
      });
    }

    const stats = questionsByCompetency.get(compId)!;
    stats.total += 1;
    if (answers[index] !== undefined && answers[index] === q.correctIndex) {
      stats.correct += 1;
    }
  });

  // Track all competencies to include in report
  // 1. All required competencies from role profile
  const requiredMap = new Map<string, FRACLevel>();
  role.requiredCompetencies.forEach((req) => {
    requiredMap.set(req.competencyId, req.requiredLevel);
  });

  // Combine required competency IDs and any additional assessed competency IDs
  const allCompetencyIds = new Set<string>();
  role.requiredCompetencies.forEach((req) => allCompetencyIds.add(req.competencyId));
  questionsByCompetency.forEach((_, compId) => allCompetencyIds.add(compId));

  // Calculate scores and current levels for each competency area
  interface EvaluatedArea {
    competencyId: string;
    competencyName: string;
    domainId: string;
    domainName: string;
    requiredLevel: number;
    currentLevel: FRACLevel;
    gap: number;
    scorePercent: number;
    questionCount: number;
  }

  const evaluatedAreas: EvaluatedArea[] = [];

  allCompetencyIds.forEach((compId) => {
    const info = findCompetencyInfo(compId);
    const competencyName = info ? info.competencyName : compId;
    const domainId = info ? info.domainId : 'statistical';
    const domainName = info ? info.domainName : 'Statistical';
    const requiredLevel = requiredMap.get(compId) ?? 1;

    const stats = questionsByCompetency.get(compId);

    let currentLevel: FRACLevel;
    let scorePercent = 0;
    let questionCount = 0;

    if (stats && stats.total > 0) {
      questionCount = stats.total;
      scorePercent = Math.round((stats.correct / stats.total) * 100);
      currentLevel = scoreToFRACLevel(scorePercent);
    } else {
      // Required competency had NO questions (wasn't assessed): default to Level 1 (Aware)
      currentLevel = 1;
      scorePercent = 0;
      questionCount = 0;
    }

    const gap = Math.max(0, requiredLevel - currentLevel);

    evaluatedAreas.push({
      competencyId: info ? info.competencyId : compId,
      competencyName,
      domainId,
      domainName,
      requiredLevel,
      currentLevel,
      gap,
      scorePercent,
      questionCount,
    });
  });

  // Group areas by domain (maintaining the domain structure and ordering from competencyDomains)
  const domainScoresMap = new Map<
    string,
    {
      domainId: string;
      domainName: string;
      areas: {
        competencyId: string;
        competencyName: string;
        requiredLevel: number;
        currentLevel: number;
        gap: number;
      }[];
    }
  >();

  // Initialize domains from competencyDomains
  competencyDomains.forEach((domain) => {
    domainScoresMap.set(domain.id, {
      domainId: domain.id,
      domainName: domain.name,
      areas: [],
    });
  });

  evaluatedAreas.forEach((area) => {
    if (!domainScoresMap.has(area.domainId)) {
      domainScoresMap.set(area.domainId, {
        domainId: area.domainId,
        domainName: area.domainName,
        areas: [],
      });
    }

    domainScoresMap.get(area.domainId)!.areas.push({
      competencyId: area.competencyId,
      competencyName: area.competencyName,
      requiredLevel: area.requiredLevel,
      currentLevel: area.currentLevel,
      gap: area.gap,
    });
  });

  // Filter out domains with no areas and convert map to array
  const domainScores = Array.from(domainScoresMap.values()).filter(
    (domain) => domain.areas.length > 0
  );

  // Compute overall score as weighted average of all percentage scores
  let totalAssessedQuestions = 0;
  let totalCorrectQuestions = 0;

  questions.forEach((q, index) => {
    totalAssessedQuestions += 1;
    if (answers[index] !== undefined && answers[index] === q.correctIndex) {
      totalCorrectQuestions += 1;
    }
  });

  const overallScore =
    totalAssessedQuestions > 0
      ? Math.round((totalCorrectQuestions / totalAssessedQuestions) * 100)
      : evaluatedAreas.length > 0
      ? Math.round(
          evaluatedAreas.reduce((sum, a) => sum + a.scorePercent, 0) /
            evaluatedAreas.length
        )
      : 0;

  const overallLevel = scoreToFRACLevel(overallScore);

  return {
    id: `gap-report-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    userId: 'official-user',
    roleId: role.id,
    assessedAt: new Date().toISOString(),
    domainScores,
    overallScore,
    overallLevel,
  };
}
