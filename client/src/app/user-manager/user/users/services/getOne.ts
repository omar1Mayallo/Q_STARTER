import { useQuery } from "@tanstack/react-query";
import useUsersAPIs from "../api";
import { UserModel } from "../../../../../shared/types/models/User.model";
import { AxiosError } from "axios";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import CACHED_KEYS from "../../../../../shared/constants/query-cached-keys";

export default function useGetUser(id: number) {
  const { getUser } = useUsersAPIs();
  return useQuery<UserModel, AxiosError<ResponseErrorsI>>({
    queryKey: [CACHED_KEYS.USER_DETAILS, id],
    queryFn: () => getUser(id),
  });
}
