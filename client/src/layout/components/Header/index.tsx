import { Close, Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useLangStyle } from "../../../shared/hooks/useStyle";
import useSideDrawerStore from "../../store/side-drawer.store";
import LangIcon from "./components/LangIcon";
import NotificationIconDropdown from "./components/NotificationIconDropdown";
import UserIconDropdown from "./components/UserIconDropdown";

export default function Header() {
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  return (
    <AppBar
      component={"header"}
      sx={{
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Stack
          direction={useLangStyle("row-reverse", "row")}
          alignItems="center"
          justifyContent={"space-between"}
          width={"100%"}
        >
          {/* RIGHT_SIDE */}
          <Stack direction={useLangStyle("row-reverse", "row")} gap={2}>
            {/* MENU_ICON */}
            <IconButton color="inherit" onClick={toggleSideNav}>
              {isOpen ? <Close /> : <Menu />}
            </IconButton>
            {/* LOGO */}
            <Link to={"/"}>
              <Box
                component={"img"}
                src="/vite.svg"
                alt="logo"
                width={40}
                height={40}
              />
            </Link>
          </Stack>

          {/* LEFT_SIDE */}
          <Stack direction={useLangStyle("row-reverse", "row")} gap={2}>
            {/* I18N_ICON */}
            <LangIcon />
            {/* NOTIFICATIONS_ICON_DROPDOWN */}
            <NotificationIconDropdown />
            {/* USER_ICON_DROPDOWN */}
            <UserIconDropdown />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
