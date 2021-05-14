import { MutationResolvers, PendingOrganization } from "@public-badges/types";

const approveOrganization: MutationResolvers["approveOrganization"] = async (
    _root,
    { input },
    { stores }
) => {
    const { organizationId } = input;

    const organization = (await stores.registry.fetch({
        organizationId,
    })) as PendingOrganization;
    console.log("TOKEN-INPUT:", input.approvalToken);
    console.log("TOKEN-STORED:", organization.approvalToken);
    return organization;

    /***
            return eventBus.put({
              detailType: ORGANIZATION_REGISTRATION_REQUESTED,
              detail: {
                organizationId,
                status,
                name,
                contact,
                admin,
                domainName,
                urls: [domainName],
              },
            }) as Promise<Organization>;
            ***/
};

export default approveOrganization;
