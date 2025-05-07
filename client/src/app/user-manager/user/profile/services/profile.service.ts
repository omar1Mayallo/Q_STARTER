import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useUserStore from "../../../../../store/user.store";
import useProfileAPIs from "../api/profile.api";
import { UserModel } from "../../../../../shared/types/models/User.model";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import CACHED_KEYS from "../../../../../shared/constants/query-cached-keys";

export default function useGetLoggedUser() {
  const { getLoggedUser } = useProfileAPIs();
  const { token, user } = useUserStore();
  return useQuery<UserModel, AxiosError<ResponseErrorsI>>({
    queryKey: [CACHED_KEYS.LOGGED_USER],
    queryFn: () => getLoggedUser(),
    enabled: !!token, // Just trigger if user authenticated
    // staleTime: Infinity, // Consider as Fresh Forever
    placeholderData: user,
  });
}
