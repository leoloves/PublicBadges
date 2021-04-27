import {QueryResolvers} from "@public-badges/types";
import getAllBadges from "./getAllBadges";
import getValueCase from "./getValueCase";

const Query: QueryResolvers = {
  getAllBadges,
  getValueCase,
};

export default Query;
