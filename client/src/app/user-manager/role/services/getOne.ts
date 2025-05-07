import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import CACHED_KEYS from "../../../../shared/constants/query-cached-keys";
import { RoleModel } from "../../../../shared/types/models/Role.model";
import useRolesAPIs from "../api";
import { ResponseErrorsI } from "../../../../api/types/response.types";

export default function useGetRole(id: number) {
  const { getRole } = useRolesAPIs();
  return useQuery<RoleModel, AxiosError<ResponseErrorsI>>({
    queryKey: [CACHED_KEYS.ROLE_DETAILS, id],
    queryFn: () => getRole(id),
  });
}
