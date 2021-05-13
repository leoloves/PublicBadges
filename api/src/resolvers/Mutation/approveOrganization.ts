import {MutationResolvers} from "@public-badges/types";

const approveOrganization: MutationResolvers["approveOrganization"] = async (
  _root,
  {input},
  {stores}
) => {
  const {domainName, approvalToken} = input;

  const organization = await stores.registry.fetch({domainName});
  console.log("TOKEN:", approvalToken);
  console.log(organization);

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
