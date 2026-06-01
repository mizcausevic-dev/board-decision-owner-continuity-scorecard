import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardDecisionOwnerContinuityScorecard } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionOwnerContinuityScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionOwnerContinuityScorecard.length);
  });

  it("counts constrained lanes", () => {
    const report = analyze(sampleBoardDecisionOwnerContinuityScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBeGreaterThan(0);
  });

  it("counts continuity-priority lanes", () => {
    const report = analyze(sampleBoardDecisionOwnerContinuityScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.continuityPriorityLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardDecisionOwnerContinuityScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(141);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionOwnerContinuityScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });
});
