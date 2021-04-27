import valueCaseFixture from "./valueCase.json";
import {ValueCaseStore, Language, Errors} from "@public-badges/types";

const valueCase: ValueCaseStore = {
  async fetch({valueCaseId, language}) {
    if (valueCaseId !== valueCaseFixture.valueCaseId) {
      throw new Error(Errors.MISSING_VALUE_CASE);
    }

    if (!language || language === Language.En) {
      return valueCaseFixture;
    }

    const localization =
      valueCaseFixture.localization && valueCaseFixture.localization[language];

    if (!localization) {
      throw new Error(Errors.MISSING_LOCALIZATION);
    }

    return {...valueCaseFixture, ...localization};
  },
  async fetchAll() {
    return [valueCaseFixture];
  },
};

export default valueCase;
