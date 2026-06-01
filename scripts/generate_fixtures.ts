import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionOwnerContinuityScorecard } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-owner-continuity-scorecard.json"),
  JSON.stringify(sampleBoardDecisionOwnerContinuityScorecard, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-owner-continuity-scorecard-clean.json"),
  JSON.stringify(
    sampleBoardDecisionOwnerContinuityScorecard.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
