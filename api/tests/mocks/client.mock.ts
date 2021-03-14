import * as casual from "casual";
import times from "lodash/fp/times";
import addDays from "date-fns/addDays";
import { Request as ClientRequest } from "../../src/models/client";
import { skill } from "./skill.mock";

export const casualClient = () => ({
  name: casual.company_name,
  location: casual.address,
  email: casual.email,
});

casual.define("client", casualClient);

export const client = casual["client"];

export const casualClientRequest = (): ClientRequest => {
  const startDate = new Date(
    casual.integer(2019, 2021),
    casual.integer(0, 11),
    casual.integer(1, 30)
  );
  return {
    startDate,
    endDate: addDays(startDate, casual.integer(1, 30)),
    description: casual.text,
    client,
    skills: times(skill, 2),
  };
};

casual.define("clientRequest", casualClientRequest);

export const clientRequest = casual["clientRequest"];
