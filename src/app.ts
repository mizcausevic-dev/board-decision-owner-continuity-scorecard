import express from "express";
import { continuityLane, interventionPosture, ownerStability, payload, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderContinuityLane,
  renderDocs,
  renderInterventionPosture,
  renderOwnerContinuityOverview,
  renderOwnerStability,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOwnerContinuityOverview()));
  app.get("/continuity-lane", (_req, res) => res.type("html").send(renderContinuityLane()));
  app.get("/owner-stability", (_req, res) => res.type("html").send(renderOwnerStability()));
  app.get("/intervention-posture", (_req, res) => res.type("html").send(renderInterventionPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/continuity-lane", (_req, res) => res.json(continuityLane()));
  app.get("/api/owner-stability", (_req, res) => res.json(ownerStability()));
  app.get("/api/intervention-posture", (_req, res) => res.json(interventionPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, "127.0.0.1", () => {
    console.log(`board-decision-owner-continuity-scorecard listening on http://127.0.0.1:${port}`);
  });
}
