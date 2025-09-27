import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLogin from "../locales/en/login.json";
import arLogin from "../locales/ar/login.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { login: enLogin },
    ar: { login: arLogin },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["login"],   
  defaultNS: "login",
  interpolation: { escapeValue: false },
});

export default i18n;
