import { Service } from "../models/service";
import { Skill } from "../models/skill";
import getOr from "lodash/fp/getOr";

export const fetchBySkills = async (req, res, next) => {
  try {
    const providerSkills: Skill[] = JSON.parse(
      getOr("[]", "skills", req.query)
    );

    const sampleRequests = Service.fetchBySkills(providerSkills);

    return res.json(sampleRequests);
  } catch (error) {
    next(error);
  }
};

export default {
  fetchBySkills,
};
