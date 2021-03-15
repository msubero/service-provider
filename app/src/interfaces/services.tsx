import { Request as ClientRequest } from "./clients";
import { Profile as ProviderProfile } from "./provider";

export interface AcceptedService {
  request: ClientRequest;
  provider: ProviderProfile;
}
