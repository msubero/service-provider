import Joi from "joi";
import map from "lodash/fp/map";

export type Scale = number;
export type SkillArea = "php"
  | "python"
  | "ruby"
  | "nodejs"
  | "laravel"
  | "django"
  | "ruby on rails"
  | "angular";
export interface Level {
  range: Scale[];
  name: "beginner"
    | "advanced beginner"
    | "competent"
    | "proficient"
    | "expert";
}
export interface Skill {
  name: SkillArea;
  level: Level;
}

export const presetLevels = [
  {
    range: [1, 2],
    name: "beginner",
  },
  {
    range: [3, 4],
    name: "advanced beginner",
  },
  {
    range: [5, 6],
    name: "competent",
  },
  {
    range: [7, 8],
    name: "proficient",
  },
  {
    range: [9, 10],
    name: "expert",
  },
];

export const presetSkills: SkillArea[] = [
  "php",
  "python",
  "ruby",
  "nodejs",
  "laravel",
  "django",
  "ruby on rails",
  "angular",
];

export const skillSchema = Joi.object({
  name: Joi.string()
    .valid(...presetSkills)
    .required(),
  level: Joi.object({
    range: Joi.array().items(Joi.number().positive()).required(),
    name: Joi.string().required().valid(...map("name", presetLevels)),
  }),
});
