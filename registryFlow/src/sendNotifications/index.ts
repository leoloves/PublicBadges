import AWS from "aws-sdk";
import { capitalize } from "voca";
import {
    PublicBadgesEventType as EV,
    OrganizationApprovalRequestedEvent,
    OrganizationApprovedEvent,
    PendingOrganization,
    PublicBadgesHandler,
} from "@public-badges/types";
import arTemplate from "./approvalRequestedTemplate";
import createMail from "./mailTemplate";

const ses = new AWS.SES();

export type InputEvent =
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
        case EV.ORGANIZATION_APPROVAL_REQUESTED: {
            const recipients = [approverEmail];
            const organization = detail as PendingOrganization;
            const body = arTemplate({ organization, approverEmail });
            const organizationName = capitalize(detail.name);
            const subject = `${organizationName} applied for the PublicSpaces Registry`;
            const email = createMail({ recipients, sender, body, subject });
            await ses.sendEmail(email).promise();
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
