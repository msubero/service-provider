import { Service } from "../models/service";
import { Skill } from "../models/skill";
import getOr from "lodash/fp/getOr";

export const fetchBySkills = (req, res) => {
  const providerSkills: Skill[] = JSON.parse(getOr("[]", "skills", req.query));

  const sampleRequests = Service.fetchBySkills(providerSkills);

  return res.json(sampleRequests);
};

export default {
  fetchBySkills,
};
