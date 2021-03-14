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

export const levels = [
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

export const skills = [
  "php",
  "python",
  "ruby",
  "nodejs",
  "laravel",
  "django",
  "ruby on Rails",
  "angular",
];
