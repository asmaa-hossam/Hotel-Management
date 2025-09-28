import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLogin from "../locales/en/login.json";
import arLogin from "../locales/ar/login.json";

import enNavbar from "../locales/en/landingpage.json";
import arNavbar from "../locales/ar/landingPage.json";
import enAds from "../locales/en/landingpage.json"; 
import arAds from "../locales/ar/landingPage.json";

import enFavorites from "../locales/en/favorites.json";
import arFavorites from "../locales/ar/favorites.json";

import enBooking from "../locales/en/landingpage.json";
import arBooking from "../locales/ar/landingPage.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { 
      login: enLogin,
      navbar: enNavbar,
      mostPopularAds:enAds,
      favorites: enFavorites,
      booking:enBooking
    },
    ar: { 
      login: arLogin,
      navbar: arNavbar,
      mostPopularAds:arAds,
            favorites: arFavorites,
  booking:arBooking
    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["login", "navbar","mostPopularAds","favorites","booking"],  
  defaultNS: "login",       
  interpolation: { escapeValue: false },
});

export default i18n;








