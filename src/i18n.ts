import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLogin from "../locales/en/login.json";
import arLogin from "../locales/ar/login.json";
import enForgetPassword from "../locales/en/forgetpassword.json";
import arForgetPassword from "../locales/ar/forgetpassword.json";
import enresetpassowrd from "../locales/en/resetpassword.json";
import arresetpassword from "../locales/ar/resetpassword.json";
i18n.use(initReactI18next).init({
  resources: {
    en: { 
      login: enLogin ,
      forgetpassword: enForgetPassword,
      resetpassword:enresetpassowrd
     },
    ar: {
      login: arLogin,
      forgetpassword: arForgetPassword,
      resetpassword:arresetpassword
    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["login","forgetpassword", "resetpassword"],   
  defaultNS: "login",
  interpolation: { escapeValue: false },
});

export default i18n;
