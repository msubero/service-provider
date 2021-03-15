import fs from "fs";
import path from "path";
import request from "supertest";
import get from "lodash/fp/get";
import times from "lodash/fp/times";
import app from "../src/app";
import { rootDir } from "../src/util/path";
import {
  acceptedService,
  casualAcceptedService,
} from "../src/util/mocks/services.mock";
import { providerProfile } from "../src/util/mocks/provider.mock";

const filePath = path.join(rootDir, "../data", "acceptedServices.json");
const acceptedServices = times(casualAcceptedService, 2);
const service = acceptedService;

beforeAll(() => {
  fs.writeFile(filePath, JSON.stringify(acceptedServices), () => {});
});

describe("Services Controller", () => {
  describe("POST /api/services", () => {
    it("should return http status code 400 if incoming data isn't valid", async () => {
      const body = { provider: providerProfile };
      await request(app).post("/api/services").send(body).expect(400);
    });

    it("should return http status code 409 if requests dates are in conflict", async () => {
      const scheduledDate = get("0.request.startDate", acceptedServices);

      const body = {
        ...service,
        request: {
          ...service.request,
          startDate: scheduledDate,
        },
      };

      await request(app).post("/api/services").send(body).expect(409);
    });

    it("should save the new service request accepted by the provider", async () => {
      const body = {
        ...service,
        request: {
          ...service.request,
          startDate: new Date(),
        },
      };
      await request(app).post("/api/services").send(body).expect(201);
    });
  });
});
