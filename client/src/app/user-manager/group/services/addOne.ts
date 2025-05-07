import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import catchErrors from "../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import useGroupsAPIs from "../api";
import useGetAllGroupsParamsStore from "../store/useGetAllGroupsParams.store";
import { AddGroupFormData } from "../validation/addGroup.validation";

export default function useAddGroup(
  setError: UseFormSetError<AddGroupFormData>,
) {
  const { addGroup } = useGroupsAPIs();
  const queryClient = useQueryClient();
  const { pagination, search, sort, status, type } =
    useGetAllGroupsParamsStore();

  return useMutation({
    mutationFn: (data: AddGroupFormData) => addGroup(data),
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
    onError: (error: AxiosError<ResponseErrorsI<keyof AddGroupFormData>>) =>
      catchErrors<AddGroupFormData>(error, setError),
  });
}
