import { TFunction } from "i18next";
import { IBreadcrumbs } from "../../../../shared/types/Interfaces/Breadcrumbs.interface";
import { TableHeadCell } from "../../../../shared/types/Interfaces/TableCellHead.interface";
import {
  ROLE_STATUS,
  ROLE_TYPE,
  RoleModel,
} from "../../../../shared/types/models/Role.model";

// _BREADCRUMBS
export const rolesBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
): IBreadcrumbs[] => [{ name: t("USERS_MANAGEMENT") }, { name: t("ROLES") }];

export const roleDetailsBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
  id: string,
): IBreadcrumbs[] => [
  { name: t("USERS_MANAGEMENT") },
  {
    name: t("ROLES"),
    url: "/users-management/roles",
  },
  { name: `${t("id")}(${id})` },
];
export const rolePermissionsBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
  id: string,
): IBreadcrumbs[] => [
  { name: t("USERS_MANAGEMENT") },
  {
    name: t("ROLES"),
    url: "/users-management/roles",
  },
  { name: `${t("id")}(${id})` },
  { name: t("ROLE_PERMISSIONS") },
];

// _TABLE_HEAD_COLUMNS_CELLS
export const rolesHeadCells = (
  t: TFunction<["translation", ...string[]], undefined>,
): TableHeadCell<RoleModel>[] => [
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
  { label: "Active", value: ROLE_STATUS.ACTIVE },
  { label: "In Active", value: ROLE_STATUS.INACTIVE },
];
export const menuTypesItems = [
  { label: "All", value: "ALL" },
  { label: "Administrative", value: ROLE_TYPE.ADMINISTRATIVE },
  { label: "Portal", value: ROLE_TYPE.PORTAL },
];

// _ROLE_TYPES_OPTIONS
export const roleTypes = [
  { label: "Administrative", value: ROLE_TYPE.ADMINISTRATIVE },
  { label: "Portal", value: ROLE_TYPE.PORTAL },
];
// _ROLE_STATUS_OPTIONS
export const roleStatus = [
  { label: "Active", value: ROLE_STATUS.ACTIVE },
  { label: "In Active", value: ROLE_STATUS.INACTIVE },
];
