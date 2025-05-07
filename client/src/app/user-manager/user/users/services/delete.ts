import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import { toastError } from "../../../../../shared/components/Toasts";
import useUsersAPIs from "../api";
import useGetAllUsersParamsStore from "../store/useGetAllUsersParams.store";

export default function useDeleteUsers() {
  const { deleteUser } = useUsersAPIs();
  const queryClient = useQueryClient();

  const { pagination, search, sort, status, type } =
    useGetAllUsersParamsStore();

  return useMutation({
    mutationFn: (ids: number[]) => deleteUser(ids),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [
          "users",
          {
            fields: "id,email,username,type,status,phone,created_at,updated_at",
          },
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
