import { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeStore } from "../../store/theme.store";
import { themes } from "./themes";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mode = useThemeStore((state) => state.themeType);

  const theme = useMemo(() => themes[mode], [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
