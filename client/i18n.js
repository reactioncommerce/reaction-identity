import i18next from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextFetch from "i18next-fetch-backend";
import i18nextMultiLoadBackendAdapter from "i18next-multiload-backend-adapter";
import { initReactI18next } from "react-i18next";
import { Meteor } from "meteor/meteor";
import Logger from "./Logger.js";

i18next
  // https://github.com/i18next/i18next-browser-languageDetector
  // Sets initial language to load based on `lng` query string
  // with various fallbacks.
  .use(i18nextBrowserLanguageDetector)
  // https://github.com/perrin4869/i18next-fetch-backend
  // This uses `fetch` to load resources from the backend based on `backend`
  // config object below.
  .use(i18nextMultiLoadBackendAdapter)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    backend: {
      backend: i18nextFetch,
      backendOption: {
        allowMultiLoading: true,
        loadPath: Meteor.absoluteUrl("/locales/resources.json?lng={{lng}}&ns={{ns}}")
      }
    },
    debug: false,
    detection: {
      // We primarily set language according to `navigator.language`,
      // which is supported in all modern browsers and can be changed
      // in the browser settings. This is the same list that browsers
      // send in the `Accept-Language` header.
      //
      // For ease of testing translations, we also support `lng`
      // query string to override the browser setting.
      order: ["querystring", "navigator"]
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })
  .catch((error) => {
    Logger.error(error);
  });
