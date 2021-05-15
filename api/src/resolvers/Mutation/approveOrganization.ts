import {
  Errors,
  MutationResolvers,
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

  const organization = (await stores.registry.fetch({
    organizationId,
  })) as PendingOrganization;

  if (input.approvalToken !== organization.approvalToken) {
    throw new Error(Errors.INVALID_APPROVAL_TOKEN);
  }

  return eventBus.put({
    detailType: ORGANIZATION_APPROVAL_ACCEPTED,
    detail: organization,
  }) as Promise<PendingOrganization>;
};

export default approveOrganization;
