import casual from "casual";
import times from "lodash/fp/times";
import uniqBy from "lodash/fp/uniqBy";
import { Profile } from "../../models/provider";
import { Skill } from "../../models/skill";
import { casualSkill } from "./skill.mock";

export const casualProviderProfile = () => {
  const skills: Skill[] = times(casualSkill as any, 3) as any;
  return {
    name: casual.full_name,
    picture: `${casual.uuid}.jpg`,
    age: casual.integer(18, 60),
    skills: uniqBy("name", skills),
  };
};

casual.define("providerProfile", casualProviderProfile);

export const providerProfile: Profile = casual["providerProfile"];
