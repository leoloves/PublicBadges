import AWS from "aws-sdk";
import { capitalize } from "voca";
import {
    PublicBadgesEventType as EV,
    OrganizationApprovalRequestedEvent,
    PublicBadgesHandler,
} from "@public-badges/types";
import arTemplate from "./approvalRequestedTemplate";
import createMail from "./mailTemplate";

const ses = new AWS.SES();

export type InputEvent = OrganizationApprovalRequestedEvent;
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
            const body = arTemplate({ organization: detail, approverEmail });
            const organizationName = capitalize(detail.name);
            const subject = `${organizationName} applied for the PublicSpaces Registry`;
            const email = createMail({ recipients, sender, body, subject });
            const response = await ses.sendEmail(email).promise();
            console.log(response);
            return null;
        }
    }
};

export default sendNotifications;
