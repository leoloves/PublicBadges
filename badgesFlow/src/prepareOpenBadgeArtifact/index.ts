import {
  PublicBadgesEventType as EV,
  BadgeIssuanceApprovedEvent,
  Errors,
  OpenBadgeArtifactCreated,
  PublicBadgesHandler,
} from "@public-badges/types";
import {
  registry,
  issuer as issuerStore,
  valueCase as valueCaseStore,
} from "@public-badges/stores";
import createArtifact from "./createArtifact";

export type InputEvent = BadgeIssuanceApprovedEvent;
export type OutputEvent = OpenBadgeArtifactCreated;

const prepareOpenBadgeArtifact: PublicBadgesHandler<
  InputEvent,
  OutputEvent
> = async ({detailType, detail}) => {
  switch (detailType) {
    case EV.BADGE_ISSUANCE_APPROVED: {
      const {recipientId, valueCaseId, ...rest} = detail;
      const organization = await registry.fetch({
        organizationId: recipientId,
      });
      if (!organization) {
        throw new Error(Errors.MISSING_ORGANIZATION);
      }
      const valueCase = await valueCaseStore.fetch({
        valueCaseId,
      });
      if (!valueCase) {
        throw new Error(Errors.MISSING_VALUE_CASE);
      }
      const issuer = await issuerStore.fetch({});
      if (!issuer) {
        throw new Error(Errors.MISSING_ISSUER);
      }
      const artifact = createArtifact({
        badgeInstance: detail,
        valueCase,
        organization,
        issuer,
      });
      return {
        detailType: EV.OPEN_BADGES_ARTIFACT_CREATED,
        detail: {...rest, recipientId, valueCaseId, artifact},
      };
    }
  }
};

export default prepareOpenBadgeArtifact;
