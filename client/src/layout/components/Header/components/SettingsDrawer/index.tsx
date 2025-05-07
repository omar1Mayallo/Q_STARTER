import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageToggles from "./LangToggles";
import ThemeToggles from "./ThemeToggles";
import { useLangStyle } from "../../../../../shared/hooks/useStyle";

const drawerWidth = 280;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SettingsDrawer = ({
  anchor,
  open,
  toggleDrawer,
}: {
  anchor: DrawerProps["anchor"];
  open: boolean;
  toggleDrawer: () => void;
}) => {
  const { t } = useTranslation(["layout"]);
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        direction: useLangStyle("rtl", "ltr"),
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <DrawerHeader
        sx={{
          display: "flex",
        }}
      >
        <Typography variant={"h6"} color={"text.secondary"}>
          {t("SETTINGS")}
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Close sx={{ color: "text.secondary" }} />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          p: 1.5,
          background: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack gap={1}>
          <Typography variant="subtitle2" color={"text.secondary"}>
            {t("THEME")}
          </Typography>
          <ThemeToggles />
        </Stack>

        <Stack gap={1}>
          <Typography variant="subtitle2" color={"text.secondary"}>
            {t("LANGUAGE")}
          </Typography>
          <LanguageToggles />
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
