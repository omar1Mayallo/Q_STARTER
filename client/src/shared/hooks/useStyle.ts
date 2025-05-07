/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LanguagesE } from "../../store/language.store";

// Use Style Based On Language
export function useLangStyle(arStyle: any, enStyle: any) {
  const { i18n } = useTranslation();
  return i18n.language === LanguagesE.AR ? arStyle : enStyle;
}

// // Use Style Based On Theme
// export function useThemeStyle(lightStyle: any, darkStyle: any) {
//   const theme = useThemeStore((s) => s.themeType);
//   return theme === ThemeTypeE.LIGHT ? lightStyle : darkStyle;
// }

// Use Style Based On Screen Size
export function useScreenSizeStyle(
  defaultStyle: any,
  conditionStyle: any,
  condition: "up" | "down" | "not" | "only" = "up",
  breakPoint: Breakpoint = "md",
) {
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints[condition](breakPoint));

  return screenSize ? conditionStyle : defaultStyle;
}
