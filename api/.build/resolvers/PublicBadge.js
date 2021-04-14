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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedPublicBadge = exports.RejectedPublicBadge = exports.ApprovedPublicBadge = exports.PendingPublicBadge = exports.PublicBadge = void 0;
var voca_1 = require("voca");
var types_1 = require("@public-badges/types");
var PublicBadge = {
    __resolveType: function (_a) {
        var status = _a.status;
        switch (status) {
            case types_1.PublicBadgeStatus.Signed: {
                return "SignedPublicBadge";
            }
            case types_1.PublicBadgeStatus.Approved: {
                return "ApprovedPublicBadge";
            }
            case types_1.PublicBadgeStatus.Rejected: {
                return "RejectedPublicBadge";
            }
            case types_1.PublicBadgeStatus.Pending: {
                return "PendingPublicBadge";
            }
        }
    },
    badgeId: function (_a) {
        var badgeId = _a.badgeId;
        return badgeId;
    },
    valueCaseId: function (_a) {
        var valueCaseId = _a.valueCaseId;
        return valueCaseId;
    },
    status: function (_a) {
        var status = _a.status;
        return status;
    },
    valueCase: function (_a, _args, _b) {
        var valueCaseId = _a.valueCaseId;
        var language = _b.language, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var valueCase;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, stores.valueCase.fetch({
                            language: language,
                            valueCaseId: valueCaseId,
                        })];
                    case 1:
                        valueCase = _c.sent();
                        return [2 /*return*/, valueCase];
                }
            });
        });
    },
    name: function (_a, _args, _b) {
        var valueCaseId = _a.valueCaseId;
        var language = _b.language, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, stores.valueCase.fetch({
                            language: language,
                            valueCaseId: valueCaseId,
                        })];
                    case 1:
                        name = (_c.sent()).name;
                        return [2 /*return*/, name];
                }
            });
        });
    },
    tags: function (_a, _args, _b) {
        var valueCaseId = _a.valueCaseId;
        var language = _b.language, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var tags;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, stores.valueCase.fetch({
                            language: language,
                            valueCaseId: valueCaseId,
                        })];
                    case 1:
                        tags = (_c.sent()).tags;
                        return [2 /*return*/, tags];
                }
            });
        });
    },
    description: function (_a, _args, _b) {
        var valueCaseId = _a.valueCaseId;
        var language = _b.language, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var description;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, stores.valueCase.fetch({
                            language: language,
                            valueCaseId: valueCaseId,
                        })];
                    case 1:
                        description = (_c.sent()).description;
                        return [2 /*return*/, description];
                }
            });
        });
    },
    narrative: function (_a, _args, _b) {
        var valueCaseId = _a.valueCaseId;
        var language = _b.language, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var narrative;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, stores.valueCase.fetch({
                            language: language,
                            valueCaseId: valueCaseId,
                        })];
                    case 1:
                        narrative = (_c.sent()).narrative;
                        return [2 /*return*/, narrative];
                }
            });
        });
    },
    recipientId: function (_a) {
        var recipientId = _a.recipientId;
        return recipientId;
    },
    recipient: function (_a, _args, _b) {
        var recipientId = _a.recipientId;
        var stores = _b.stores;
        return stores.registry.fetch({ organizationId: recipientId });
    },
};
exports.PublicBadge = PublicBadge;
var PendingPublicBadge = __assign({}, PublicBadge);
exports.PendingPublicBadge = PendingPublicBadge;
var ApprovedPublicBadge = __assign(__assign({}, PendingPublicBadge), { evidence: function (_a, _args, _b) {
        var valueCaseId = _a.valueCaseId, evidence = _a.evidence;
        var language = _b.language, organizationName = _b.organizationName, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var scenarios;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!language || language === types_1.Language.En) {
                            return [2 /*return*/, evidence];
                        }
                        return [4 /*yield*/, stores.valueCase.fetch({
                                language: language,
                                valueCaseId: valueCaseId,
                            })];
                    case 1:
                        scenarios = (_c.sent()).scenarios;
                        return [2 /*return*/, scenarios.map(function (_a, index) {
                                var rawDescription = _a.description, rawNarrative = _a.narrative;
                                var _b = __spreadArray([
                                    rawDescription
                                ], rawNarrative).map(function (s) {
                                    return s.replace(/(the.)?organization/i, voca_1.titleCase(organizationName));
                                }), description = _b[0], narrative = _b.slice(1);
                                return __assign(__assign({}, evidence[index]), { description: description,
                                    narrative: narrative });
                            })];
                }
            });
        });
    } });
exports.ApprovedPublicBadge = ApprovedPublicBadge;
var RejectedPublicBadge = __assign({}, ApprovedPublicBadge);
exports.RejectedPublicBadge = RejectedPublicBadge;
var SignedPublicBadge = __assign(__assign({}, ApprovedPublicBadge), { issuedOn: function (_a) {
        var issuedOn = _a.issuedOn;
        return issuedOn;
    },
    expires: function (_a) {
        var expires = _a.expires;
        return expires;
    },
    artifact: function (_a) {
        var artifact = _a.artifact;
        return artifact;
    } });
exports.SignedPublicBadge = SignedPublicBadge;
//# sourceMappingURL=PublicBadge.js.map