import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLogin from "../locales/en/login.json";
import arLogin from "../locales/ar/login.json";

import enNavbar from "../locales/en/landingpage.json";
import arNavbar from "../locales/ar/landingPage.json";

import enAds from "../locales/en/ads.json";
import arAds from "../locales/ar/ads.json";

import enFavorites from "../locales/en/favorites.json";
import arFavorites from "../locales/ar/favorites.json";

import enBooking from "../locales/en/booking.json";
import arBooking from "../locales/ar/booking.json";

import enPhotoGrid from "../locales/en/photoGrid.json";
import arPhotoGrid from "../locales/ar/photoGrid.json";

import enFooter from "../locales/en/footer.json";
import arFooter from "../locales/ar/footer.json";

import enExplore from "../locales/en/explore.json";
import arExplore from "../locales/ar/explore.json";

import enDetails from "../locales/en/details.json";
import arDetails from "../locales/ar/details.json";

import enRegister from "../locales/en/register.json";
import arRegister from "../locales/ar/register.json";

import enforgetPassword from "../locales/en/forgetPassword.json"; 
import arforgetPassword from "../locales/ar/forgetPassword.json"; 

import enChangePassword from "../locales/en/changePassword.json";
import arChangePassword from "../locales/ar/changePassword.json"; 
import enAuth from "../locales/en/auth.json";
import arAuth from "../locales/ar/auth.json"; 
import enComment from "../locales/en/comment.json";
import arComment from "../locales/ar/comment.json"; 

import enReviewForm from '../locales/en/rate.json';
import arReviewForm from '../locales/ar/rate.json';


i18n.use(initReactI18next).init({
  resources: {
    en: { 
      login: enLogin,
      navbar: enNavbar,
      ads: enAds,
      mostPopularAds: enNavbar,
      favorites: enFavorites,
      booking: enBooking,
      photoGrid: enPhotoGrid,
      footer: enFooter,
      explore: enExplore,
      details: enDetails,
      register: enRegister,
      forgetPassword: enforgetPassword  ,
          changePassword: enChangePassword,
          auth:enAuth,
          comment:enComment,
         review: enReviewForm
    },
    ar: { 
      login: arLogin,
      navbar: arNavbar,
      ads: arAds,
      mostPopularAds: arNavbar,
      favorites: arFavorites,
      booking: arBooking,
      photoGrid: arPhotoGrid,
      footer: arFooter,
      explore: arExplore,
      details: arDetails,
      register: arRegister,
      forgetPassword: arforgetPassword ,
          changePassword: arChangePassword,
          auth:arAuth,
                    comment:arComment,
                 review: arReviewForm

    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["login", "navbar", "ads", "mostPopularAds", "favorites", "booking", "photoGrid", "footer", "explore", "details", "register", "forgetPassword","changePassword","auth","comment","review"], 
  defaultNS: "login",
  interpolation: { 
    escapeValue: false,
  },
});

export default i18n;