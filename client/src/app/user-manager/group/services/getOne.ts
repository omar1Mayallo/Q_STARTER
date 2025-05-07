import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import CACHED_KEYS from "../../../../shared/constants/query-cached-keys";
import { GroupModel } from "../../../../shared/types/models/Group.model";
import useGroupsAPIs from "../api";

export default function useGetGroup(id: number) {
  const { getGroup } = useGroupsAPIs();
  return useQuery<GroupModel, AxiosError<ResponseErrorsI>>({
    queryKey: [CACHED_KEYS.GROUP_DETAILS, id],
    queryFn: () => getGroup(id),
  });
}
