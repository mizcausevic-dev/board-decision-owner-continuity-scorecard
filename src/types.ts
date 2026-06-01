export type DecisionOwnerContinuityTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type ContinuityAction = "LOCK_OWNER" | "STABILIZE_CHAIN" | "REDUCE_DRIFT" | "REPAIR_CONTINUITY";

export type ContinuitySeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionOwnerContinuityScorecardItem {
  id: string;
  lane: string;
  track: DecisionOwnerContinuityTrack;
  action: ContinuityAction;
  continuityTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  continuityHeadline: string;
  continuitySignal: string;
  ownerOfRecord: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  continuityBreaks: number;
  ownerChanges: number;
  continuityCoverageScore: number;
  decisionClarityScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ContinuityAssessment {
  severity: ContinuitySeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionOwnerContinuityScorecardReportItem extends BoardDecisionOwnerContinuityScorecardItem {
  handoffAssessment: ContinuityAssessment;
  breakAssessment: ContinuityAssessment;
  ownerChangeAssessment: ContinuityAssessment;
  coverageAssessment: ContinuityAssessment;
  clarityAssessment: ContinuityAssessment;
  confidenceAssessment: ContinuityAssessment;
  compositeContinuityRiskScore: number;
}

export interface BoardDecisionOwnerContinuityScorecardSummary {
  items: number;
  constrainedLanes: number;
  continuityPriorityLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionOwnerContinuityScorecardExport {
  generatedAt: string;
  summary: BoardDecisionOwnerContinuityScorecardSummary;
  items: BoardDecisionOwnerContinuityScorecardReportItem[];
}

export interface BoardDecisionOwnerContinuityScorecardPayload {
  report: BoardDecisionOwnerContinuityScorecardExport;
  continuityLane: ReturnType<typeof import("./services/verticalBriefService.js").continuityLane>;
  ownerStability: ReturnType<typeof import("./services/verticalBriefService.js").ownerStability>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionOwnerContinuityScorecardItem[];
}
