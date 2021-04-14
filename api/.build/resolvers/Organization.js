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
exports.PendingOrganization = exports.ApprovedOrganization = exports.Organization = exports.Contact = void 0;
var types_1 = require("@public-badges/types");
var Contact = {
    name: function (_a) {
        var name = _a.name;
        return name;
    },
    email: function (_a) {
        var email = _a.email;
        return email;
    },
};
exports.Contact = Contact;
var Organization = {
    __resolveType: function (_a) {
        var status = _a.status;
        switch (status) {
            case types_1.OrganizationStatus.Pending: {
                return "PendingOrganization";
            }
            case types_1.OrganizationStatus.Approved: {
                return "ApprovedOrganization";
            }
        }
    },
    organizationId: function (_a) {
        var organizationId = _a.organizationId;
        return organizationId;
    },
    status: function (_a) {
        var status = _a.status;
        return status;
    },
    name: function (_a) {
        var name = _a.name;
        return name;
    },
    contact: function (_a) {
        var contact = _a.contact;
        return contact;
    },
    admin: function (_a) {
        var admin = _a.admin;
        return admin;
    },
    urls: function (_a) {
        var urls = _a.urls;
        return urls;
    },
    domainName: function (_a) {
        var domainName = _a.domainName;
        return domainName;
    },
};
exports.Organization = Organization;
var PendingOrganization = __assign({}, Organization);
exports.PendingOrganization = PendingOrganization;
var ApprovedOrganization = __assign(__assign({}, PendingOrganization), { approvedBy: function (_a) {
        var approvedBy = _a.approvedBy;
        return approvedBy;
    },
    approvedOn: function (_a) {
        var approvedOn = _a.approvedOn;
        return approvedOn;
    } });
exports.ApprovedOrganization = ApprovedOrganization;
//# sourceMappingURL=Organization.js.map