import {MutationResolvers} from "@public-badges/types";
import applyForBadge from "./applyForBadge";
import approveOrganization from "./approveOrganization";
import registerOrganization from "./registerOrganization";

const Mutation: MutationResolvers = {
  applyForBadge,
  approveOrganization,
  registerOrganization,
};

export default Mutation;
