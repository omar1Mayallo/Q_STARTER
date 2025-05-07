/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalNavLinkWrapper from "../../../../shared/components/Links/ConditionalNavLinkWrapper";
import { IMAGE_REGEX } from "../../../../shared/constants/regex";
import { LanguagesE } from "../../../../store/language.store";
import useSideDrawerStore from "../../../store/side-drawer.store";
import useCurrentPath from "../hooks/useCurrentPath";
import { useTranslation } from "react-i18next";

export interface SideListItemPropsI {
  name: { en: string; ar: string };
  url?: string;
  Icon?: any;
  subPadding?: boolean;
  subItemsMenu?: SideListItemPropsI[];
  module_key?: string;
  entity_key?: string;
  actions?: object[];
}

const SideListItem = (props: SideListItemPropsI) => {
  const { name, url, Icon, subPadding, subItemsMenu, module_key, entity_key } =
    props;
  const { i18n } = useTranslation();
  // SIDE_DRAWER_STATE
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  // HANDLE_CURRENT_PATH
  const { pathSegments } = useCurrentPath();

  // HANDLE_COLLAPSE_STATE
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (!isOpen) {
      toggleSideNav();
    }
    if (subItemsMenu) {
      navigate(subItemsMenu[0].url!);
    }
    setOpen(!open);
  };
  useEffect(() => {
    if (selected) {
      setOpen(true);
    }
    if (!isOpen) {
      setOpen(false);
    }
  }, [isOpen]);

  // ITEM_SELECTED
  const selected =
    pathSegments.includes(entity_key!) || pathSegments.includes(module_key!);

  // ICON_FROM[@mui/icons-material] or as Image
  const IconComponent: Icons.SvgIconComponent = (Icons as any)[Icon];
  const iconIsImage = IMAGE_REGEX.test(Icon);

  return (
    subItemsMenu?.length !== 0 && (
      <>
        <ConditionalNavLinkWrapper url={url}>
          <Tooltip
            title={
              !isOpen && (i18n.language === LanguagesE.AR ? name.ar : name.en)
            }
            placement={"right"}
            arrow
          >
            <ListItemButton
              selected={selected}
              onClick={subItemsMenu ? handleClick : undefined}
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 1.5,
                ...(subPadding && {
                  [i18n.language === LanguagesE.EN ? "pl" : "pr"]: 4,
                }),
              }}
            >
              <ListItemIcon>
                {Icon &&
                  (iconIsImage ? (
                    <img
                      src={`/${Icon}`}
                      alt={"icon"}
                      loading="lazy"
                      width={25}
                      height={25}
                      style={{ ...(!isOpen && { marginInline: "auto" }) }}
                    />
                  ) : (
                    <IconComponent
                      sx={{ ...(!isOpen && { marginInline: "auto" }) }}
                    />
                  ))}
              </ListItemIcon>

              {isOpen && (
                <ListItemText
                  primary={i18n.language === LanguagesE.EN ? name.en : name.ar}
                  sx={{
                    textAlign:
                      i18n.language === LanguagesE.AR ? "right" : "left",
                  }}
                />
              )}

              {subItemsMenu &&
                isOpen &&
                (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </Tooltip>
        </ConditionalNavLinkWrapper>
        {subItemsMenu && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" dense={true} disablePadding>
              {subItemsMenu.map((item, idx) => (
                <SideListItem key={idx} {...item} subPadding />
              ))}
            </List>
          </Collapse>
        )}
      </>
    )
  );
};

export default SideListItem;
