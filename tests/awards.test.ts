import request from "supertest";

import configDB from "../src/config/database";
import processCSV from "../src/config/processCSV";

import app from "../src/app";

beforeAll(async () => {
  await configDB();
  await processCSV.run();
});

describe("GET /producers/awards/intervals", () => {
  it("should return producers awards intervals", async () => {
    const response = await request(app).get("/api/producers/awards/intervals");

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        min: expect.arrayContaining([
          expect.objectContaining({
            producer: expect.any(String),
            previousWin: expect.any(String),
            followingWin: expect.any(String),
            interval: expect.any(Number),
          }),
        ]),
        max: expect.arrayContaining([
          expect.objectContaining({
            producer: expect.any(String),
            previousWin: expect.any(String),
            followingWin: expect.any(String),
            interval: expect.any(Number),
          }),
        ]),
      })
    );
  });
});
