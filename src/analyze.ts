import type {
  BoardDecisionOwnerContinuityScorecardExport,
  BoardDecisionOwnerContinuityScorecardItem,
  BoardDecisionOwnerContinuityScorecardReportItem,
  ContinuityAssessment,
  ContinuitySeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ContinuityAssessment {
  let severity: ContinuitySeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): ContinuityAssessment {
  let severity: ContinuitySeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionOwnerContinuityScorecardItem[],
  options: { now?: string } = {}
): BoardDecisionOwnerContinuityScorecardExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionOwnerContinuityScorecardReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain short enough to preserve the current owner path.",
      "Decision handoffs are stretching and may soon weaken owner continuity.",
      "Decision handoffs are now too long to trust the current owner path."
    );

    const breakAssessment = assessDelay(
      item.continuityBreaks,
      0,
      1,
      "Continuity breaks are closed tightly enough to keep the owner path stable.",
      "Continuity breaks are accumulating and will soon require explicit repair.",
      "Continuity breaks are now too numerous to trust the owner path."
    );

    const ownerChangeAssessment = assessDelay(
      item.ownerChanges,
      0,
      1,
      "Owner changes remain low enough to keep continuity stable.",
      "Owner changes are starting to thin the continuity story.",
      "Owner changes are now overwhelming the intended owner path."
    );

    const coverageAssessment = assessStrength(
      item.continuityCoverageScore,
      78,
      62,
      "Continuity coverage is strong enough to back the current owner path.",
      "Continuity coverage is uneven and may soon hide owner instability.",
      "Continuity coverage is too weak to support the current owner path."
    );

    const clarityAssessment = assessStrength(
      item.decisionClarityScore,
      78,
      62,
      "Decision clarity remains strong enough to keep owner continuity legible.",
      "Decision clarity is getting patchy and may soon weaken continuity trust.",
      "Decision clarity is too weak to support the current owner path."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains strong enough to trust the current owner path.",
      "Board confidence is becoming dependent on extra continuity explanation.",
      "Board confidence is too thin to trust the current owner path."
    );

    const compositeContinuityRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.continuityBreaks * 15 +
          item.ownerChanges * 12 +
          (100 - item.continuityCoverageScore) +
          (100 - item.decisionClarityScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      breakAssessment,
      ownerChangeAssessment,
      coverageAssessment,
      clarityAssessment,
      confidenceAssessment,
      compositeContinuityRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.breakAssessment.severity === "HIGH" ||
      item.ownerChangeAssessment.severity === "HIGH" ||
      item.coverageAssessment.severity === "HIGH" ||
      item.clarityAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const continuityPriorityLanes = reportItems.filter(
    (item) => item.action === "LOCK_OWNER" || item.action === "REPAIR_CONTINUITY"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Owner continuity remains stable enough to support the current board packet."
      : constrainedLanes <= 2
        ? "A few lanes need continuity repair before the next board cycle compounds owner instability."
        : "Owner continuity is now a shared operating constraint and should be repaired across multiple board-facing lanes.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      continuityPriorityLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionOwnerContinuityScorecardItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
