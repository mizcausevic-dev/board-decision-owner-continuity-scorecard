# Architecture

Board Decision Owner Continuity Scorecard is a static-friendly TypeScript executive-intelligence surface for showing where final decision ownership has become too unstable, continuity breaks are compounding, coverage is thinning, and board confidence is weakening.

## Routes

- `/`
- `/continuity-lane`
- `/owner-stability`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample owner-continuity items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores handoff pressure, continuity breaks, owner changes, coverage, decision clarity, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable owner-continuity packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
