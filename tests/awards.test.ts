import request from "supertest";

import configDB from "../src/config/database";

import app from "../src/app";
import { container } from "../src/config/container";
import { TYPES } from "../src/types";
import { IProcessCSV } from "../src/data/interfaces/processCSV.interface";

beforeAll(async () => {
  await configDB();

  const processCSV = container.get<IProcessCSV>(TYPES.ProcessCSV);

  await processCSV.run();
});

describe("GET /producers/awards/intervals", () => {
  it("should return producers awards intervals", async () => {
    const response = await request(app).get("/api/producers/awards/intervals");

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "sucess",
        data: {
          min: [
            {
              producer: "Joel Silver",
              interval: 1,
              previousWin: 1990,
              followingWin: 1991,
            },
          ],
          max: [
            {
              producer: "Matthew Vaughn",
              interval: 13,
              previousWin: 2002,
              followingWin: 2015,
            },
          ],
        },
        code: 200,
      })
    );
  });
});
