import {capitalize} from "voca";
import {
  PublicBadgesEventType as EV,
  OrganizationApprovalRequestedEvent,
  OrganizationRegistrationRequestedEvent,
  OrganizationApprovedEvent,
  PendingOrganization,
  PublicBadgesHandler,
} from "@public-badges/types";
import arTemplate from "./approvalRequestedTemplate";
import {email} from "@public-badges/adapters";

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
  const organization = detail as PendingOrganization;
  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      await email.send({
        recipients: [approverEmail],
        sender,
        subject: `${organizationName} applied for the PublicSpaces Registry`,
        body: arTemplate({
          organization,
          approverEmail,
        }),
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
