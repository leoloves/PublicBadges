import {QueryResolvers, Language, Errors} from "@public-badges/types";

const getAllBadges: QueryResolvers["getAllBadges"] = async (
  _root,
  {domainName, language},
  context
) => {
  context.language = language || Language.En;
  const {stores} = context;
  if (`${domainName}` === "https://example.org/") {
    context.organizationName = "Randomio";
    return stores.badgeInstance.fetchAll({});
  }

  const organization = await stores.registry.fetch({domainName});

  if (!organization) {
    throw new Error(Errors.UNKNOWN_ORGANIZATION);
  }

  const organizationId = organization.organizationId;

  context.organizationName = organization.name;

  return stores.badgeInstance.fetchAll({
    organizationId,
  });
};

export default getAllBadges;
