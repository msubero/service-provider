import casual from "casual";
import { AcceptedService } from "../../models/service";
import { clientRequest } from "./client.mock";
import { providerProfile } from "./provider.mock";

export const casualAcceptedService = (): AcceptedService => ({
  request: clientRequest,
  provider: providerProfile,
});

casual.define("acceptedService", casualAcceptedService);

export const acceptedService = casual["acceptedService"];
