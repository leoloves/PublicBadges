"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Query_1 = require("./Query");
var Mutation_1 = require("./Mutation");
var OpenBadge = require("./OpenBadge");
var PublicBadge = require("./PublicBadge");
var Proof = require("./Proof");
var Issuer = require("./Issuer");
var ValueCase = require("./ValueCase");
var Organization = require("./Organization");
var Scalars = require("./Scalars");
var resolvers = __assign(__assign(__assign(__assign(__assign(__assign(__assign({ Query: Query_1.default,
    Mutation: Mutation_1.default }, Issuer), Proof), PublicBadge), OpenBadge), Organization), ValueCase), Scalars);
exports.default = resolvers;
//# sourceMappingURL=index.js.map