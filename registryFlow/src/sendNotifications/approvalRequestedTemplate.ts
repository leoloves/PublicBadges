import { PendingOrganization } from "@public-badges/types";
import { capitalize } from "voca";

const template: (args: {
  organization: PendingOrganization;
  approverEmail: string;
}) => string = ({ organization, approverEmail }) => {
  const {
    name,
    domainName,
    contact,
    admin,
    organizationId,
    approvalToken,
  } = organization;
  const input = { organizationId, approvalToken, approver: approverEmail };
  return `
  ${capitalize(name)} want to join the PublicSpaces registry.

  They applied with the following information:

  DomainName:
  ${domainName}

  Contact:
  ${contact.name}
  ${contact.email}

  Admin:
  ${admin.name}
  ${admin.email}

  If you want to add them to the registry, please confirm using the 'approveOrganization' handler
  in the graphql playground, using the following input params.

  ${JSON.stringify({ input }, null, 2)}
  `;
};

export default template;
