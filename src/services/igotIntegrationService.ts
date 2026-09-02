/**
 * iGOT Karmayogi Integration Service Layer
 * 
 * ARCHITECTURE (4-Channel Bidirectional Sync — see research diagram):
 * 
 * Channel 1 — Course Catalogue Pull (inbound, scheduled daily):
 *   GET /courses · filters → Local cache + search index
 *   Pulls iGOT's full course catalogue, caches locally, builds semantic search index.
 * 
 * Channel 2 — Recommendation Push (outbound, on-demand):
 *   POST /learner/recommend → Learner profile API
 *   Pushes AI-ranked course recommendations to the official's iGOT profile.
 * 
 * Channel 3 — Enrolment Monitoring (inbound, event-driven):
 *   GET /learner/{id}/courses → Enrolment status API
 *   Polls or receives webhooks for enrolment and completion events.
 * 
 * Channel 4 — Competency Score Sync (bidirectional, on completion):
 *   POST /completion · score → Completion event API
 *   Recalculates gap scores and pushes refreshed competency record back.
 * 
 * Auth Layer: OAuth 2.0 / API key · SSO token passthrough · Rate limiting + retry logic
 * 
 * DESIGN RULE: Use this integration layer between the platform and iGOT rather
 * than connecting every internal module directly to iGOT APIs.
 * 
 * NOTE: "API endpoints, authentication methods, payloads and access permissions
 * will be finalized in consultation with the iGOT platform administrators."
 * For the SIH hackathon, this uses localStorage-backed mock data.
 */

import { IGOTCourse } from '@/types/statsarthi';
import { igotCourses } from '@/data/igotCourses';

// === ENROLMENT STATUS LIFECYCLE ===
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
  igotCourseId?: string; // iGOT's internal ID (for sync)
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

export interface CompletionRecord {
  userId: string;
  courseId: string;
  completionDate: string;
  finalScore: number;
  certificateStatus: 'pending' | 'issued' | 'not_applicable';
  assessmentResult: 'pass' | 'fail' | 'not_attempted';
  learningHours: number;
  courseVersion: string;
  completionEvidence: string;
}

// === COMPETENCY UPDATE AUDIT TRAIL ===
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

// === SYNC LOG ===
export interface SyncLogEntry {
  id: string;
  operation: 'course_sync' | 'enrollment_sync' | 'completion_sync' | 'competency_update';
  status: 'success' | 'failed' | 'partial';
  recordsProcessed: number;
  recordsFailed: number;
  timestamp: string;
  details: string;
}

// === CONFIGURABLE WEIGHTS FOR COMPETENCY UPDATE ===
const COMPETENCY_WEIGHTS = {
  w1: 0.3,  // Previous competency score weight
  w2: 0.25, // iGOT course result weight
  w3: 0.30, // Platform quiz/assessment result weight
  w4: 0.15, // Practical exercise / supervisor validation weight
};

/**
 * The iGOT Integration Service.
 * 
 * In production, this connects to iGOT Karmayogi via approved REST APIs.
 * For the SIH demo, it uses localStorage-backed mock data.
 */
class IGOTIntegrationService {
  private enrollments: Map<string, EnrollmentRecord> = new Map();
  private syncLog: SyncLogEntry[] = [];
  private auditTrail: CompetencyAuditEntry[] = [];

  constructor() {
    this.loadFromStorage();
  }

  // === STORAGE ===
  private loadFromStorage() {
    try {
      const enrollmentsRaw = localStorage.getItem('igot_enrollments');
      if (enrollmentsRaw) {
        const arr: EnrollmentRecord[] = JSON.parse(enrollmentsRaw);
        arr.forEach(e => this.enrollments.set(`${e.userId}:${e.courseId}`, e));
      }
      const syncRaw = localStorage.getItem('igot_sync_log');
      if (syncRaw) this.syncLog = JSON.parse(syncRaw);
      const auditRaw = localStorage.getItem('igot_audit_trail');
      if (auditRaw) this.auditTrail = JSON.parse(auditRaw);
    } catch {
      // Fresh start
    }
  }

  private saveToStorage() {
    localStorage.setItem('igot_enrollments', JSON.stringify(Array.from(this.enrollments.values())));
    localStorage.setItem('igot_sync_log', JSON.stringify(this.syncLog));
    localStorage.setItem('igot_audit_trail', JSON.stringify(this.auditTrail));
  }

  private addSyncLog(entry: Omit<SyncLogEntry, 'id' | 'timestamp'>) {
    this.syncLog.push({
      ...entry,
      id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    });
    this.saveToStorage();
  }

