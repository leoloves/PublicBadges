import {MutationResolvers} from "@public-badges/types";
import applyForBadge from "./applyForBadge";
import registerOrganization from "./registerOrganization";

const Mutation: MutationResolvers = {
  applyForBadge,
  registerOrganization,
};

export default Mutation;
