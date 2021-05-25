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
  const templateName = process.env.APPROVAL_REQUESTED_TEMPLATE;
  const sender = approverEmail;
  const organizationName = capitalize(detail.name);
  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      const { organizationId, approvalToken } = detail as PendingOrganization;
      const params = { organizationId, approvalToken, approver: approverEmail };
      const templateData = {
        displayName: organizationName,
        contactName: detail.contact.name,
        contactEmail: detail.contact.email,
        adminName: detail.admin.name,
        adminEmail: detail.admin.email,
        params
      };
      await email.sendTemplate({
        recipients: [approverEmail],
        sender,
        templateName,
        templateData
      });
      await email.send({
        recipients: [detail.contact.email, detail.admin.email],
        sender,
        subject: `Your Application for ${organizationName} for the PublicSpaces Registry is Under Consideration`,
        body: "Test",
      });
      return null;
    }
    case EV.ORGANIZATION_APPROVED: {
      await email.send({
        recipients: [detail.contact.email, detail.admin.email, approverEmail],
        sender,
        subject: `${organizationName} was accepted to the PublicSpaces Registry`,
        body: "Test",
      });
      return null;
    }
  }
};

export default sendNotifications;
