import request from "supertest";
import app from "../src/app";
import {
  Level,
  presetLevels,
  presetSkills,
  SkillArea,
} from "../src/models/skill";

describe("Skills Controller", () => {
  describe("GET /api/skills", () => {
    it("should return the app preset skills", async () => {
      await request(app).get("/api/skills").expect(200);
      expect((res) => {
        const skills: SkillArea[] = res.body;
        expect(skills.length).toHaveLength(presetSkills.length);
        expect(skills[0]).toBe("php");
      });
    });
  });

  describe("GET /api/skills/levels", () => {
    it("should return the app preset skill levels", async () => {
      await request(app).get("/api/skills/levels").expect(200);
      expect((res) => {
        const levels: Level[] = res.body;
        expect(levels.length).toHaveLength(presetLevels.length);
        expect(levels[0].range).toBe("beginner");
      });
    });
  });
});
