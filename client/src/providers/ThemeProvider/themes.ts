import { createTheme } from "@mui/material";

export const themes = {
  appleTheme: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#5E5C61", dark: "#353538", light: "#88898C" },
      secondary: { main: "#fafafa", dark: "#c7c7c7", light: "#ffffff" },
      error: { main: "#D32F2F", dark: "#9A0007", light: "#FF6659" },
      warning: { main: "#FFA000", dark: "#FF6F00", light: "#FFC046" },
      info: { main: "#1976D2", dark: "#004BA0", light: "#63A4FF" },
      success: { main: "#388E3C", dark: "#00600F", light: "#6ABF69" },
      background: { default: "#EFEFF4", paper: "#FFFFFF" },
      text: { primary: "#1D1D1F", secondary: "#3C3C43" },
    },
  }),
  appleDarkTheme: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#A3AAAE", dark: "#747D84", light: "#D4D9DD" },
      secondary: { main: "#000000", dark: "#333333", light: "#595959" },
      error: { main: "#FF3B30", dark: "#C60B1E", light: "#FF7669" },
      warning: { main: "#FF9500", dark: "#BF7000", light: "#FFBC5B" },
      info: { main: "#5AC8FA", dark: "#2B8CCD", light: "#99D8F4" },
      success: { main: "#4CD964", dark: "#35A842", light: "#88E391" },
      background: { default: "#121212", paper: "#1C1C1E" },
      text: { primary: "#E5E5E5", secondary: "#A3A3A3" },
    },
  }),

  amazonTheme: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#FF9900", dark: "#C77500", light: "#FFB84D" },
      secondary: { main: "#146EB4", dark: "#0F4C81", light: "#4791DB" },
      error: { main: "#D13212", dark: "#9A2C0E", light: "#F47A6A" },
      warning: { main: "#FFD814", dark: "#BFA22B", light: "#FFE58F" },
      info: { main: "#00A8E1", dark: "#0073B7", light: "#74CAFF" },
      success: { main: "#2D7600", dark: "#1B4E00", light: "#64A837" },
      background: { default: "#FFFFFF", paper: "#F6F6F6" },
      text: { primary: "#0F1111", secondary: "#404040" },
    },
  }),
  amazonDarkTheme: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#FF9900", dark: "#C77500", light: "#FFB84D" },
      secondary: { main: "#146EB4", dark: "#0F4C81", light: "#4791DB" },
      error: { main: "#D13212", dark: "#9A2C0E", light: "#F47A6A" },
      warning: { main: "#FFD814", dark: "#BFA22B", light: "#FFE58F" },
      info: { main: "#00A8E1", dark: "#0073B7", light: "#74CAFF" },
      success: { main: "#2D7600", dark: "#1B4E00", light: "#64A837" },
      background: { default: "#1D1D1D", paper: "#2A2A2A" },
      text: { primary: "#FFFFFF", secondary: "#B1B1B1" },
    },
  }),

  twitterTheme: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1DA1F2", dark: "#1A91DA", light: "#D0E9F9" },
      secondary: { main: "#E1E8ED", dark: "#AAB8C2", light: "#EFF3F4" },
      error: { main: "#E0245E", dark: "#AB1E48", light: "#FAB4D1" },
      warning: { main: "#FFAD1F", dark: "#CC8A00", light: "#FFE8B6" },
      info: { main: "#3BA9EE", dark: "#2A85D0", light: "#9BD1F9" },
      success: { main: "#17BF63", dark: "#128C48", light: "#B4E7CE" },
      background: { default: "#FFFFFF", paper: "#F5F8FA" },
      text: { primary: "#14171A", secondary: "#657786" },
    },
  }),
  twitterDarkTheme: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#1DA1F2", dark: "#1A91DA", light: "#83C7F5" },
      secondary: { main: "#E1E8ED", dark: "#AAB8C2", light: "#F1F5F8" },
      error: { main: "#E0245E", dark: "#AB1E48", light: "#F692B2" },
      warning: { main: "#FFAD1F", dark: "#CC8A00", light: "#FFD782" },
      info: { main: "#3BA9EE", dark: "#2A85D0", light: "#97D2F4" },
      success: { main: "#17BF63", dark: "#128C48", light: "#60E094" },
      background: { default: "#15202B", paper: "#192734" },
      text: { primary: "#E1E8ED", secondary: "#8899A6" },
    },
  }),

  vueLightTheme: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#42B883", dark: "#32965D", light: "#53CC91" },
      secondary: { main: "#35495E", dark: "#2B3B4E", light: "#435668" },
      error: { main: "#FF6B6B", dark: "#D94848", light: "#FF7F7F" },
      warning: { main: "#FFD166", dark: "#E0A82E", light: "#FFE291" },
      info: { main: "#3FB1B5", dark: "#2D898D", light: "#61C6CA" },
      success: { main: "#4CAF50", dark: "#39813C", light: "#64D976" },
      background: { default: "#FFFFFF", paper: "#F3F5F7" },
      text: { primary: "#2C3E50", secondary: "#35495E" },
    },
  }),
  vueDarkTheme: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#42B883", dark: "#32965D", light: "#53CC91" },
      secondary: { main: "#35495E", dark: "#2B3B4E", light: "#435668" },
      error: { main: "#FF6B6B", dark: "#D94848", light: "#FF7F7F" },
      warning: { main: "#FFD166", dark: "#E0A82E", light: "#FFE291" },
      info: { main: "#3FB1B5", dark: "#2D898D", light: "#61C6CA" },
      success: { main: "#4CAF50", dark: "#39813C", light: "#64D976" },
      background: { default: "#2C3E50", paper: "#35495E" },
      text: { primary: "#FFFFFF", secondary: "#B0BEC5" },
    },
  }),

  angularLightTheme: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#DD0031", dark: "#C3002F", light: "#E53935" },
      secondary: { main: "#CDDC39", dark: "#C0CA33", light: "#D4E157" },
      error: { main: "#F44336", dark: "#D32F2F", light: "#E57373" },
      warning: { main: "#FFEB3B", dark: "#FDD835", light: "#FFF176" },
      info: { main: "#2196F3", dark: "#1E88E5", light: "#64B5F6" },
      success: { main: "#4CAF50", dark: "#43A047", light: "#81C784" },
      background: { default: "#FFFFFF", paper: "#FAFAFA" },
      text: { primary: "#212121", secondary: "#757575" },
    },
  }),
  angularDarkTheme: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#DD0031", dark: "#C3002F", light: "#E57373" },
      secondary: { main: "#CDDC39", dark: "#C0CA33", light: "#DCE775" },
      error: { main: "#EF5350", dark: "#D32F2F", light: "#FFCDD2" },
      warning: { main: "#FFEB3B", dark: "#FDD835", light: "#FFF59D" },
      info: { main: "#42A5F5", dark: "#1E88E5", light: "#90CAF9" },
      success: { main: "#66BB6A", dark: "#43A047", light: "#A5D6A7" },
      background: { default: "#303030", paper: "#424242" },
      text: { primary: "#E0E0E0", secondary: "#BDBDBD" },
    },
  }),

  reactLightTheme: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#61DAFB", dark: "#21A1F1", light: "#7AD3FF" },
      secondary: { main: "#20232A", dark: "#181A1F", light: "#282C34" },
      error: { main: "#E02020", dark: "#B71515", light: "#FF5F5F" },
      warning: { main: "#FFBC2D", dark: "#FF9F00", light: "#FFD680" },
      info: { main: "#2196F3", dark: "#1976D2", light: "#6EC6FF" },
      success: { main: "#4CAF50", dark: "#087F23", light: "#66BB6A" },
      background: { default: "#FFFFFF", paper: "#F5F5F5" },
      text: { primary: "#20232A", secondary: "#5F6368" },
    },
  }),
  reactDarkTheme: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#61DAFB", dark: "#21A1F1", light: "#7AD3FF" },
      secondary: { main: "#20232A", dark: "#181A1F", light: "#282C34" },
      error: { main: "#D32F2F", dark: "#9A0007", light: "#E57373" },
      warning: { main: "#FBC02D", dark: "#C49000", light: "#FFF263" },
      info: { main: "#29B6F6", dark: "#0288D1", light: "#73E8FF" },
      success: { main: "#66BB6A", dark: "#388E3C", light: "#99D9A0" },
      background: { default: "#121212", paper: "#1E1E1E" },
      text: { primary: "#E0E0E0", secondary: "#BDBDBD" },
    },
  }),
};