  // === CHANNEL 1: COURSE CATALOGUE PULL (GET /courses · filters) ===
  // Scheduled daily pull → Local cache + search index
  async getCourses(filters?: {
    competencyTags?: string[];
    difficulty?: string;
    provider?: string;
  }): Promise<IGOTCourse[]> {
    // Production: GET /courses?domain=statistical&level=intermediate
    let courses = [...igotCourses];
    if (filters?.competencyTags?.length) {
      courses = courses.filter(c =>
        c.competencyTags.some(tag => filters.competencyTags!.includes(tag))
      );
    }
    if (filters?.difficulty) {
      courses = courses.filter(c => c.difficulty === filters.difficulty);
    }
    if (filters?.provider) {
      courses = courses.filter(c => c.provider === filters.provider);
    }
    this.addSyncLog({
      operation: 'course_sync',
      status: 'success',
      recordsProcessed: courses.length,
      recordsFailed: 0,
      details: `Retrieved ${courses.length} courses from iGOT catalog`,
    });
    return courses;
  }

  // === COMPETENCY MAPPING RETRIEVAL (supports Channel 1) ===
  async getCompetencies(): Promise<{
    id: string;
    name: string;
    domain: string;
    proficiencyLevels: number;
    frameworkVersion: string;
  }[]> {
    // Production: GET /competencies
    const { competencyDomains } = await import('@/data/competencyFramework');
    return competencyDomains.flatMap(domain =>
      domain.areas.map(area => ({
        id: area.id,
        name: area.name,
        domain: domain.name,
        proficiencyLevels: 5, // FRAC 1-5
        frameworkVersion: 'FRAC-v2.0-MoSPI',
      }))
    );
  }

  // === COURSE-COMPETENCY MAPPING (supports Channel 1) ===
  async getCourseCompetencies(courseId: string): Promise<{
    courseId: string;
    competencyMappings: { competencyId: string; proficiencyLevel: string }[];
  } | null> {
    const course = igotCourses.find(c => c.id === courseId);
    if (!course) return null;
    return {
      courseId: course.id,
      competencyMappings: course.competencyTags.map(tag => ({
        competencyId: tag,
        proficiencyLevel: course.difficulty,
      })),
    };
  }

  // === CHANNEL 2: RECOMMENDATION PUSH (POST /learner/recommend) ===
  // Outbound, on-demand: pushes AI-ranked course list to learner's iGOT profile
  async pushRecommendations(userId: string, rankedCourseIds: string[]): Promise<{
    success: boolean;
    pushedCount: number;
    endpoint: string;
  }> {
    // Production: POST /learner/recommend with body { userId, courseIds, rankings }
    // For SIH demo: mark each course as 'recommended' in local state
    for (const courseId of rankedCourseIds) {
      await this.markAsRecommended(userId, courseId);
    }
    this.addSyncLog({
      operation: 'enrollment_sync',
      status: 'success',
      recordsProcessed: rankedCourseIds.length,
      recordsFailed: 0,
      details: `Channel 2: Pushed ${rankedCourseIds.length} recommendations to iGOT profile for user ${userId}`,
    });
    return {
      success: true,
      pushedCount: rankedCourseIds.length,
      endpoint: 'POST /learner/recommend',
    };
  }

  // === CHANNEL 3: ENROLMENT MONITORING (GET /learner/{id}/courses) ===
  // Inbound, event-driven: polls or receives webhooks for enrolment/completion events
  async getUserLearningHistory(userId: string): Promise<EnrollmentRecord[]> {
    // Production: GET /learner/{userId}/courses
    return Array.from(this.enrollments.values()).filter(e => e.userId === userId);
  }

  // === CHANNEL 3 (cont.): ENROLLMENT STATUS (GET /learner/{id}/courses) ===
  async getEnrollmentStatus(userId: string, courseId: string): Promise<EnrollmentStatus | null> {
    const key = `${userId}:${courseId}`;
    return this.enrollments.get(key)?.status ?? null;
  }

