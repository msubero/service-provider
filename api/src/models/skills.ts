export type Scale = number;
export interface Level {
  range: Scale[];
  name:
    | "beginner"
    | "advanced beginner"
    | "competent"
    | "proficient"
    | "expert";
}
export interface Skill {
  name: string;
  level: Level;
}