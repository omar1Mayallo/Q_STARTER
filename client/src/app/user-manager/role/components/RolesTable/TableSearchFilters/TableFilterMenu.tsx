import { FilterAlt } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useCheckedItems from "../../../../../../shared/hooks/useCheckedItems";
import useDropDownMenu from "../../../../../../shared/hooks/useDropDownMenu";
import { menuStatusItems, menuTypesItems } from "../../../data";
import i18next from "i18next";
import { useLangStyle } from "../../../../../../shared/hooks/useStyle";
import useGetAllRolesParamsStore from "../../../store/useGetAllRolesParams.store";

export default function TableFilterMenu() {
  const { handleStatus, handleType } = useGetAllRolesParamsStore();
  const {
    handleMenuItemClick: handleMenuStatusItemClick,
    checkedItems: checkedStatusItems,
  } = useCheckedItems("status", handleStatus);
  const {
    handleMenuItemClick: handleMenuTypeItemClick,
    checkedItems: checkedTypeItems,
  } = useCheckedItems("type", handleType);
  const { anchorEl, open, handleClick, handleClose } = useDropDownMenu();

  return (
    <Box>
      <Tooltip
        title={i18next.t("filter", {
          ns: "labels",
        })}
      >
        <IconButton onClick={handleClick}>
          <FilterAlt />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        dir={useLangStyle("rtl", "ltr")}
      >
        {/* FILTER_BY_STATUS */}
        <Typography
          component={"h2"}
          variant={"h6"}
          color={"text.secondary"}
          sx={{
            my: 0.7,
            mx: 1.8,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {i18next.t("status", {
            ns: "labels",
          })}
        </Typography>
        {menuStatusItems.map(({ label, value }) => (
          <MenuItem
            key={value}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              py: 0,
            }}
          >
            <FormControlLabel
              disabled={value === "ALL" && checkedStatusItems.includes("ALL")}
              control={
                <Checkbox
                  onClick={() => handleMenuStatusItemClick(value)}
                  checked={checkedStatusItems.includes(value)}
                  sx={{ p: 0.7 }}
                />
              }
              label={label}
              sx={{ width: "100%", m: 0 }}
            />
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* FILTER_BY_USER_TYPE */}
        <Typography
          component={"h2"}
          variant={"h6"}
          color={"text.secondary"}
          sx={{
            my: 0.7,
            mx: 1.8,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {i18next.t("type", {
            ns: "labels",
          })}
        </Typography>
        {menuTypesItems.map(({ label, value }) => (
          <MenuItem
            key={value}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              py: 0,
            }}
          >
            <FormControlLabel
              disabled={value === "ALL" && checkedTypeItems.includes("ALL")}
              control={
                <Checkbox
                  onClick={() => handleMenuTypeItemClick(value)}
                  checked={checkedTypeItems.includes(value)}
                  sx={{ p: 0.7 }}
                />
              }
              label={label}
              sx={{ width: "100%", m: 0 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
