"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var allStores = require("@public-badges/stores");
var eventBus = allStores.eventBus, stores = __rest(allStores, ["eventBus"]);
var context = function (_a) {
    var event = _a.event, context = _a.context;
    return {
        rawEvent: event,
        functionContext: context,
        stores: stores,
        eventBus: eventBus,
    };
};
exports.default = context;
//# sourceMappingURL=context.js.map