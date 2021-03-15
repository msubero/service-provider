import Joi from "joi";
import { Skill, skillSchema } from "./skill";

export interface Profile {
  name: string;
  location: string;
  email: string;
}

export interface Request {
  client: Profile;
  startDate: Date;
  endDate: Date;
  skills: Skill[];
  description: string;
}

export const clientProfileSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  email: Joi.string().email().required(),
});
