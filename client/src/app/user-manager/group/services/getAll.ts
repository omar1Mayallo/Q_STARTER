import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetAllResponseI,
  ResponseErrorsI,
} from "../../../../api/types/response.types";
import { GroupModel } from "../../../../shared/types/models/Group.model";
import useGroupsAPIs from "../api";
import useGetAllGroupsParamsStore from "../store/useGetAllGroupsParams.store";

export default function useGetAllGroups() {
  const { getAllGroups } = useGroupsAPIs();

  const { pagination, search, sort, status, type } =
    useGetAllGroupsParamsStore();

  return useQuery<GetAllResponseI<GroupModel>, AxiosError<ResponseErrorsI>>({
    queryKey: [
      "groups",
      { page: pagination.page },
      { limit: pagination.limit },
      { search },
      { sort },
      { status },
      { type },
    ],
    queryFn: () =>
      getAllGroups({
        page: pagination.page,
        limit: pagination.limit,
        ...(search && { search: `[name,description]:${search}` }),
        ...(sort && { sort }),
        ...(status && { status }),
        ...(type && { type }),
      }),
    placeholderData: keepPreviousData,
  });
}
