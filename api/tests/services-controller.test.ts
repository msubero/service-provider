import request from "supertest";
import get from "lodash/fp/get";
import times from "lodash/fp/times";
import app from "../src/app";
import { acceptedService, casualAcceptedService } from "./mocks/services.mock";
const storage = require("node-persist");

describe("Services Controller", () => {
  beforeEach(async () => {
    await storage.init();
    await storage.setItem("acceptedServices", times(casualAcceptedService, 5));
  });

  afterEach(async () => {
    await storage.clear();
  });

  describe("POST /api/services", () => {
    it("should return http status code 409 if requests dates are in conflict", async () => {
      const acceptedServices = await storage.getItem("acceptedServices");
      const scheduledDate = get("0.request.startDate", acceptedServices);

      const body = { ...acceptedService, startDate: scheduledDate };
      await request(app).post("/api/services").send(body).expect(409);
    });

    it("should return http status code 201 if requests dates are not in conflict", async () => {
      const body = { ...acceptedService, startDate: new Date() };
      await request(app).post("/api/services").send(body).expect(201);
    });
  });
});