  // === CHANNEL 4: COMPLETION EVENT (POST /completion · score) ===
  // Bidirectional on completion: recalculates gap scores, pushes refreshed record back
  async getCompletionStatus(userId: string, courseId: string): Promise<CompletionRecord | null> {
    const key = `${userId}:${courseId}`;
    const enrollment = this.enrollments.get(key);
    if (!enrollment || enrollment.status !== 'completed' && enrollment.status !== 'certificate_issued') {
      return null;
    }
    return {
      userId,
      courseId,
      completionDate: enrollment.completedAt || new Date().toISOString(),
      finalScore: enrollment.finalScore ?? 0,
      certificateStatus: enrollment.status === 'certificate_issued' ? 'issued' : 'pending',
      assessmentResult: (enrollment.finalScore ?? 0) >= 60 ? 'pass' : 'fail',
      learningHours: enrollment.learningHours ?? 0,
      courseVersion: '1.0',
      completionEvidence: `Completion verified via StatSarthi platform assessment`,
    };
  }

  // === 7. CREATE ENROLLMENT ===
  async createEnrollment(userId: string, courseId: string): Promise<EnrollmentRecord> {
    const key = `${userId}:${courseId}`;
    const existing = this.enrollments.get(key);
    if (existing && existing.status !== 'recommended' && existing.status !== 'viewed') {
      return existing; // Don't re-enroll if already enrolled or completed
    }
    const record: EnrollmentRecord = {
      userId,
      courseId,
      igotCourseId: courseId, // In production, this would be iGOT's internal ID
      status: 'enrolled',
      recommendedAt: existing?.recommendedAt || new Date().toISOString(),
      enrolledAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      sourceSystem: 'statsarthi',
    };
    this.enrollments.set(key, record);
    this.addSyncLog({
      operation: 'enrollment_sync',
      status: 'success',
      recordsProcessed: 1,
      recordsFailed: 0,
      details: `Enrolled user ${userId} in course ${courseId}`,
    });
    this.saveToStorage();
    return record;
  }

  // === MARK COURSE AS RECOMMENDED ===
  async markAsRecommended(userId: string, courseId: string): Promise<void> {
    const key = `${userId}:${courseId}`;
    if (!this.enrollments.has(key)) {
      this.enrollments.set(key, {
        userId,
        courseId,
        status: 'recommended',
        recommendedAt: new Date().toISOString(),
        lastSyncedAt: new Date().toISOString(),
        sourceSystem: 'statsarthi',
      });
      this.saveToStorage();
    }
  }

  // === UPDATE ENROLLMENT STATUS ===
  async updateStatus(userId: string, courseId: string, newStatus: EnrollmentStatus, meta?: {
    finalScore?: number;
    learningHours?: number;
  }): Promise<void> {
    const key = `${userId}:${courseId}`;
    const record = this.enrollments.get(key);
    if (!record) return;

    record.status = newStatus;
    record.lastSyncedAt = new Date().toISOString();

    if (newStatus === 'in_progress' && !record.startedAt) {
      record.startedAt = new Date().toISOString();
    }
    if (newStatus === 'completed' || newStatus === 'certificate_issued') {
      record.completedAt = new Date().toISOString();
      if (meta?.finalScore !== undefined) record.finalScore = meta.finalScore;
      if (meta?.learningHours !== undefined) record.learningHours = meta.learningHours;
    }

    this.enrollments.set(key, record);
    this.addSyncLog({
      operation: 'completion_sync',
      status: 'success',
      recordsProcessed: 1,
      recordsFailed: 0,
      details: `Updated ${courseId} status to ${newStatus} for user ${userId}`,
    });
    this.saveToStorage();
  }

  // === CHANNEL 4: FULL COMPLETION EVENT HANDLER (POST /completion · score) ===
  // This is the MOST CRITICAL channel per the research:
  // 1. Receives completion event from iGOT
  // 2. Recalculates the learner's competency scores for the relevant domain
  // 3. Updates the skill-gap map
  // 4. Pushes the refreshed competency record back to iGOT
  // 5. Re-runs recommendation engine to adjust what's suggested next
  async onCompletionEvent(params: {
    userId: string;
    courseId: string;
    finalScore: number;
    learningHours: number;
    competencyId: string;
    previousCompetencyScore: number;
    platformQuizScore: number;
  }): Promise<{
    enrollmentUpdated: boolean;
    competencyUpdated: { newScore: number; newLevel: number };
    recommendationsRefreshed: boolean;
  }> {
    // Step 1: Update enrollment status to 'completed'
    await this.updateStatus(params.userId, params.courseId, 'completed', {
      finalScore: params.finalScore,
      learningHours: params.learningHours,
    });

    // Step 2: Recalculate competency using weighted formula
    const competencyResult = this.computeUpdatedCompetency({
      userId: params.userId,
      competencyId: params.competencyId,
      previousScore: params.previousCompetencyScore,
      courseResult: params.finalScore,
      platformQuizResult: params.platformQuizScore,
      practicalScore: 50, // Default: practical assessment pending supervisor validation
    });

    // Step 3: Log the bidirectional sync
    this.addSyncLog({
      operation: 'completion_sync',
      status: 'success',
      recordsProcessed: 1,
      recordsFailed: 0,
      details: `Channel 4 bidirectional: Course ${params.courseId} completed (score: ${params.finalScore}%). Competency ${params.competencyId}: ${params.previousCompetencyScore} → ${competencyResult.newScore} (Level ${competencyResult.auditEntry.previousLevel} → ${competencyResult.newLevel})`,
    });

    return {
      enrollmentUpdated: true,
      competencyUpdated: { newScore: competencyResult.newScore, newLevel: competencyResult.newLevel },
      recommendationsRefreshed: true, // In production, this triggers recommendation engine re-run
    };
  }

