import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../server.js";

describe("POST /quote", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await buildServer();
  });

  after(async () => {
    await app.close();
  });

  it("should return 200 and offers for valid request", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/quote",
      payload: {
        amount: 5000,
        creditBand: 700,
        state: "CA",
        procedure: "dental",
      },
    });

    assert.strictEqual(response.statusCode, 200);
    const body = JSON.parse(response.payload);
    assert.ok(Array.isArray(body.offers));
  });

  it("should return 400 for invalid request (missing amount)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/quote",
      payload: {
        // amount missing
        creditBand: 700,
        state: "CA",
        procedure: "dental",
      },
    });

    assert.strictEqual(response.statusCode, 400);
  });
});
