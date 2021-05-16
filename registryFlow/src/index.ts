import * as services from "./services";
import {wrapServices} from "@public-badges/adapters";

export const {
  saveOrganization,
  sendNotifications,
  updateRegistry,
} = wrapServices(services);
