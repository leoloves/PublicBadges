"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_lambda_1 = require("apollo-server-lambda");
var resolvers_1 = require("./resolvers");
var graphql_schema_1 = require("@public-badges/graphql-schema");
var context_1 = require("./context");
var server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: graphql_schema_1.default,
    resolvers: resolvers_1.default,
    context: context_1.default,
    introspection: true,
    playground: {
        endpoint: "/pilot/graphql",
    },
});
var graphql = server.createHandler({
    cors: {
        origin: "*",
        credentials: true,
    },
});
exports.default = graphql;
//# sourceMappingURL=handler.js.map