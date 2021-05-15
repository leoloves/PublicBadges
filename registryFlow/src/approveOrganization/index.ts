import {
    PublicBadgesEventType as EV,
    OrganizationApprovalRequestedEvent,
    PublicBadgesHandler,
} from "@public-badges/types";

import AWS from "aws-sdk";
const ses = new AWS.SES();

export type InputEvent = OrganizationApprovalRequestedEvent;
export type OutputEvent = null;

const approveOrganization: PublicBadgesHandler<
    InputEvent,
    OutputEvent
> = async ({ detailType, detail }) => {
    switch (detailType) {
        case EV.ORGANIZATION_APPROVAL_REQUESTED: {
            const approverEmail = process.env.APPROVER_EMAIL;
            const recipientEmail = detail.contact.email;
            const params = {
                Destination: {
                    ToAddresses: [recipientEmail],
                },
                Message: {
                    Body: {
                        Text: { Data: JSON.stringify(detail, null, 2) },
                    },

                    Subject: { Data: "Test Email" },
                },
                Source: approverEmail,
            };

            const response = await ses.sendEmail(params).promise();
            console.log(response);
            return null;
        }
    }
};

export default approveOrganization;
