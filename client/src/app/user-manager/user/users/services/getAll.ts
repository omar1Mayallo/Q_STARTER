import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetAllResponseI,
  ResponseErrorsI,
} from "../../../../../api/types/response.types";
import { UserModel } from "../../../../../shared/types/models/User.model";
import useUsersAPIs from "../api";
import useGetAllUsersParamsStore from "../store/useGetAllUsersParams.store";

export default function useGetAllUsers() {
  const { getAllUsers } = useUsersAPIs();

  const { pagination, search, sort, status, type } =
    useGetAllUsersParamsStore();

  return useQuery<GetAllResponseI<UserModel>, AxiosError<ResponseErrorsI>>({
    queryKey: [
      "users",
      { fields: "id,email,username,type,status,phone,created_at,updated_at" },
      { page: pagination.page },
      { limit: pagination.limit },
      { search },
      { sort },
      { status },
      { type },
    ],
    queryFn: () =>
      getAllUsers({
        fields: "id,email,username,type,status,phone,created_at,updated_at",
        page: pagination.page,
        limit: pagination.limit,
        ...(search && { search: `[username,email]:${search}` }),
        ...(sort && { sort }),
        ...(status && { status }),
        ...(type && { type }),
      }),
    placeholderData: keepPreviousData,
  });
}
