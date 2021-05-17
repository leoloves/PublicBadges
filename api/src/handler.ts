import {ApolloServer} from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "@public-badges/graphql-schema";
import context from "./context";

const environment = process.env.SLS_ENVIRONMENT;
const query = `mutation ApproveOrganization($input: OrganizationValidation!) {
  approveOrganization(input: $input) {
    domainName
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
        endpoint: `/${environment}/approve-organization`,
        query,
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
