import AWS from "aws-sdk";
import { capitalize } from "voca";
import {
    PublicBadgesEventType as EV,
    OrganizationApprovalRequestedEvent,
    OrganizationRegistrationRequestedEvent,
    OrganizationApprovedEvent,
    PendingOrganization,
    PublicBadgesHandler,
} from "@public-badges/types";
import arTemplate from "./approvalRequestedTemplate";
import createMail from "./mailTemplate";

const ses = new AWS.SES();

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
    switch (detailType) {
        case EV.ORGANIZATION_REGISTRATION_REQUESTED: {
            const recipients = [detail.contact.email];
            const body = "Test";
            const subject = `Your Application for the PublicSpaces Registry is Under Consideration`;
            const email = createMail({ recipients, sender, body, subject });
            await ses.sendEmail(email).promise();
        }
        case EV.ORGANIZATION_APPROVAL_REQUESTED: {
            const organization = detail as PendingOrganization;
            const organizationName = capitalize(detail.name);
            const approveEmail = createMail({
                recipients: [approverEmail],
                sender,
                body: arTemplate({ organization, approverEmail }),
                subject: `${organizationName} applied for the PublicSpaces Registry`,
            });
            const sendEmail = createMail({
                recipients: [detail.contact.email],
                sender,
                body: "Test",
                subject: `Your Application for the PublicSpaces Registry is Under Consideration`,
            });
            await ses.sendEmail(approveEmail).promise();
            await ses.sendEmail(sendEmail).promise();
        }
        case EV.ORGANIZATION_APPROVED: {
            const recipients = [detail.contact.email];
            const body = "Test";
            const subject = `You were accepted to the PublicSpaces Registry`;
            const email = createMail({ recipients, sender, body, subject });
            await ses.sendEmail(email).promise();
        }
    }
    return null;
};

export default sendNotifications;
