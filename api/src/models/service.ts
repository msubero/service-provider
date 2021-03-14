import { Request as ClientRequest } from "./client";
import { Profile as ProviderProfile } from "./provider";
const storage = require("node-persist");

export interface AcceptedService {
  request: ClientRequest;
  provider: ProviderProfile;
}

const getAcceptedServices = (callback) => {
  storage.getItem("acceptedServices").then(callback);
};

export class Service {
  service: AcceptedService;

  constructor(service: AcceptedService) {
    this.service = service;
  }

  acceptRequest() {
    getAcceptedServices((acceptedServices: AcceptedService[]) => {
      acceptedServices.push(this.service);
      storage.setItem("acceptedServices", acceptedServices);
    });
  }

  static fetchAll(callback) {
    getAcceptedServices(callback);
  }
}
