import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useRolesAPIs from "../api";
import useGetAllRolesParamsStore from "../store/useGetAllRolesParams.store";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import { toastError } from "../../../../shared/components/Toasts";

export default function useDeleteRoles() {
  const { deleteRole } = useRolesAPIs();
  const queryClient = useQueryClient();

  const { pagination, search, sort, status, type } =
    useGetAllRolesParamsStore();

  return useMutation({
    mutationFn: (ids: number[]) => deleteRole(ids),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [
          "roles",
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
