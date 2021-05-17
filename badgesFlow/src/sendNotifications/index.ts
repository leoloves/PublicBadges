import {
  PublicBadgesEventType as EV,
  PublicBadgesHandler,
  BadgeInstanceUpdated,
} from "@public-badges/types";
import {capitalize} from "voca";
import {email} from "@public-badges/adapters";

export type InputEvent = BadgeInstanceUpdated;
export type OutputEvent = null;

const sendNotifications: PublicBadgesHandler<InputEvent, OutputEvent> = async ({
  detailType,
  detail,
}) => {
  const approverEmail = process.env.APPROVER_EMAIL;
  const sender = approverEmail;
  const {name, status} = detail;
  const badgeName = capitalize(name);
  switch (detailType) {
    case EV.BADGE_INSTANCE_UPDATED: {
      await email.send({
        recipients: [approverEmail],
        sender,
        subject: `Your ${badgeName} Application was updated to ${status}`,
        body: "PLACEHOLDER",
      });
      return null;
    }
  }
};

export default sendNotifications;
