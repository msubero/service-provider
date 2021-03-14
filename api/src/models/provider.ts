import { Skill } from "./skill";

export interface Profile {
  name: string;
  picture: string;
  age: number;
  skills: Skill[];
}
