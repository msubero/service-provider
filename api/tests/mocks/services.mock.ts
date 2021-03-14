import * as casual from "casual";
import { AcceptedService } from "../../src/models/service";
import { clientRequest } from "./client.mock";
import { provider } from "./provider.mock";

export const casualAcceptedService = (): AcceptedService => ({
  request: clientRequest,
  provider,
});

casual.define("acceptedService", casualAcceptedService);

export const acceptedService = casual["acceptedService"];
