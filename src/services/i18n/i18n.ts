import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { isProd } from "@/runtime-env";

i18n.use(initReactI18next).init({
  fallbackLng: "en",

  ns: ["common", "oni"],
  defaultNS: "common",

  resources: {
    en: {
      common: require("@/translations/en/common.json"),
    },
  },

  debug: !isProd,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  react: {
    wait: true,
  },
});

export default i18n;
