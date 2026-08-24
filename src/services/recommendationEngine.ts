import { GapReport, IGOTCourse, NSSTACourse, PathwayStep } from '@/types/statsarthi';
import { igotCourses } from '@/data/igotCourses';
import { nsstaCourses } from '@/data/nsstaCourses';

// Helper to compute a recommendation score for a course given a specific competency gap
function scoreCourse(
  course: IGOTCourse | NSSTACourse,
  gapSize: number,
  targetLevel: number
): number {
  let score = 0;

  // 1. Competency Relevance (Baseline)
  score += 50;

  // 2. Gap Severity Weighting (Bigger gaps need more comprehensive courses, maybe longer duration or specific tags)
  if (gapSize >= 3) {
    score += course.durationMinutes > 120 ? 20 : 5; // Prefer deeper courses for critical gaps
  } else {
    score += course.durationMinutes < 120 ? 15 : 5; // Prefer quick refreshers for small gaps
  }

  // 3. Difficulty Suitability (Assuming course tags might hint at level - simulated here)
  // If the target level is Ustad (5), we want advanced courses
  if (targetLevel >= 4) {
    score += course.title.toLowerCase().includes('advanced') || course.title.toLowerCase().includes('masterclass') ? 30 : 0;
  } else if (targetLevel <= 2) {
    score += course.title.toLowerCase().includes('basics') || course.title.toLowerCase().includes('introduction') ? 30 : 0;
  }

  return score;
}

export function generateLearningPathway(report: GapReport): PathwayStep[] {
  const steps: PathwayStep[] = [];
  
  // Find all areas with a gap
  const gaps = report.domainScores.flatMap(d => 
    d.areas
      .filter(a => a.gap > 0)
      .map(a => ({ ...a, domainId: d.domainId }))
  );

  // Sort gaps by severity (largest gap first = highest priority)
  gaps.sort((a, b) => b.gap - a.gap);

  gaps.forEach((gap, index) => {
    // Score and sort iGOT courses
    const scoredIgot = igotCourses
      .filter(c => c.competencyTags.includes(gap.competencyId))
      .map(c => ({ id: c.id, score: scoreCourse(c, gap.gap, gap.requiredLevel) }))
      .sort((a, b) => b.score - a.score);

    // Score and sort NSSTA courses
    const scoredNssta = nsstaCourses
      .filter(c => c.competencyTags.includes(gap.competencyId))
      .map(c => ({ id: c.id, score: scoreCourse(c, gap.gap, gap.requiredLevel) }))
      .sort((a, b) => b.score - a.score);

    steps.push({
      priority: index + 1,
      competencyArea: gap.competencyId,
      domainId: gap.domainId,
      currentLevel: gap.currentLevel,
      targetLevel: gap.requiredLevel,
      recommendedCourses: {
        // Take top 2 highest scoring courses, fallback to a default if none match perfectly
        igot: scoredIgot.length > 0 ? scoredIgot.slice(0, 2).map(c => c.id) : [igotCourses[0].id], 
        nssta: scoredNssta.length > 0 ? scoredNssta.slice(0, 2).map(c => c.id) : [],
      },
      status: 'not_started'
    });
  });

  return steps;
}
