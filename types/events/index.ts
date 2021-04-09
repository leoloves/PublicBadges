import {
  OrganizationRegistrationRequestedEvent,
  OrganizationApprovalRequestedEvent,
  OrganizationApprovalAcceptedEvent,
  OrganizationApprovalDelayedEvent,
  OrganizationApprovedEvent,
  BadgeIssuanceRequestedEvent,
  BadgeIssuanceApprovedEvent,
  BadgeInstanceUpdated,
  BadgeIssuanceRejectedEvent,
  BadgeIssuanceDelayedEvent,
  BadgeInstanceSigned,
  OpenBadgeArtifactCreated,
  OpenBadgeArtifactSigned
} from "./events";

export * from "./events";
export * from "./eventTypes";
export * from "./payload";

export type PublicBadgesEvent =
  | OrganizationRegistrationRequestedEvent
  | OrganizationApprovalRequestedEvent
  | OrganizationApprovalAcceptedEvent
  | OrganizationApprovalDelayedEvent
  | OrganizationApprovedEvent
  | BadgeIssuanceRequestedEvent
  | BadgeIssuanceApprovedEvent
  | BadgeIssuanceRejectedEvent
  | BadgeIssuanceDelayedEvent
  | BadgeInstanceUpdated
  | BadgeInstanceSigned
  | OpenBadgeArtifactCreated
  | OpenBadgeArtifactSigned;
