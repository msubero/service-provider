import casual from "casual";
import map from "lodash/fp/map";
import {
  presetLevels,
  Skill,
  presetSkills,
  SkillArea,
  Level,
} from "../../models/skill";

const getLevel = (skill: SkillArea, providerSkills: Skill[] = []): Level => {
  let level;
  if (providerSkills.length) {
    level = providerSkills.find((providerSkill) => providerSkill.name === skill)
      ?.level;
  } else {
    const scale = casual.integer(1, 10);
    level = presetLevels.find((l) => l.range.includes(scale));
  }

  return level;
};

export const casualSkill = (providerSkills: Skill[] = []): any => {
  const skill = casual.populate_one_of(
    providerSkills.length ? map("name", providerSkills) : presetSkills
  ) as SkillArea;

  return {
    name: skill,
    level: getLevel(skill, providerSkills),
  };
};

casual.define("skill", casualSkill);

export const skill: Skill = casual["skill"];
