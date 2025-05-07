import i18next from "i18next";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../../../api/methods";
import { GetAllResponseI } from "../../../../../api/types/response.types";
import { toastSuccess } from "../../../../../shared/components/Toasts";
import { UserModel } from "../../../../../shared/types/models/User.model";
import { AssignUserPermissionsFormData } from "../validations/assignUserPermissions.validations";

export interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: string;
  type?: string;
  fields: string;
}

const useUsersAPIs = () => {
  // GET_ALL_USERS
  async function getAllUsers(params: GetAllUsersParams) {
    const res = await getData<GetAllResponseI<UserModel>>("/users", { params });
    return res.data;
  }

  // DELETE_USER
  async function deleteUser(ids: number[]) {
    const res = await deleteData(`/users`, { ids });
    if (res.status === 200) {
      toastSuccess(i18next.t("DELETED_SUCCESS"));
    }
  }

  // GET_USER
  async function getUser(id: number) {
    const res = await getData<UserModel>(`/users/${id}`);
    return res.data;
  }

  // EDIT_USER
  async function editUser(id: number, data: FormData) {
    const res = await putData(`/users/${id}`, data, true);
    if (res.status === 200) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  // ADD_USER
  async function addUser(data: FormData) {
    const res = await postData(`/users`, data, true);
    if (res.status === 200) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  // ASSIGN User Permissions
  async function assignUserPermissions(
    id: number,
    data: AssignUserPermissionsFormData,
  ) {
    const res = await postData(`/users/${id}/permissions`, data);
    if (res.status === 201) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  return {
    getAllUsers,
    deleteUser,
    getUser,
    editUser,
    addUser,
    assignUserPermissions,
  };
};

export default useUsersAPIs;
