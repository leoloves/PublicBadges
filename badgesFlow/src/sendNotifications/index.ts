import {
  PublicBadgesEventType as EV,
  PublicBadgesHandler,
  BadgeInstanceUpdated,
} from "@public-badges/types";
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
      await email.send({
        recipients: [approverEmail],
        sender,
        subject: `TEST`,
        body: JSON.stringify(detail, null, 2),
      });
      return null;
    }
  }
};

export default sendNotifications;
