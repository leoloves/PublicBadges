import {
    PublicBadgesEventType as EV,
    OrganizationRegistrationRequestedEvent,
    OrganizationApprovalAcceptedEvent,
    OrganizationApprovalRequestedEvent,
    PendingOrganization,
    ApprovedOrganization,
    OrganizationApprovedEvent,
    PublicBadgesHandler,
} from "@public-badges/types";
import putOrganization from "./putOrganization";

export type InputEvent =
    | OrganizationRegistrationRequestedEvent
    | OrganizationApprovalAcceptedEvent;

export type OutputEvent =
    | OrganizationApprovalRequestedEvent
    | OrganizationApprovedEvent;

const saveOrganization: PublicBadgesHandler<InputEvent, OutputEvent> = async ({
    detailType,
    detail,
}) => {
    const { organizationId: id } = detail;
    switch (detailType) {
        case EV.ORGANIZATION_REGISTRATION_REQUESTED: {
            const organization = detail as PendingOrganization;
            await putOrganization(id, detail);
            return {
                detailType: EV.ORGANIZATION_APPROVAL_REQUESTED,
                detail: organization,
            };
        }
        case EV.ORGANIZATION_APPROVAL_ACCEPTED: {
            const organization = detail as ApprovedOrganization;
            await putOrganization(id, detail);
            return {
                detailType: EV.ORGANIZATION_APPROVED,
                detail: organization,
            };
        }
    }
};

export default saveOrganization;
