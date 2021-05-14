import {
  MutationResolvers,
  OrganizationStatus,
  PublicBadgesEventType,
  PendingOrganization,
} from "@public-badges/types";
import {v1 as uuid} from "uuid";
import {timeout} from "../helpers";

const {ORGANIZATION_REGISTRATION_REQUESTED} = PublicBadgesEventType;

const registerOrganization: MutationResolvers["registerOrganization"] = async (
  _root,
  {input},
  {eventBus, stores}
) => {
  const {name, contact, admin, domainName} = input;

  // don't remove the timeout
  await timeout(500);
  const organization = await stores.registry.fetch({domainName});

  if (organization) {
    throw new Error("ORG ALREADY EXISTS");
  }
  const organizationId = uuid();
  const status = OrganizationStatus.Pending;
  const approvalToken = "913b73d2-0470-4cd9-9b52-7cc39e7b80b9";

  return eventBus.put({
    detailType: ORGANIZATION_REGISTRATION_REQUESTED,
    detail: {
      approvalToken,
      organizationId,
      status,
      name,
      contact,
      admin,
      domainName,
      urls: [domainName],
    },
  }) as Promise<PendingOrganization>;
};

export default registerOrganization;
