import { Skill } from "./skills";

export interface Info {
  name: string;
  location: string;
  email: string;
}

export interface Request {
  skills: Skill[];
  startDate: Date;
  endDate: Date;
  description: string;
}
