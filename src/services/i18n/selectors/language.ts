import { I18NState as I18nState } from "../state";
import { createI18nSelector } from "../state-utils";

export const currentLanguageSelector = createI18nSelector(
  (state: I18nState) => state.language
);
