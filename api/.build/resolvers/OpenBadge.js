"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenBadgeArtifact = exports.OpenBadgeProof = exports.OpenBadgeRecipient = exports.OpenBadgeCriteria = exports.OpenBadgeClass = exports.OpenBadge = void 0;
var jws_1 = require("jws");
var OpenBadgeCriteria = {
    narrative: function (_a) {
        var narrative = _a.narrative;
        return narrative;
    },
};
exports.OpenBadgeCriteria = OpenBadgeCriteria;
var OpenBadgeClass = {
    id: function (_a) {
        var id = _a.id;
        return id;
    },
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
    criteria: function (_a) {
        var criteria = _a.criteria;
        return criteria;
    },
};
exports.OpenBadgeClass = OpenBadgeClass;
var OpenBadgeRecipient = {
    identity: function (_a) {
        var identity = _a.identity;
        return identity;
    },
    type: function (_a) {
        var type = _a.type;
        return type;
    },
};
exports.OpenBadgeRecipient = OpenBadgeRecipient;
var OpenBadgeProof = {
    id: function (_a) {
        var id = _a.id;
        return id;
    },
    name: function (_a) {
        var name = _a.name;
        return name;
    },
    genre: function (_a) {
        var genre = _a.genre;
        return genre;
    },
    description: function (_a) {
        var description = _a.description;
        return description;
    },
    narrative: function (_a) {
        var narrative = _a.narrative;
        return narrative;
    },
};
exports.OpenBadgeProof = OpenBadgeProof;
var OpenBadge = {
    id: function (_a) {
        var id = _a.id;
        return id;
    },
    badge: function (_a) {
        var badge = _a.badge;
        return badge;
    },
    recipient: function (_a) {
        var recipient = _a.recipient;
        return recipient;
    },
    issuedOn: function (_a) {
        var issuedOn = _a.issuedOn;
        return issuedOn;
    },
    expires: function (_a) {
        var expires = _a.expires;
        return expires;
    },
    evidence: function (_a) {
        var evidence = _a.evidence;
        return evidence;
    },
};
exports.OpenBadge = OpenBadge;
var OpenBadgeArtifact = {
    signature: function (_a) {
        var signature = _a.signature;
        return signature;
    },
    json: function (_a) {
        var signature = _a.signature;
        var payload = jws_1.default.decode(signature).payload;
        return payload;
    },
};
exports.OpenBadgeArtifact = OpenBadgeArtifact;
//# sourceMappingURL=OpenBadge.js.map