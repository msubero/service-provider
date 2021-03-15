import { Skill } from "./skills";

export interface Profile {
  name: string;
  picture: string;
  age: number;
  skills: Skill[];
}