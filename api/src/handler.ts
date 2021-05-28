import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "@public-badges/graphql-schema";
import context from "./context";

const environment = process.env.SLS_ENVIRONMENT;
const approveOrganization = `mutation ApproveOrganization($input: OrganizationValidation!) {
  approveOrganization(input: $input) {
    domainName
    organizationId
  }
}`;

const applyForBadge = `mutation ApplyForBadge($input:PublicBadgeInput!){
  applyForBadge(input: $input){
    badgeId
    status
  }
}`;

const registerOrganization = `mutation registerOrganization($input:OrganizationInput!) {
  registerOrganization(input: $input){
    organizationId
  }
}`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    endpoint: `/${environment}/graphql`,
    tabs: [
      {
        endpoint: `/${environment}/graphql`,
        name: "Approve Organization",
        query: approveOrganization,
      },
      {
        endpoint: `/${environment}/graphql`,
        name: "Apply for Badge",
        query: applyForBadge,
      },
      {
        endpoint: `/${environment}/graphql`,
        name: "Register Organization",
        query: registerOrganization,
      },
    ],
  },
});

export const graphql = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

export default graphql;
