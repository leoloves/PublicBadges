import * as services from "./services";
import {wrapServices} from "@public-badges/adapters";

export const {
  saveOrganization,
  approveOrganization,
  updateRegistry,
} = wrapServices(services);
