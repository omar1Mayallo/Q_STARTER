import { Logout, Person, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem, MenuProps } from "@mui/material";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import useLoginAPIs from "../../../../../app/authentication/pages/login/api/login.api";
import { toastSuccess } from "../../../../../shared/components/Toasts";
import { useLangStyle } from "../../../../../shared/hooks/useStyle";

export interface DropdownMenuPropsI {
  anchorEl: MenuProps["anchorEl"];
  open: boolean;
  handleClose: () => void;
  toggleSettingsDrawer: () => void;
}

const DropdownMenu = ({
  anchorEl,
  open,
  handleClose,
  toggleSettingsDrawer,
}: DropdownMenuPropsI) => {
  const { logout } = useLoginAPIs();
  const handleLogout = () => {
    logout();
    toastSuccess(i18next.t("LOGOUT_SUCCESS"));
  };
  const { t } = useTranslation(["layout"]);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: useLangStyle(undefined, 14),
              left: useLangStyle(14, undefined),
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{
        horizontal: useLangStyle("left", "right"),
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: useLangStyle("left", "right"),
        vertical: "bottom",
      }}
    >
      <MenuItem dir={useLangStyle("rtl", "ltr")} onClick={handleClose}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        {t("PROFILE")}
      </MenuItem>
      <MenuItem dir={useLangStyle("rtl", "ltr")} onClick={toggleSettingsDrawer}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        {t("SETTINGS")}
      </MenuItem>
      <MenuItem dir={useLangStyle("rtl", "ltr")} onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t("LOGOUT")}
      </MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
