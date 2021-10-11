import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createI18nReducer = createServiceReducerCreator("i18n");
export const createI18nSelector = createServiceSelectorCreator("i18n");
