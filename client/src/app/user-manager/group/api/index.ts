import i18next from "i18next";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../../../api/methods";
import { GetAllResponseI } from "../../../../api/types/response.types";
import { toastSuccess } from "../../../../shared/components/Toasts";
import { GroupModel } from "../../../../shared/types/models/Group.model";
import { AddGroupFormData } from "../validation/addGroup.validation";
import { EditGroupFormData } from "../validation/editGroup.validation";

export interface GetAllGroupsParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: string;
  type?: string;
}

const useGroupsAPIs = () => {
  // GET_ALL_GROUPS
  async function getAllGroups(params: GetAllGroupsParams) {
    const res = await getData<GetAllResponseI<GroupModel>>("/groups", {
      params,
    });
    return res.data;
  }

  // DELETE_GROUP
  async function deleteGroup(ids: number[]) {
    const res = await deleteData(`/groups`, { ids });
    if (res.status === 200) toastSuccess(i18next.t("DELETED_SUCCESS"));
  }

  // GET_GROUP
  async function getGroup(id: number) {
    const res = await getData<GroupModel>(`/groups/${id}`);
    return res.data;
  }

  // EDIT_GROUP
  async function editGroup(id: number, data: EditGroupFormData) {
    const res = await putData(`/groups/${id}`, data);
    if (res.status === 200) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  // ADD_GROUP
  async function addGroup(data: AddGroupFormData) {
    const res = await postData(`/groups`, data);
    if (res.status === 201) toastSuccess(i18next.t("SAVED_SUCCESS"));
  }

  return {
    getAllGroups,
    deleteGroup,
    getGroup,
    editGroup,
    addGroup,
  };
};

export default useGroupsAPIs;
