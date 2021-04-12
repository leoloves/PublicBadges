import issuerFixture from "./issuer.json";
import {IssuerStore} from "@public-badges/types";

const issuer: IssuerStore = {
  async fetch() {
    return issuerFixture;
  },
  async fetchAll() {
    return [issuerFixture];
  },
};

export default issuer;
