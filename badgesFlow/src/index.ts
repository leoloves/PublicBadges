import * as services from "./services";
import { wrapServices } from "@public-badges/adapters";

export const {
  prepareOpenBadgeArtifact,
  runValueCaseScenarios,
  saveBadge,
  sendNotifications,
  signOpenBadgeArtifact,
} = wrapServices(services);
