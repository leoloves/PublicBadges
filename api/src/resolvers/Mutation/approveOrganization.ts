import {
  Errors,
  MutationResolvers,
  OrganizationStatus,
  ApprovedOrganization,
  PendingOrganization,
  PublicBadgesEventType,
} from "@public-badges/types";

const {ORGANIZATION_APPROVAL_ACCEPTED} = PublicBadgesEventType;
const approveOrganization: MutationResolvers["approveOrganization"] = async (
  _root,
  {input},
  {stores, eventBus}
) => {
  const {organizationId} = input;

  const {
    approvalToken: storedToken,
    ...organization
  } = (await stores.registry.fetch({
    organizationId,
  })) as PendingOrganization;

  if (input.approvalToken !== storedToken) {
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
