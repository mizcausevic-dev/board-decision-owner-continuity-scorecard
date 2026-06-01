import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the continuity summary lines", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 5,
      continuityPriorityLanes: 4,
      averageBoardConfidence: 58.7,
      valueAtStakeMillions: 141,
      leadingMessage: "Owner continuity needs repair."
    });

    expect(output).toContain("Board Decision Owner Continuity Scorecard");
    expect(output).toContain("Continuity-priority lanes: 4");
    expect(output).toContain("Value at stake: $141M");
  });
});
