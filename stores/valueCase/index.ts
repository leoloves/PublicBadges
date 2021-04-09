import valueCaseFixture from "./valueCase.json";
import { Store, ValueCase, Language } from "@types";

export type ValueCaseStore = Store<
  { valueCaseId: string; language?: Language | null },
  {},
  ValueCase
>;

const valueCase: ValueCaseStore = {
  async fetch({ valueCaseId, language }) {
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

    const { name, tags, narrative, scenarios, description } = localization;

    return { ...valueCase, ...localization };
  },
  async fetchAll() {
    return [valueCaseFixture];
  }
};

export default valueCase;
