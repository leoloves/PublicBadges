import {
  PublicBadgesEventType as EV,
  PublicBadgesHandler,
  BadgeInstanceUpdated,
} from "@public-badges/types";
import { capitalize } from "voca";
import { email } from "@public-badges/adapters";

export type InputEvent = BadgeInstanceUpdated;
export type OutputEvent = null;

const sendNotifications: PublicBadgesHandler<InputEvent, OutputEvent> = async ({
  detailType,
  detail,
}) => {
  const approverEmail = process.env.APPROVER_EMAIL;
  const sender = approverEmail;
  const { name, status } = detail;
  switch (detailType) {
    case EV.BADGE_INSTANCE_UPDATED: {
      await email.sendTemplate({
        recipients: [approverEmail],
        sender,
        templateName: process.env.STATUS_CHANGED_TEMPLATE,
        templateData: {
          badgeName,
          status,
        },
      });
      return null;
    }
  }
};

export default sendNotifications;
