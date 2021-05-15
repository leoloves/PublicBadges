import {
  PublicBadgesEventType as EV,
  OrganizationApprovalRequestedEvent,
  OrganizationApprovalDelayedEvent,
  PublicBadgesHandler,
} from "@public-badges/types";

export type InputEvent = OrganizationApprovalRequestedEvent;
export type OutputEvent = OrganizationApprovalDelayedEvent;

const approveOrganization: PublicBadgesHandler<
  InputEvent,
  OutputEvent
> = async ({detailType, detail}) => {
  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      return {
        detailType: EV.ORGANIZATION_APPROVAL_DELAYED,
        detail,
      };
    }
  }
};

export default approveOrganization;
