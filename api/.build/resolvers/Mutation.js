"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@public-badges/types");
var uuid_1 = require("uuid");
var timeout = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var ORGANIZATION_REGISTRATION_REQUESTED = types_1.PublicBadgesEventType.ORGANIZATION_REGISTRATION_REQUESTED, BADGE_ISSUANCE_REQUESTED = types_1.PublicBadgesEventType.BADGE_ISSUANCE_REQUESTED;
var Mutation = {
    applyForBadge: function (_root, _a, _b) {
        var input = _a.input;
        var stores = _b.stores, eventBus = _b.eventBus;
        return __awaiter(this, void 0, void 0, function () {
            var valueCaseId, domainName, organization, valueCase, organizationId, badge, badgeId, status, name, tags, description, narrative;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        valueCaseId = input.valueCaseId, domainName = input.domainName;
                        /**
                               short timeout just to make sure, the registry is updated to avoid duplicates.
                               It's highly unlikely (and relatively innocent) but still...
                               The unavoidable perils of async ;-)
                            **/
                        return [4 /*yield*/, timeout(500)];
                    case 1:
                        /**
                               short timeout just to make sure, the registry is updated to avoid duplicates.
                               It's highly unlikely (and relatively innocent) but still...
                               The unavoidable perils of async ;-)
                            **/
                        _c.sent();
                        return [4 /*yield*/, stores.registry.fetch({ domainName: domainName })];
                    case 2:
                        organization = _c.sent();
                        if (!organization) {
                            throw "ORG DOES NOT EXISTS";
                        }
                        return [4 /*yield*/, stores.valueCase.fetch({ valueCaseId: valueCaseId })];
                    case 3:
                        valueCase = _c.sent();
                        if (!valueCase) {
                            throw "ValueCase does not exist";
                        }
                        organizationId = organization.organizationId;
                        return [4 /*yield*/, stores.badgeInstance.fetch({
                                organizationId: organizationId,
                                valueCaseId: valueCaseId,
                            })];
                    case 4:
                        badge = _c.sent();
                        if (badge) {
                            throw "your organization already applied for this badge";
                        }
                        badgeId = uuid_1.v1();
                        status = types_1.PublicBadgeStatus.Pending;
                        name = valueCase.name, tags = valueCase.tags, description = valueCase.description, narrative = valueCase.narrative;
                        return [2 /*return*/, eventBus.put({
                                detailType: BADGE_ISSUANCE_REQUESTED,
                                detail: {
                                    badgeId: badgeId,
                                    status: status,
                                    valueCaseId: valueCaseId,
                                    name: name,
                                    tags: tags,
                                    description: description,
                                    narrative: narrative,
                                    recipientId: organizationId,
                                },
                            })];
                }
            });
        });
    },
    registerOrganization: function (_root, _a, _b) {
        var input = _a.input;
        var eventBus = _b.eventBus, stores = _b.stores;
        return __awaiter(this, void 0, void 0, function () {
            var name, contact, admin, domainName, organization, organizationId, status;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = input.name, contact = input.contact, admin = input.admin, domainName = input.domainName;
                        /**
                               short timeout just to make sure, the registry is updated to avoid duplicates.
                               It's highly unlikely (and relatively innocent) but still...
                               The unavoidable perils of async ;-)
                            **/
                        return [4 /*yield*/, timeout(500)];
                    case 1:
                        /**
                               short timeout just to make sure, the registry is updated to avoid duplicates.
                               It's highly unlikely (and relatively innocent) but still...
                               The unavoidable perils of async ;-)
                            **/
                        _c.sent();
                        return [4 /*yield*/, stores.registry.fetch({ domainName: domainName })];
                    case 2:
                        organization = _c.sent();
                        console.log(organization);
                        console.log(process.env.REGISTRY_BUCKET, process.env.REGISTRY_BUCKET);
                        if (organization) {
                            throw "ORG ALREADY EXISTS";
                        }
                        organizationId = uuid_1.v1();
                        status = types_1.OrganizationStatus.Pending;
                        return [2 /*return*/, eventBus.put({
                                detailType: ORGANIZATION_REGISTRATION_REQUESTED,
                                detail: {
                                    organizationId: organizationId,
                                    status: status,
                                    name: name,
                                    contact: contact,
                                    admin: admin,
                                    domainName: domainName,
                                    urls: [domainName],
                                },
                            })];
                }
            });
        });
    },
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map