import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import layoutAR from "./locales/ar/layout.json";
import layoutEN from "./locales/en/layout.json";
import validationsEN from "./locales/en/validations.json";
import validationsAR from "./locales/ar/validations.json";
import labelsAR from "./locales/ar/labels.json";
import labelsEN from "./locales/en/labels.json";
import Cookies from "js-cookie";

i18next.use(initReactI18next).init({
  lng: Cookies.get("lang") || "en", // Default language
  // debug: true,
  defaultNS: "labels",
  resources: {
    en: {
      layout: layoutEN,
      validations: validationsEN,
      labels: labelsEN,
    },
    ar: {
      layout: layoutAR,
      validations: validationsAR,
      labels: labelsAR,
    },
  },
});
