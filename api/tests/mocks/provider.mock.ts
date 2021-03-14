import * as casual from "casual";
import times from "lodash/fp/times";
import { skill } from "./skill.mock";

export const casualProvider = () => ({
  name: casual.full_name,
  picture: `${casual.uuid}.jpg`,
  age: casual.integer(18, 60),
  skills: times(skill, 5),
});

casual.define("provider", casualProvider);

export const provider = casual["provider"];
