import "graphql-import-node";
import * as Schema from "./Schema.graphql";
import * as Query from "./Query.graphql";
import * as Mutation from "./Mutation.graphql";
import * as Language from "./Language.graphql";
import * as PublicBadge from "./PublicBadge.graphql";
import * as ValueCase from "./ValueCase.graphql";
import * as Organization from "./Organization.graphql";
import * as OpenBadge from "./OpenBadge.graphql";
import * as Scalars from "./Scalars.graphql";
import * as Issuer from "./Issuer.graphql";

const typeDefs = [
    Schema,
    Issuer,
    Scalars,
    Query,
    Language,
    Mutation,
    OpenBadge,
    PublicBadge,
    ValueCase,
    Organization,
];

export default typeDefs;
