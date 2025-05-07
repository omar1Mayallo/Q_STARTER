import { TFunction } from "i18next";
import { TableHeadCell } from "../../../../../shared/types/Interfaces/TableCellHead.interface";
import {
  USER_STATUS,
  USER_TYPE,
  UserModel,
} from "../../../../../shared/types/models/User.model";
import { IBreadcrumbs } from "../../../../../shared/types/Interfaces/Breadcrumbs.interface";

// _BREADCRUMBS
export const userBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
): IBreadcrumbs[] => [{ name: t("USERS_MANAGEMENT") }, { name: t("USERS") }];
export const userDetailsBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
  id: string,
): IBreadcrumbs[] => [
  { name: t("USERS_MANAGEMENT") },
  {
    name: t("USERS"),
    url: "/users-management/users",
  },
  { name: `${t("id")}(${id})` },
];
export const addUserBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
): IBreadcrumbs[] => [
  { name: t("USERS_MANAGEMENT") },
  {
    name: t("USERS"),
    url: "/users-management/users",
  },
  { name: t("ADD_USER") },
];

export const userPermissionsBreadcrumbs = (
  t: TFunction<["translation", ...string[]], undefined>,
  id: string,
): IBreadcrumbs[] => [
  { name: t("USERS_MANAGEMENT") },
  {
    name: t("USERS"),
    url: "/users-management/users",
  },
  { name: `${t("id")}(${id})` },
  { name: t("USER_PERMISSIONS") },
];

// _TABLE_HEAD_COLUMNS_CELLS
export const usersHeadCells = (
  t: TFunction<["translation", ...string[]], undefined>,
): TableHeadCell<UserModel>[] => [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: t("id"),
    sortable: true,
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: t("username"),
    sortable: true,
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: t("email"),
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
  { label: "Active", value: USER_STATUS.ACTIVE },
  { label: "In Active", value: USER_STATUS.INACTIVE },
];
export const menuTypesItems = [
  { label: "All", value: "ALL" },
  { label: "Administrative", value: USER_TYPE.ADMINISTRATIVE },
  { label: "Portal", value: USER_TYPE.PORTAL },
];

// _USER_TYPES_OPTIONS
export const userTypes = [
  { label: "Administrative", value: USER_TYPE.ADMINISTRATIVE },
  { label: "Portal", value: USER_TYPE.PORTAL },
];
// _USER_STATUS_OPTIONS
export const userStatus = [
  { label: "Active", value: USER_STATUS.ACTIVE },
  { label: "In Active", value: USER_STATUS.INACTIVE },
];
