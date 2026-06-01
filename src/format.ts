export function formatSummary(
  summary: {
    items: number;
    constrainedLanes: number;
    continuityPriorityLanes: number;
    averageBoardConfidence: number;
    valueAtStakeMillions: number;
    leadingMessage: string;
  },
  title = "Board Decision Owner Continuity Scorecard"
) {
  return [
    title,
    `Lanes: ${summary.items}`,
    `Constrained lanes: ${summary.constrainedLanes}`,
    `Continuity-priority lanes: ${summary.continuityPriorityLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    `Leading message: ${summary.leadingMessage}`
  ].join("\n");
}