  // === WEIGHTED COMPETENCY UPDATE (C_new formula) ===
  computeUpdatedCompetency(params: {
    userId: string;
    competencyId: string;
    previousScore: number;    // C_old (0-100)
    courseResult: number;     // A_course (0-100)
    platformQuizResult: number; // A_platform (0-100)
    practicalScore: number;   // P_practical (0-100)
  }): { newScore: number; newLevel: number; auditEntry: CompetencyAuditEntry } {
    const { w1, w2, w3, w4 } = COMPETENCY_WEIGHTS;
    const newScore = Math.round(
      w1 * params.previousScore +
      w2 * params.courseResult +
      w3 * params.platformQuizResult +
      w4 * params.practicalScore
    );

    // Map score to FRAC level (1-5)
    let newLevel: number;
    if (newScore <= 20) newLevel = 1;
    else if (newScore <= 40) newLevel = 2;
    else if (newScore <= 60) newLevel = 3;
    else if (newScore <= 80) newLevel = 4;
    else newLevel = 5;

    const previousLevel = params.previousScore <= 20 ? 1 : params.previousScore <= 40 ? 2 : params.previousScore <= 60 ? 3 : params.previousScore <= 80 ? 4 : 5;

    const auditEntry: CompetencyAuditEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: params.userId,
      competencyId: params.competencyId,
      previousScore: params.previousScore,
      newScore,
      previousLevel,
      newLevel,
      reason: `Weighted update: w1×C_old(${params.previousScore}) + w2×A_course(${params.courseResult}) + w3×A_platform(${params.platformQuizResult}) + w4×P_practical(${params.practicalScore})`,
      components: {
        w1_previousScore: Math.round(w1 * params.previousScore),
        w2_courseResult: Math.round(w2 * params.courseResult),
        w3_platformQuiz: Math.round(w3 * params.platformQuizResult),
        w4_practicalExercise: Math.round(w4 * params.practicalScore),
      },
      timestamp: new Date().toISOString(),
    };

    this.auditTrail.push(auditEntry);
    this.addSyncLog({
      operation: 'competency_update',
      status: 'success',
      recordsProcessed: 1,
      recordsFailed: 0,
      details: `Competency ${params.competencyId} updated: ${params.previousScore} → ${newScore} (Level ${previousLevel} → ${newLevel})`,
    });
    this.saveToStorage();

    return { newScore, newLevel, auditEntry };
  }

  // === GETTERS FOR DASHBOARDS ===
  getSyncLog(): SyncLogEntry[] {
    return [...this.syncLog].reverse(); // Most recent first
  }

  getAuditTrail(userId?: string): CompetencyAuditEntry[] {
    const trail = userId
      ? this.auditTrail.filter(e => e.userId === userId)
      : this.auditTrail;
    return [...trail].reverse();
  }

  getEnrollmentSummary(userId: string): Record<EnrollmentStatus, number> {
    const summary: Record<EnrollmentStatus, number> = {
      recommended: 0,
      viewed: 0,
      enrolled: 0,
      in_progress: 0,
      completed: 0,
      failed: 0,
      expired: 0,
      certificate_issued: 0,
    };
    for (const record of this.enrollments.values()) {
      if (record.userId === userId) {
        summary[record.status]++;
      }
    }
    return summary;
  }

  getTotalLearningHours(userId: string): number {
    let total = 0;
    for (const record of this.enrollments.values()) {
      if (record.userId === userId && record.learningHours) {
        total += record.learningHours;
      }
    }
    return total;
  }
}

// Singleton export
export const igotService = new IGOTIntegrationService();
