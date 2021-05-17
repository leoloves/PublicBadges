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
  switch (detailType) {
    case EV.BADGE_INSTANCE_UPDATED: {
      const {name, status} = detail;
      await email.send({
        recipients: [approverEmail],
        sender,
        subject: `Your ${capitalize(
          name
        )} Badge Application was updated to ${status}`,
        body: JSON.stringify(detail, null, 2),
      });
      return null;
    }
  }
};

export default sendNotifications;
