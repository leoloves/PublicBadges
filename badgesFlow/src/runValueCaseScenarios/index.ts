import {
  PublicBadgesEventType as EV,
  BadgeIssuanceApprovedEvent,
  BadgeIssuanceRejectedEvent,
  ApprovedPublicBadge,
  RejectedPublicBadge,
  ValueCase,
  PublicBadgesHandler,
  PublicBadgeStatus,
  Proof,
  Organization,
  BadgeIssuanceRequestedEvent,
  BadgeIssuanceDelayedEvent,
  OrganizationStatus,
} from "@public-badges/types";
import {titleCase} from "voca";

import {registry, valueCase as valueCaseStore} from "@public-badges/stores";
import {v1 as uuid} from "uuid";
import {slugify} from "voca";

export type InputEvent = BadgeIssuanceRequestedEvent;
export type OutputEvent =
  | BadgeIssuanceApprovedEvent
  | BadgeIssuanceRejectedEvent
  | BadgeIssuanceDelayedEvent;

enum ScenarioOutcome {
  PASSED = "PASSED",
  FAILED = "FAILED",
  DELAYED = "DELAYED",
}

type ScenarioResult = {
  outcome: ScenarioOutcome;
  evidence: Proof[];
};

const checkScenarios: (args: {
  valueCase: ValueCase;
  organization: Organization;
}) => Promise<ScenarioResult> = async ({valueCase, organization}) => {
  const {scenarios} = valueCase;
  const {name, status} = organization;
  switch (status) {
    case OrganizationStatus.Approved: {
      const evidence = scenarios.map(
        ({description: rawDescription, narrative: rawNarrative}) => {
          const [description, ...narrative] = [
            rawDescription,
            ...rawNarrative,
          ].map((s) => s.replace(/(the.)?organization/i, titleCase(name)));
          return {
            proofId: uuid(),
            genre: "Gherkin Scenario",
            name: slugify(description).replace(/-s-/g, " "),
            description,
            narrative,
          };
        }
      );
      return {
        outcome: ScenarioOutcome.PASSED,
        evidence,
      };
    }
    case OrganizationStatus.Pending: {
      return {outcome: ScenarioOutcome.DELAYED, evidence: []};
    }
    default: {
      return {outcome: ScenarioOutcome.FAILED, evidence: []};
    }
  }
};

const runValueCaseScenarios: PublicBadgesHandler<
  InputEvent,
  OutputEvent
> = async ({detailType, detail}) => {
  switch (detailType) {
    case EV.BADGE_ISSUANCE_REQUESTED: {
      const {recipientId, valueCaseId} = detail;
      const organization = await registry.fetch({
        organizationId: recipientId,
      });
      const valueCase = await valueCaseStore.fetch({
        valueCaseId,
      });
      if (!valueCase) {
        throw "invalid badge, no corresponding value case";
      }
      const {outcome, evidence} = await checkScenarios({
        valueCase,
        organization,
      });
      switch (outcome) {
        case ScenarioOutcome.PASSED: {
          const badge: ApprovedPublicBadge = {
            ...detail,
            evidence,
            status: PublicBadgeStatus.Approved,
          };
          return {
            detailType: EV.BADGE_ISSUANCE_APPROVED,
            detail: badge,
          };
        }
        case ScenarioOutcome.DELAYED: {
          const badge: RejectedPublicBadge = {
            ...detail,
            evidence,
            status: PublicBadgeStatus.Pending,
          };
          return {
            detailType: EV.BADGE_ISSUANCE_DELAYED,
            detail: badge,
          };
        }
        case ScenarioOutcome.FAILED: {
          const badge: RejectedPublicBadge = {
            ...detail,
            evidence,
            status: PublicBadgeStatus.Rejected,
          };
          return {
            detailType: EV.BADGE_ISSUANCE_REJECTED,
            detail: badge,
          };
        }
      }
    }
  }
};

export default runValueCaseScenarios;
