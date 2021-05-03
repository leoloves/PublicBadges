import * as services from "./services";
import { wrapServices } from "@public-badges/adapters";

export const {
    prepareOpenBadgeArtifact,
    runValueCaseScenarios,
    saveBadge,
    signOpenBadgeArtifact,
} = wrapServices(services);
