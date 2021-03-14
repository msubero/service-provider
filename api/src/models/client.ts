import { Skill } from "./skill";

export interface Profile {
  name: string;
  location: string;
  email: string;
}

export interface Request {
  client: Profile,
  startDate: Date;
  endDate: Date;
  skills: Skill[];
  description: string;
}
