import { Skill } from "./skills";

export interface Profile {
  name: string;
  location: string;
  email: string;
}

export interface Proffer {
  client: Profile,
  startDate: Date;
  endDate: Date;
  skills: Skill[];
  description: string;
}
