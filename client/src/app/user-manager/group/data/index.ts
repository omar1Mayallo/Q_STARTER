import { TFunction } from "i18next";
import { IBreadcrumbs } from "../../../../shared/types/Interfaces/Breadcrumbs.interface";
import { TableHeadCell } from "../../../../shared/types/Interfaces/TableCellHead.interface";
import {
  GROUP_STATUS,
  GROUP_TYPE,
  GroupModel,
} from "../../../../shared/types/models/Group.model";

// _BREADCRUMBS
export const groupsBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
): IBreadcrumbs[] => [{ name: t("USERS_MANAGEMENT") }, { name: t("GROUPS") }];

export const groupDetailsBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
  id: string,
): IBreadcrumbs[] => [
  { name: t("USERS_MANAGEMENT") },
  {
    name: t("GROUPS"),
    url: "/users-management/groups",
  },
  { name: `${t("id")}(${id})` },
];

// _TABLE_HEAD_COLUMNS_CELLS
export const groupsHeadCells = (
  t: TFunction<["translation", ...string[]], undefined>,
): TableHeadCell<GroupModel>[] => [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: t("id"),
    sortable: true,
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: t("name"),
    sortable: true,
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: t("description"),
    sortable: true,
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: t("status"),
    sortable: true,
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: t("type"),
    sortable: true,
  },
  {
    id: "created_at",
    numeric: true,
    disablePadding: false,
    label: t("created_at"),
    sortable: false,
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: t("actions"),
    sortable: false,
  },
];

// _FILTER_OPTIONS
export const menuStatusItems = [
  { label: "All", value: "ALL" },
  { label: "Active", value: GROUP_STATUS.ACTIVE },
  { label: "In Active", value: GROUP_STATUS.INACTIVE },
];
export const menuTypesItems = [
  { label: "All", value: "ALL" },
  { label: "Administrative", value: GROUP_TYPE.ADMINISTRATIVE },
  { label: "Portal", value: GROUP_TYPE.PORTAL },
];

// _GROUP_TYPES_OPTIONS
export const groupTypes = [
  { label: "Administrative", value: GROUP_TYPE.ADMINISTRATIVE },
  { label: "Portal", value: GROUP_TYPE.PORTAL },
];
// _GROUP_STATUS_OPTIONS
export const groupStatus = [
  { label: "Active", value: GROUP_STATUS.ACTIVE },
  { label: "In Active", value: GROUP_STATUS.INACTIVE },
];
