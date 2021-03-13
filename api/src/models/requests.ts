import { Proffer } from "./clients";
import { Profile } from "./providers";
const storage = require("node-persist");

export interface Application extends Proffer {
  provider: Profile;
}

const getAppliedRequests = (callback) => {
  storage.getItem("applications").then(callback);
};

export class Requests {
  application: Application;

  constructor(application: Application) {
    this.application = application;
  }

  apply() {
    getAppliedRequests((applications: Application[]) => {
      applications.push(this.application);
      storage.setItem("applications", applications);
    });
  }

  static fetchAll(callback) {
    getAppliedRequests(callback);
  }
}
