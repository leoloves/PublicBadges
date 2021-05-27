import { capitalize } from "voca";
import {
  PublicBadgesEventType as EV,
  OrganizationApprovalRequestedEvent,
  OrganizationRegistrationRequestedEvent,
  OrganizationApprovedEvent,
  PendingOrganization,
  PublicBadgesHandler,
} from "@public-badges/types";
import { email } from "@public-badges/adapters";

export type InputEvent =
  | OrganizationRegistrationRequestedEvent
  | OrganizationApprovalRequestedEvent
  | OrganizationApprovedEvent;
export type OutputEvent = null;

const sendNotifications: PublicBadgesHandler<InputEvent, OutputEvent> = async ({
  detailType,
  detail,
}) => {
  const approverEmail = process.env.APPROVER_EMAIL;
  const sender = approverEmail;
  const organizationName = capitalize(detail.name);

  const {
    APPROVAL_REQUESTED_TEMPLATE,
    PENDING_REGISTRATION_TEMPLATE,
    APPROVED_REGISTRATION_TEMPLATE,
  } = process.env;

  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      const { organizationId, approvalToken } = detail as PendingOrganization;
      const params = JSON.stringify(
        { input: { organizationId, approvalToken, approver: approverEmail } },
        null,
        2
      );
      await email.sendTemplate({
        recipients: [approverEmail],
        sender,
        templateName: APPROVAL_REQUESTED_TEMPLATE,
        templateData: {
          displayName: organizationName,
          domainName: detail.domainName,
          contactName: detail.contact.name,
          contactEmail: detail.contact.email,
          adminName: detail.admin.name,
          adminEmail: detail.admin.email,
          params,
        },
      });
      await email.sendTemplate({
        recipients: [detail.contact.email, detail.admin.email],
        sender,
        templateName: PENDING_REGISTRATION_TEMPLATE,
        templateData: {
          displayName: organizationName,
        },
      });
      return null;
    }
    case EV.ORGANIZATION_APPROVED: {
      await email.sendTemplate({
        recipients: [detail.contact.email, detail.admin.email, approverEmail],
        sender,
        templateName: APPROVED_REGISTRATION_TEMPLATE,
        templateData: {
          displayName: organizationName,
        },
      });
      return null;
    }
  }
};

export default sendNotifications;
