import Joi from "joi";

import { Skill, skillSchema } from "./skill";

export interface Profile {
  name: string;
  picture: string;
  age: number;
  skills: Skill[];
}

export const providerProfileSchema = Joi.object({
  name: Joi.string().required(),
  picture: Joi.string().required(),
  age: Joi.number().positive().required(),
  skills: Joi.array().items(skillSchema).required(),
});
