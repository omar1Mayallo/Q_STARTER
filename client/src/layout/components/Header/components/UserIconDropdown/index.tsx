import React from "react";
import SettingsDrawer from "../SettingsDrawer";
import useGetLoggedUser from "../../../../../app/user-manager/user/profile/services/profile.service";
import UserIcon from "./Icon";
import DropdownMenu from "./DropdownMenu";
import { useLangStyle } from "../../../../../shared/hooks/useStyle";

const UserIconDropdown = () => {
  // USER_STATE_HANDLER
  const { data, isLoading, isError } = useGetLoggedUser();

  // DROPDOWN_STATE_HANDLER
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // SIDE_DRAWER_STATE_HANDLER
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const toggleSettingsDrawer = () => {
    setSettingsDrawerOpen(!settingsDrawerOpen);
  };
  return (
    <>
      <UserIcon
        handleClick={handleClick}
        userData={data}
        isLoading={isLoading}
        isError={isError}
      />
      <DropdownMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        toggleSettingsDrawer={toggleSettingsDrawer}
      />
      <SettingsDrawer
        open={settingsDrawerOpen}
        anchor={useLangStyle("left", "right")}
        toggleDrawer={toggleSettingsDrawer}
      />
    </>
  );
};

export default UserIconDropdown;
