import { ToggleButton } from "@mui/material";
import React, { useMemo } from "react";
import { themes } from "../../../../../providers/ThemeProvider/themes";
import { ThemeTypeE } from "../../../../../store/theme.store";

interface ThemeButtonProps {
  themeKey: ThemeTypeE;
  IconFilled: React.ElementType;
  IconOutlined: React.ElementType;
  selectedTheme: ThemeTypeE;
  onSelectTheme: (themeKey: ThemeTypeE) => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  themeKey,
  IconFilled,
  IconOutlined,
  selectedTheme,
  onSelectTheme,
}) => {
  const isSelected = useMemo(
    () => selectedTheme === themeKey,
    [selectedTheme, themeKey],
  );
  const {
    primary: { main },
    mode,
  } = useMemo(() => themes[themeKey].palette, [themeKey]);

  const Icon = isSelected ? IconFilled : IconOutlined;
  const backgroundColor = mode === "dark" ? "#121212" : "#FFFFFF";
  const hoverBackgroundColor = mode === "dark" ? "#333333" : "#EEEEEE";

  return (
    <ToggleButton
      size="small"
      value={themeKey}
      selected={isSelected}
      onChange={() => onSelectTheme(themeKey)}
      sx={{
        color: main,
        backgroundColor,
        "&:hover": {
          backgroundColor: hoverBackgroundColor,
        },
        "&.Mui-selected, &.Mui-selected:hover": {
          color: main,
          backgroundColor,
        },
      }}
    >
      <Icon />
    </ToggleButton>
  );
};

export default ThemeButton;
