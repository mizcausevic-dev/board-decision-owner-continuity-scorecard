import {
  continuityLane,
  interventionPosture,
  ownerStability,
  payload,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Decision Owner Continuity Scorecard";
const domain = "https://continuity.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/continuity-lane", "Continuity lane"],
    ["/owner-stability", "Owner stability"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOwnerContinuityOverview() {
  const executiveSummary = summary();
  const lanes = continuityLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Continuity theme:</strong> ${escapeHtml(item.continuityTheme)}</p>
        <p><strong>Decision handoffs:</strong> ${item.decisionHandoffs} · <strong>Continuity breaks:</strong> ${item.continuityBreaks}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeContinuityRiskScore} · confidence ${item.boardConfidenceScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Owner continuity</span>
      <h1>Where is final decision ownership too unstable for the board to trust another cycle without continuity repair?</h1>
      <p class="lede">Board Decision Owner Continuity Scorecard turns owner drift, continuity breaks, chain instability, coverage weakness, and board-confidence erosion into one executive packet for continuity repair and board-safe follow-through.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Continuity lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled owner-continuity lanes in the current executive packet.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Lanes with high handoff, owner-change, coverage, clarity, or confidence strain.</div></div>
        <div class="metric"><span class="metric-label">Priority lanes</span><span class="metric-value">${executiveSummary.continuityPriorityLanes}</span><div class="metric-copy">Lanes that already justify locking owners or repairing continuity breaks.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unstable owner continuity and missing continuity evidence.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Continuity lane</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible continuity exposures</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready owner-continuity scorecard for stabilizing final ownership, continuity coverage, and board-trustworthy decision follow-through."
  );
}

export function renderContinuityLane() {
  const rows = continuityLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.continuityTheme)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.continuityBreaks}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Continuity lane",
    "/continuity-lane",
    `<section class="hero">
      <span class="eyebrow">Continuity lane</span>
      <h1>Each lane stays tied to one owner, one audience, one continuity problem, and one corrective move.</h1>
      <p class="lede">The continuity-lane view keeps owner-path stability readable instead of hiding it behind more committee motion.</p>
      <div class="nav">${navLinks("/continuity-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Continuity theme</th><th>Handoffs</th><th>Continuity breaks</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Owner-continuity view showing owners, actions, continuity breaks, and board-confidence strength."
  );
}

export function renderOwnerStability() {
  const rows = ownerStability()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.continuityHeadline)}</td>
        <td>${escapeHtml(item.continuitySignal)}</td>
        <td>${escapeHtml(item.ownerOfRecord)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.ownerChanges}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Owner stability",
    "/owner-stability",
    `<section class="hero">
      <span class="eyebrow">Owner stability</span>
      <h1>Owner-path stability, change frequency, and evidence gaps stay visible in one scorecard instead of scattering across review notes.</h1>
      <p class="lede">This view compares continuity headlines, owner-of-record stability, owner-change load, and the exact evidence needed to make the next board packet trustworthy.</p>
      <div class="nav">${navLinks("/owner-stability")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Headline</th><th>Continuity signal</th><th>Owner of record</th><th>Handoffs</th><th>Owner changes</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Owner-stability view showing continuity headlines, owner-of-record stability, owner-change load, and evidence needs."
  );
}

export function renderInterventionPosture() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeContinuityRiskScore}</td>
        <td>${escapeHtml(item.handoffs.severity)}</td>
        <td>${escapeHtml(item.continuityBreaks.severity)}</td>
        <td>${escapeHtml(item.ownerChanges.severity)}</td>
        <td>${escapeHtml(item.coverage.severity)}</td>
        <td>${escapeHtml(item.clarity.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>Composite continuity risk stays tied to the exact weakness creating board-trust erosion.</h1>
      <p class="lede">This intervention view keeps handoff strain, continuity breaks, owner drift, coverage, clarity, and board confidence in one board-readable posture instead of separate ops narratives.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Risk</th><th>Handoffs</th><th>Continuity breaks</th><th>Owner changes</th><th>Coverage</th><th>Clarity</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture view for continuity risk, owner stability, drift, and board-confidence severity."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this owner-continuity packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live board continuity scorecard.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
      <pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre>
    </section>`,
    "Verification notes for the Board Decision Owner Continuity Scorecard sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Decision Owner Continuity Scorecard docs</h1>
      <p class="lede">This surface packages board-readable owner-continuity signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/continuity-lane</code> keeps owner, audience, action, and continuity-break pressure attached.</li>
        <li><code>/owner-stability</code> compares continuity signals, owner stability, and evidence needs.</li>
        <li><code>/intervention-posture</code> scores handoffs, owner changes, coverage, clarity, and board-confidence strain.</li>
        <li><code>/api/payload</code> exposes the reproducible owner-continuity packet.</li>
      </ul>
    </section>`,
    "Product documentation for Board Decision Owner Continuity Scorecard and its board-ready routes."
  );
}
