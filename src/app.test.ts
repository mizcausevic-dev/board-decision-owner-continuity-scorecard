import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-owner-continuity-scorecard app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Owner Continuity Scorecard");
  });

  it("serves the continuity lane route", async () => {
    const response = await request(app).get("/continuity-lane");
    expect(response.status).toBe(200);
  });

  it("serves the owner stability route", async () => {
    const response = await request(app).get("/owner-stability");
    expect(response.status).toBe(200);
  });

  it("serves the intervention posture route", async () => {
    const response = await request(app).get("/intervention-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves the continuity lane API", async () => {
    const response = await request(app).get("/api/continuity-lane");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the owner stability API", async () => {
    const response = await request(app).get("/api/owner-stability");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
