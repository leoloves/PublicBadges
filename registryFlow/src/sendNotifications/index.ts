import {
  PublicBadgesEventType as EV,
  OrganizationApprovalRequestedEvent,
  PendingOrganization,
  PublicBadgesHandler,
} from "@public-badges/types";

import AWS from "aws-sdk";
import {capitalize} from "voca";
const ses = new AWS.SES();

export type InputEvent = OrganizationApprovalRequestedEvent;
export type OutputEvent = null;

const template: (args: {
  organization: PendingOrganization;
  approverEmail: string;
}) => string = ({organization, approverEmail}) => {
  const {
    name,
    domainName,
    contact,
    admin,
    organizationId,
    approvalToken,
  } = organization;
  const input = {organizationId, approvalToken, approver: approverEmail};
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

  ${JSON.stringify({input}, null, 2)}
  `;
};

const sendNotifications: PublicBadgesHandler<InputEvent, OutputEvent> = async ({
  detailType,
  detail,
}) => {
  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      const approverEmail = process.env.APPROVER_EMAIL;
      const params = {
        Destination: {
          ToAddresses: [approverEmail],
        },
        Message: {
          Body: {
            Text: {Data: template({organization: detail, approverEmail})},
          },

          Subject: {
            Data: `${capitalize(
              detail.name
            )} applied for the PublicSpaces registry`,
          },
        },
        Source: approverEmail,
      };

      const response = await ses.sendEmail(params).promise();
      console.log(response);
      return null;
    }
  }
};

export default sendNotifications;
