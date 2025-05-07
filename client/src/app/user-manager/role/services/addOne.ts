import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import catchErrors from "../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import useRolesAPIs from "../api";
import useGetAllRolesParamsStore from "../store/useGetAllRolesParams.store";
import { AddRoleFormData } from "../validation/addRole.validation";

export default function useAddRole(setError: UseFormSetError<AddRoleFormData>) {
  const { addRole } = useRolesAPIs();
  const queryClient = useQueryClient();
  const { pagination, search, sort, status, type } =
    useGetAllRolesParamsStore();

  return useMutation({
    mutationFn: (data: AddRoleFormData) => addRole(data),
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
    onError: (error: AxiosError<ResponseErrorsI<keyof AddRoleFormData>>) =>
      catchErrors<AddRoleFormData>(error, setError),
  });
}
