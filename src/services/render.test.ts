import { describe, expect, it } from "vitest";
import {
  renderContinuityLane,
  renderDocs,
  renderInterventionPosture,
  renderOwnerContinuityOverview,
  renderOwnerStability,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOwnerContinuityOverview()).toContain("Board Decision Owner Continuity Scorecard");
  });

  it("renders the product depth and shared proof pattern", () => {
    const html = renderOwnerContinuityOverview();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("portfolio.kineticgain.com");
    expect(html).toContain("board-decision-owner-continuity-scorecard");
  });

  it("renders the continuity lane route", () => {
    expect(renderContinuityLane()).toContain("/continuity-lane");
  });

  it("renders the owner stability route", () => {
    expect(renderOwnerStability()).toContain("/owner-stability");
  });

  it("renders the intervention posture route", () => {
    expect(renderInterventionPosture()).toContain("Composite continuity risk");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic owner-continuity data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
