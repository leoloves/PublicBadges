import {
    Errors,
    MutationResolvers,
    OrganizationStatus,
    ApprovedOrganization,
    PendingOrganization,
    PublicBadgesEventType,
} from "@public-badges/types";

const { ORGANIZATION_APPROVAL_ACCEPTED } = PublicBadgesEventType;
const approveOrganization: MutationResolvers["approveOrganization"] = async (
    _root,
    { input },
    { stores, eventBus }
) => {
    const { organizationId, approvalToken: inputToken, approver } = input;
    const approversWhiteList = ["leonieke@publicspaces.net"];

    const rawOrganization = (await stores.registry.fetch({
        organizationId,
    })) as PendingOrganization | ApprovedOrganization;

    if (!rawOrganization) {
        throw new Error(Errors.UNKNOWN_ORGANIZATION);
    }

    if (rawOrganization.status === OrganizationStatus.Approved) {
        throw new Error(Errors.DUPLICATE_ORGANIZATION_APPROVAL);
    }

    if (!approversWhiteList.includes(approver)) {
        throw new Error(Errors.INVALID_APPROVER);
    }

    const { approvalToken: storedToken, ...organization } = rawOrganization;

    if (inputToken !== storedToken) {
        throw new Error(Errors.INVALID_APPROVAL_TOKEN);
    }

    return eventBus.put({
        detailType: ORGANIZATION_APPROVAL_ACCEPTED,
        detail: {
            ...organization,
            status: OrganizationStatus.Approved,
            approvedBy: "leonieke@publicspaces.net",
            approvedOn: `${Date.now()}`,
        },
    }) as Promise<ApprovedOrganization>;
};

export default approveOrganization;
