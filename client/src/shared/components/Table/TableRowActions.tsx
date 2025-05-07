import { MoreVert } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import IconButtonTooltip from "../Buttons/IconButtonTooltip";
import useDropDownMenu from "../../hooks/useDropDownMenu";
import { IActionsConfig } from "../../actions";
import i18next from "i18next";
import { useLangStyle } from "../../hooks/useStyle";

export interface ActionItems extends IActionsConfig {
  handler: (id: number) => void;
}

export interface TableRowActionsProps {
  id: number;
  actionsItems: ActionItems[];
  selected: number[];
}

const TableRowActions = ({
  id,
  actionsItems,
  selected,
}: TableRowActionsProps) => {
  const { anchorEl, open, handleClick, handleClose } = useDropDownMenu();

  const langTxtStyle = useLangStyle("rtl", "ltr");

  return (
    <>
      <IconButtonTooltip
        tooltip={undefined}
        Icon={MoreVert}
        onClick={handleClick}
        disabled={!actionsItems?.length}
      />
      {!!actionsItems?.length && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {actionsItems?.map(({ actionName, Icon, handler }, index) => (
            <MenuItem
              key={index}
              divider={index !== actionsItems.length - 1}
              sx={{ py: 1.1 }}
              dir={langTxtStyle}
              onClick={() => {
                handler(id);
                // handleClose();
              }}
              disabled={actionName === "Delete" && !!selected.length}
            >
              <ListItemIcon>
                <Icon fontSize="medium" />
              </ListItemIcon>
              <ListItemText sx={{ textAlign: "start" }}>
                {i18next.t(actionName, { ns: "labels" })}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default TableRowActions;
