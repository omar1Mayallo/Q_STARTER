import { create } from "zustand";
import Cookies from "js-cookie";
import i18next from "i18next";

export enum LanguagesE {
  EN = "en",
  AR = "ar",
}

interface LanguageStateI {
  toggleLang: () => void;
  setLang: (lang: LanguagesE) => void;
}

export const useLangStore = create<LanguageStateI>((_) => ({
  setLang: (lang) => {
    i18next.changeLanguage(lang);
    Cookies.set("lang", lang);
  },
  toggleLang: () => {
    const newLanguage =
      i18next.language === LanguagesE.EN ? LanguagesE.AR : LanguagesE.EN;
    i18next.changeLanguage(newLanguage);
    Cookies.set("lang", newLanguage);
  },
}));
