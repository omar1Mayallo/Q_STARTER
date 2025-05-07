import {
  DarkModeOutlined,
  DarkModeRounded,
  WbSunnyOutlined,
  WbSunnyRounded,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { ThemeTypeE, useThemeStore } from "../../../../../store/theme.store";
import ThemeButton from "./ThemeButton";

const themeButtons = [
  {
    themeKey: ThemeTypeE.amazonTheme,
    IconFilled: WbSunnyRounded,
    IconOutlined: WbSunnyOutlined,
  },
  {
    themeKey: ThemeTypeE.twitterTheme,
    IconFilled: WbSunnyRounded,
    IconOutlined: WbSunnyOutlined,
  },
  {
    themeKey: ThemeTypeE.vueLightTheme,
    IconFilled: WbSunnyRounded,
    IconOutlined: WbSunnyOutlined,
  },
  {
    themeKey: ThemeTypeE.angularLightTheme,
    IconFilled: WbSunnyRounded,
    IconOutlined: WbSunnyOutlined,
  },
  {
    themeKey: ThemeTypeE.reactLightTheme,
    IconFilled: WbSunnyRounded,
    IconOutlined: WbSunnyOutlined,
  },
  {
    themeKey: ThemeTypeE.amazonDarkTheme,
    IconFilled: DarkModeRounded,
    IconOutlined: DarkModeOutlined,
  },
  {
    themeKey: ThemeTypeE.twitterDarkTheme,
    IconFilled: DarkModeRounded,
    IconOutlined: DarkModeOutlined,
  },
  {
    themeKey: ThemeTypeE.vueDarkTheme,
    IconFilled: DarkModeRounded,
    IconOutlined: DarkModeOutlined,
  },
  {
    themeKey: ThemeTypeE.angularDarkTheme,
    IconFilled: DarkModeRounded,
    IconOutlined: DarkModeOutlined,
  },
  {
    themeKey: ThemeTypeE.reactDarkTheme,
    IconFilled: DarkModeRounded,
    IconOutlined: DarkModeOutlined,
  },
];

const ThemeToggles: React.FC = () => {
  const { setTheme, themeType } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState<ThemeTypeE>(themeType);

  const handleToggleTheme = (themeName: ThemeTypeE) => {
    setSelectedTheme(themeName);
    setTheme(themeName);
  };

  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {themeButtons.map((props) => (
        <ThemeButton
          key={props.themeKey}
          {...props}
          selectedTheme={selectedTheme}
          onSelectTheme={handleToggleTheme}
        />
      ))}
    </Stack>
  );
};

export default ThemeToggles;
