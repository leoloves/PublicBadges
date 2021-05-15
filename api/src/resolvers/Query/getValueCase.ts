import {Errors, QueryResolvers} from "@public-badges/types";

const getValueCase: QueryResolvers["getValueCase"] = async (
  _root,
  args,
  {stores}
) => {
  const valueCaseId = args.valueCaseId;
  const language = args.language;
  const valueCase = await stores.valueCase.fetch({valueCaseId, language});

  if (!valueCase) {
    throw new Error(Errors.MISSING_VALUE_CASE);
  }
  return valueCase;
};

export default getValueCase;
