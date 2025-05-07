import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ResponseErrorsI } from "../../../../api/types/response.types";
import { toastError } from "../../../../shared/components/Toasts";
import useGroupsAPIs from "../api";
import useGetAllGroupsParamsStore from "../store/useGetAllGroupsParams.store";

export default function useDeleteGroups() {
  const { deleteGroup } = useGroupsAPIs();
  const queryClient = useQueryClient();

  const { pagination, search, sort, status, type } =
    useGetAllGroupsParamsStore();

  return useMutation({
    mutationFn: (ids: number[]) => deleteGroup(ids),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [
          "groups",
          { page: pagination.page },
          { limit: pagination.limit },
          { search },
          { sort },
          { status },
          { type },
        ],
      });
    },
    onError: (error: AxiosError<ResponseErrorsI>) =>
      toastError(error.response?.data.message || error.message),
  });
}
