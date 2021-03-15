import { presetLevels, presetSkills } from "../models/skill";

export const fetchSkills = (req, res) => {
  return res.json(presetSkills);
};

export const fetchLevels = (req, res) => {
  return res.json(presetLevels);
};

export default {
  fetchSkills,
  fetchLevels,
};
