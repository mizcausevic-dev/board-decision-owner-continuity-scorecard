# Board Decision Owner Continuity Scorecard

Board-ready owner-continuity scorecard for tracking whether final decision ownership remains stable, legible, and board-safe across the executive estate.

- Live: `https://continuity.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-owner-continuity-scorecard`

## Why this matters

Leaders need more than one-time owner resets. They need one scorecard that shows where decision ownership remains stable, where continuity is slipping, and which lanes are too fragile for another board cycle.

## What it includes

- TypeScript executive-intelligence surface for owner-continuity scoring with modeled owner-of-record lanes, continuity drift, stability thresholds, and board-safe intervention posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for continuity lanes, ownership scorecards, intervention packets, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/continuity-lane`
- `/owner-stability`
- `/intervention-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-owner-continuity-scorecard
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-owner-continuity-scorecard fixtures/board-decision-owner-continuity-scorecard.json --format summary
npx board-decision-owner-continuity-scorecard fixtures/board-decision-owner-continuity-scorecard-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Continuity lane](screenshots/02-continuity-lane-proof.png)
![Owner stability](screenshots/03-owner-stability-proof.png)
![Intervention posture](screenshots/04-intervention-posture-proof.png)
