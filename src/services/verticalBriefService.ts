import { analyze } from "../analyze.js";
import { sampleBoardDecisionOwnerContinuityScorecard } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionOwnerContinuityScorecard, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Lock the AI and biotech owner paths first, reduce identity drift second, repair revenue continuity third, and stabilize the FinTech owner chain before it compounds."
  };
}

export function continuityLane() {
  return sampleBoardDecisionOwnerContinuityScorecard.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    continuityTheme: item.continuityTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    continuityBreaks: item.continuityBreaks
  }));
}

export function ownerStability() {
  return sampleBoardDecisionOwnerContinuityScorecard.map((item) => ({
    lane: item.lane,
    continuityHeadline: item.continuityHeadline,
    continuitySignal: item.continuitySignal,
    ownerOfRecord: item.ownerOfRecord,
    requiredEvidence: item.requiredEvidence,
    decisionHandoffs: item.decisionHandoffs,
    ownerChanges: item.ownerChanges
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeContinuityRiskScore: item.compositeContinuityRiskScore,
    handoffs: item.handoffAssessment,
    continuityBreaks: item.breakAssessment,
    ownerChanges: item.ownerChangeAssessment,
    coverage: item.coverageAssessment,
    clarity: item.clarityAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeContinuityRiskScore: item.compositeContinuityRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic owner-continuity data only - no live board packets, actual owner paths, or real ownership histories are included.",
    "Scores are modeled to show how Kinetic Gain can turn owner drift, continuity breaks, and chain instability into board-readable continuity repairs.",
    "All routes are read-only and demonstrate owner-continuity packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    continuityLane: continuityLane(),
    ownerStability: ownerStability(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionOwnerContinuityScorecard
  };
}
