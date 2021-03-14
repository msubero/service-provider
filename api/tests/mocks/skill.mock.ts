import * as casual from "casual";
import { levels, Skill, skills } from "../../src/models/skill";

export const casualSkill = () => ({
  name: casual.populate_one_of(skills),
  level: levels.find((level) => level.range.includes(casual.integer(1, 10))),
});

casual.define("skill", casualSkill);

export const skill: Skill = casual["skill"];
