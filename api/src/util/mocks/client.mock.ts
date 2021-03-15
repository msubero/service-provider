import casual from "casual";
import times from "lodash/fp/times";
import uniqBy from "lodash/fp/uniqBy";
import addDays from "date-fns/addDays";
import { Request as ClientRequest } from "../../models/client";
import { casualSkill } from "./skill.mock";
import { Skill } from "../../models/skill";

export const casualClient = () => ({
  name: casual.company_name,
  location: casual.address,
  email: casual.email,
});

casual.define("client", casualClient);

export const client = casual["client"];

export const casualClientRequest = (
  providerSkills: Skill[] = []
): ClientRequest => {
  const startDate = new Date(
    casual.integer(2019, 2021),
    casual.integer(0, 11),
    casual.integer(1, 30)
  );
  const skills: Skill[] = times(() => casualSkill(providerSkills), 4)
  const client = casualClient()
  return {
    startDate,
    endDate: addDays(startDate, casual.integer(1, 30)),
    description: casual.text,
    client,
    skills: uniqBy("name", skills)
  };
};

casual.define("clientRequest", casualClientRequest);

export const clientRequest = casual["clientRequest"];
