"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueCaseLocalization = exports.Localization = exports.Scenario = exports.ValueCase = void 0;
var Scenario = {
    description: function (_a) {
        var description = _a.description;
        return description;
    },
    narrative: function (_a) {
        var narrative = _a.narrative;
        return narrative;
    },
};
exports.Scenario = Scenario;
var ValueCaseLocalization = {
    name: function (_a) {
        var name = _a.name;
        return name;
    },
    tags: function (_a) {
        var tags = _a.tags;
        return tags;
    },
    description: function (_a) {
        var description = _a.description;
        return description;
    },
    narrative: function (_a) {
        var narrative = _a.narrative;
        return narrative;
    },
    scenarios: function (_a) {
        var scenarios = _a.scenarios;
        return scenarios;
    },
};
exports.ValueCaseLocalization = ValueCaseLocalization;
var Localization = {
    NL: function (_a) {
        var NL = _a.NL;
        return NL;
    },
    DE: function (_a) {
        var DE = _a.DE;
        return DE;
    },
};
exports.Localization = Localization;
var ValueCase = {
    valueCaseId: function (_a) {
        var valueCaseId = _a.valueCaseId;
        return valueCaseId;
    },
    name: function (_a) {
        var name = _a.name;
        return name;
    },
    proposedBy: function (_a, _args, _b) {
        var proposedBy = _a.proposedBy;
        var stores = _b.stores;
        return stores.registry.fetch({
            domainName: proposedBy,
        });
    },
    image: function (_a) {
        var image = _a.image;
        return image;
    },
    approvedBy: function (_a) {
        var approvedBy = _a.approvedBy;
        return approvedBy;
    },
    tags: function (_a) {
        var tags = _a.tags;
        return tags;
    },
    description: function (_a) {
        var description = _a.description;
        return description;
    },
    narrative: function (_a) {
        var narrative = _a.narrative;
        return narrative;
    },
    localization: function (_a) {
        var localization = _a.localization;
        return localization;
    },
    scenarios: function (_a) {
        var scenarios = _a.scenarios;
        return scenarios;
    },
};
exports.ValueCase = ValueCase;
//# sourceMappingURL=ValueCase.js.map