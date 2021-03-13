import { Skill } from "./skills";

export interface Profile {
  name: string;
  location: string;
  email: string;
}

export interface ServiceRequired {
  startDate: Date;
  endDate: Date;
  skills: Skill[];
  description: string;
}
