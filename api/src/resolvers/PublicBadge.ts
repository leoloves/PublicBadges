import {titleCase} from "voca";
import {
  PublicBadgeResolvers,
  PublicBadgeStatus,
  PendingPublicBadgeResolvers,
  ApprovedPublicBadgeResolvers,
  Language,
  ApprovedOrganization,
  RejectedPublicBadgeResolvers,
  SignedPublicBadgeResolvers,
} from "@public-badges/types";

const PublicBadge: PublicBadgeResolvers = {
  __resolveType({status}) {
    switch (status) {
      case PublicBadgeStatus.Signed: {
        return "SignedPublicBadge";
      }
      case PublicBadgeStatus.Approved: {
        return "ApprovedPublicBadge";
      }
      case PublicBadgeStatus.Rejected: {
        return "RejectedPublicBadge";
      }
      case PublicBadgeStatus.Pending: {
        return "PendingPublicBadge";
      }
    }
  },
  badgeId({badgeId}) {
    return badgeId;
  },
  valueCaseId({valueCaseId}) {
    return valueCaseId;
  },
  status({status}) {
    return status;
  },
  async valueCase({valueCaseId}, _args, {language, stores}) {
    const valueCase = await stores.valueCase.fetch({
      language,
      valueCaseId,
    });
    return valueCase;
  },
  async name({valueCaseId}, _args, {language, stores}) {
    const {name} = await stores.valueCase.fetch({
      language,
      valueCaseId,
    });
    return name;
  },
  async tags({valueCaseId}, _args, {language, stores}) {
    const {tags} = await stores.valueCase.fetch({
      language,
      valueCaseId,
    });
    return tags;
  },
  async description({valueCaseId}, _args, {language, stores}) {
    const {description} = await stores.valueCase.fetch({
      language,
      valueCaseId,
    });
    return description;
  },
  async narrative({valueCaseId}, _args, {language, stores}) {
    const {narrative} = await stores.valueCase.fetch({
      language,
      valueCaseId,
    });
    return narrative;
  },
  recipientId({recipientId}) {
    return recipientId;
  },
  recipient({recipientId}, _args, {stores}) {
    return stores.registry.fetch({
      organizationId: recipientId,
    }) as Promise<ApprovedOrganization>;
  },
};

const PendingPublicBadge: PendingPublicBadgeResolvers = {
  ...PublicBadge,
};

const ApprovedPublicBadge: ApprovedPublicBadgeResolvers = {
  ...PendingPublicBadge,
  async evidence(
    {valueCaseId, evidence},
    _args,
    {language, organizationName, stores}
  ) {
    if (!language || language === Language.En) {
      return evidence;
    }
    const {scenarios} = await stores.valueCase.fetch({
      language,
      valueCaseId,
    });

    return scenarios.map(
      ({description: rawDescription, narrative: rawNarrative}, index) => {
        const [description, ...narrative] = [
          rawDescription,
          ...rawNarrative,
        ].map((s) =>
          s.replace(/(the.)?organization/i, titleCase(organizationName))
        );

        return {
          ...evidence[index],
          description,
          narrative,
        };
      }
    );
  },
};

const RejectedPublicBadge: RejectedPublicBadgeResolvers = {
  ...ApprovedPublicBadge,
};

const SignedPublicBadge: SignedPublicBadgeResolvers = {
  ...ApprovedPublicBadge,
  issuedOn({issuedOn}) {
    return issuedOn;
  },
  expires({expires}) {
    return expires;
  },
  artifact({artifact}) {
    return artifact;
  },
};

export {
  PublicBadge,
  PendingPublicBadge,
  ApprovedPublicBadge,
  RejectedPublicBadge,
  SignedPublicBadge,
};
