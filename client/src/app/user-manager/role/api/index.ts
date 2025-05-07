import i18next from "i18next";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../../api/methods";
import { GetAllResponseI } from "../../../../api/types/response.types";
import { toastSuccess } from "../../../../shared/components/Toasts";
import { RoleModel } from "../../../../shared/types/models/Role.model";
import { EditRoleFormData } from "../validation/editRole.validation";
import { AddRoleFormData } from "../validation/addRole.validation";
import { AssignRolePermissionsFormData } from "../validation/assignRolePermissions.validations";

export interface GetAllRolesParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: string;
  type?: string;
}

const useRolesAPIs = () => {
  // GET_ALL_ROLES
  async function getAllRoles(params: GetAllRolesParams) {
    const res = await getData<GetAllResponseI<RoleModel>>("/roles", { params });
    return res.data;
  }

  // DELETE_ROLE
  async function deleteRole(ids: number[]) {
    const res = await deleteData(`/roles`, { ids });
    if (res.status === 200) toastSuccess(i18next.t("DELETED_SUCCESS"));
  }

  // GET_ROLE
  async function getRole(id: number) {
    const res = await getData<RoleModel>(`/roles/${id}`);
    return res.data;
  }

  // EDIT_ROLE
  async function editRole(id: number, data: EditRoleFormData) {
    const res = await putData(`/roles/${id}`, data);
    if (res.status === 200) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  // ADD_ROLE
  async function addRole(data: AddRoleFormData) {
    const res = await postData(`/roles`, data);
    if (res.status === 201) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  // ASSIGN Role Permissions
  async function assignRolePermissions(
    id: number,
    data: AssignRolePermissionsFormData,
  ) {
    const res = await postData(`/roles/${id}/permissions`, data);
    if (res.status === 201) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  return {
    getAllRoles,
    deleteRole,
    getRole,
    editRole,
    addRole,
    assignRolePermissions,
  };
};

export default useRolesAPIs;
