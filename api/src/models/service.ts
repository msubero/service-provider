import fs from "fs";
import path from "path";
import get from "lodash/fp/get";
import times from "lodash/fp/times";
import { rootDir } from "../util/path";
import { Skill } from "./skill";
import { Request as ClientRequest } from "./client";
import { Profile as ProviderProfile } from "./provider";
import { casualClientRequest } from "../util/mocks/client.mock";
export interface AcceptedService {
  request: ClientRequest;
  provider: ProviderProfile;
}

const filePath = path.join(rootDir, "../data", "acceptedServices.json");

const getAcceptedServices = (callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data) || data);
    }
  });
};

export class Service {
  service: AcceptedService;

  constructor(service: AcceptedService) {
    this.service = service;
  }

  acceptRequest() {
    getAcceptedServices((acceptedServices: AcceptedService[]) => {
      acceptedServices.push(this.service);
      fs.writeFile(filePath, JSON.stringify(acceptedServices), (err) => {
        if (err) {
          return console.log({ err });
        }
      });
    });
  }

  static fetchAll(callback) {
    getAcceptedServices(callback);
  }

  static fetchBySkills(providerSkills: Skill[]) {
    const sampleRequests: ClientRequest[] = times(
      () => casualClientRequest(providerSkills),
      5
    );

    const scheduledDate = get("0.startDate", sampleRequests);
    sampleRequests[2] = {
      ...sampleRequests[2],
      startDate: scheduledDate,
    };
    return sampleRequests;
  }
}
