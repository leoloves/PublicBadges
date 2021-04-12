import valueCaseFixture from "./valueCase.json";
import {ValueCaseStore, Language} from "@public-badges/types";

const valueCase: ValueCaseStore = {
  async fetch({valueCaseId, language}) {
    if (valueCaseId !== valueCaseFixture.valueCaseId) {
      throw "invalid badge, no corresponding value case";
    }

    const valueCase = valueCaseFixture;
    if (!language || language === Language.En) {
      return valueCase;
    }

    const localization =
      valueCase.localization && valueCase.localization[language];

    if (!localization) {
      throw "this valuecas eis not translated in the language that you requested";
    }

    return {...valueCase, ...localization};
  },
  async fetchAll() {
    return [valueCaseFixture];
  },
};

export default valueCase;
