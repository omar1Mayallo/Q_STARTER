import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import catchErrors from "../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import CACHED_KEYS from "../../../../shared/constants/query-cached-keys";
import useRolesAPIs from "../api";
import { EditRoleFormData } from "../validation/editRole.validation";
import useGetAllRolesParamsStore from "../store/useGetAllRolesParams.store";

export default function useEditRole(
  id: number,
  setError: UseFormSetError<EditRoleFormData>,
) {
  const { editRole } = useRolesAPIs();
  const queryClient = useQueryClient();
  const { pagination, search, sort, status, type } =
    useGetAllRolesParamsStore();

  return useMutation({
    mutationFn: (data: EditRoleFormData) => editRole(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CACHED_KEYS.ROLE_DETAILS, id],
      });

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
    onError: (error: AxiosError<ResponseErrorsI<keyof EditRoleFormData>>) =>
      catchErrors<EditRoleFormData>(error, setError),
  });
}
