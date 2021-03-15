import request from "supertest";
import app from "../src/app";
import map from "lodash/fp/map";
import { Request as ClientRequests } from "../src/models/client";
import { Skill } from "../src/models/skill";
import { providerProfile } from "../src/util/mocks/provider.mock";

describe("Clients Controller", () => {
  describe("GET /api/clients", () => {
    it("should retrieve a sample of 5 requests from clients", async () => {
      await request(app)
        .get("/api/clients/requests")
        .expect(200)
        .expect((res) => expect(res.body).toHaveLength(5));
    });

    it("should retrieve 2 sample requests with conflicting dates (same start date)", async () => {
      await request(app)
        .get("/api/clients/requests")
        .expect(200)
        .expect((res) => {
          const samples: ClientRequests[] = res.body;
          const startDates: Date[] = map("startDate", samples);
          const diffDates: Date[] = [];
          let conflictingDates: Date[] = [...startDates];

          for (const startDate of startDates) {
            if (!diffDates.includes(startDate)) {
              diffDates.push(startDate);
            } else {
              conflictingDates = conflictingDates.filter(
                (d) => d === startDate
              );
            }
          }

          expect(conflictingDates.length).toBe(2);
        });
    });

    describe("when retrieve a sample of requests from clients", () => {
      it("should match provider skills", async () => {
        const provider = providerProfile;
        const providerSkills: Skill[] = provider.skills;

        await request(app)
          .get("/api/clients/requests")
          .query({ skills: JSON.stringify(providerSkills) })
          .expect(200)
          .expect((res) => {
            const samples: ClientRequests[] = res.body;
            for (const sample of samples) {
              const requestedSkills = sample.skills;
              const providerSkillAreas = map("name", providerSkills);

              expect(
                requestedSkills.every(({ name }) =>
                  providerSkillAreas.includes(name)
                )
              ).toBeTruthy();
            }
          });
      });

      it("should match with the experience in the skill of the provider", async () => {
        const provider = providerProfile;
        const providerSkills: Skill[] = provider.skills;

        await request(app)
          .get("/api/clients/requests")
          .query({ skills: JSON.stringify(providerSkills) })
          .expect(200)
          .expect((res) => {
            const samples: ClientRequests[] = res.body;
            for (const sample of samples) {
              const requestedSkills = sample.skills;

              const requiredSkillExperience = requestedSkills.some(
                (request) => {
                  return providerSkills.some(
                    ({ name, level }) =>
                      name === request.name &&
                      request.level.range.some((requiredLevel) =>
                        level.range.includes(requiredLevel)
                      )
                  );
                }
              );

              expect(requiredSkillExperience).toBeTruthy();
            }
          });
      });
    });
  });
});
