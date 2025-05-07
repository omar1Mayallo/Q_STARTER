import { create } from "zustand";
import Cookies from "js-cookie";

export enum ThemeTypeE {
  amazonTheme = "amazonTheme",
  amazonDarkTheme = "amazonDarkTheme",
  twitterTheme = "twitterTheme",
  twitterDarkTheme = "twitterDarkTheme",
  vueLightTheme = "vueLightTheme",
  vueDarkTheme = "vueDarkTheme",
  angularLightTheme = "angularLightTheme",
  angularDarkTheme = "angularDarkTheme",
  reactLightTheme = "reactLightTheme",
  reactDarkTheme = "reactDarkTheme",
}

interface ThemeStateI {
  themeType: ThemeTypeE;
  toggleTheme: () => void;
  setTheme: (theme: ThemeTypeE) => void;
}

const getStoredThemeType = (): ThemeTypeE => {
  const storedTheme = Cookies.get("themeType");
  return Object.values(ThemeTypeE).includes(storedTheme as ThemeTypeE)
    ? (storedTheme as ThemeTypeE)
    : ThemeTypeE.vueLightTheme;
};

export const useThemeStore = create<ThemeStateI>((set) => ({
  themeType: getStoredThemeType(),
  setTheme: (theme: ThemeTypeE) => {
    set({ themeType: theme });
    Cookies.set("themeType", theme);
  },
  toggleTheme: () => {
    set((state) => {
      const themes = Object.values(ThemeTypeE) as ThemeTypeE[];
      const currentIndex = themes.indexOf(state.themeType);
      const nextIndex = (currentIndex + 1) % themes.length;
      const newThemeType = themes[nextIndex];
      Cookies.set("themeType", newThemeType);
      return { themeType: newThemeType };
    });
  },
}));
