import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetAllResponseI,
  ResponseErrorsI,
} from "../../../../api/types/response.types";
import { RoleModel } from "../../../../shared/types/models/Role.model";
import useRolesAPIs from "../api";
import useGetAllRolesParamsStore from "../store/useGetAllRolesParams.store";

export default function useGetAllRoles() {
  const { getAllRoles } = useRolesAPIs();

  const { pagination, search, sort, status, type } =
    useGetAllRolesParamsStore();

  return useQuery<GetAllResponseI<RoleModel>, AxiosError<ResponseErrorsI>>({
    queryKey: [
      "roles",
      { page: pagination.page },
      { limit: pagination.limit },
      { search },
      { sort },
      { status },
      { type },
    ],
    queryFn: () =>
      getAllRoles({
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
