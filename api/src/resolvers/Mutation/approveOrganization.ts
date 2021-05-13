import { MutationResolvers } from "@public-badges/types";

const approveOrganization: MutationResolvers["approveOrganization"] = async (
    _root,
    { input }
) => {
    const { organizationId, approvalToken } = input;

    console.log("ID:", organizationId);
    console.log("TOKEN:", approvalToken);

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
