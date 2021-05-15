import {
  PublicBadgesEventType as EV,
  OrganizationApprovalRequestedEvent,
  PublicBadgesHandler,
} from "@public-badges/types";

export type InputEvent = OrganizationApprovalRequestedEvent;
export type OutputEvent = null;

const approveOrganization: PublicBadgesHandler<
  InputEvent,
  OutputEvent
> = async ({detailType, detail}) => {
  switch (detailType) {
    case EV.ORGANIZATION_APPROVAL_REQUESTED: {
      console.log(detail);
      return null;
    }
  }
};

export default approveOrganization;
