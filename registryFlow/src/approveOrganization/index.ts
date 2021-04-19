import {
  PublicBadgesEventType as EV,
  OrganizationApprovalAcceptedEvent,
  OrganizationApprovalRequestedEvent,
  OrganizationApprovalDelayedEvent,
  PublicBadgesHandler,
} from "@public-badges/types";

export type InputEvent = OrganizationApprovalRequestedEvent;
export type OutputEvent =
  | OrganizationApprovalAcceptedEvent
  | OrganizationApprovalDelayedEvent;

const approveOrganization: PublicBadgesHandler<
  InputEvent,
  OutputEvent
> = async ({detailType, detail}) => {
  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      const whitelist = [
        "offcourse",
        "vpro",
        "waag",
        "samenbeter",
        "eye filmmuseum",
      ];
      const name = detail.name.toLowerCase();
      console.log(name, whitelist.includes(name));
      if (whitelist.includes(name)) {
        return {
          detailType: EV.ORGANIZATION_APPROVAL_ACCEPTED,
          detail,
        };
      }
      return {
        detailType: EV.ORGANIZATION_APPROVAL_DELAYED,
        detail,
      };
    }
  }
};

export default approveOrganization;
