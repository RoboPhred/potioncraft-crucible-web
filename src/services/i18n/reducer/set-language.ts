import { Action } from "redux";

import { ACTION_SET_LANGUAGE, SetLanguageAction } from "@/actions/set-language";

import { I18NState, defaultI18NState } from "../state";
import { createI18nReducer } from "../state-utils";

import i18n from "../i18n";

export default createI18nReducer(function setLanguageReducer(
  state: I18NState = defaultI18NState,
  action: Action
): I18NState {
  if (action.type !== ACTION_SET_LANGUAGE) {
    return state;
  }

  const lang = (action as SetLanguageAction).payload;

  // TODO: Side effect should be in saga.
  i18n.changeLanguage(lang);

  return {
    ...state,
    language: lang,
  };
});
