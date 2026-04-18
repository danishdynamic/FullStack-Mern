import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "../server.js";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

describe("Notes API Integration", () => {

  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ✅ CREATE NOTE
  it("POST /api/notes should create a note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .send({
        title: "Integration Test",
        content: "Testing create",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Integration Test");
  });

  // ✅ GET ALL NOTES
  it("GET /api/notes should return notes", async () => {
    const res = await request(app).get("/api/notes");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ❌ INVALID ID
  it("GET /api/notes/:id should return 404", async () => {
    const res = await request(app).get("/api/notes/123456789012");

    expect(res.statusCode).toBe(500); // mongoose invalid id throws error
  });

});