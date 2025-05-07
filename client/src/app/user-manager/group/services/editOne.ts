import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import catchErrors from "../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import CACHED_KEYS from "../../../../shared/constants/query-cached-keys";
import useGroupsAPIs from "../api";
import useGetAllGroupsParamsStore from "../store/useGetAllGroupsParams.store";
import { EditGroupFormData } from "../validation/editGroup.validation";

export default function useEditGroup(
  id: number,
  setError: UseFormSetError<EditGroupFormData>,
) {
  const { editGroup } = useGroupsAPIs();
  const queryClient = useQueryClient();
  const { pagination, search, sort, status, type } =
    useGetAllGroupsParamsStore();

  return useMutation({
    mutationFn: (data: EditGroupFormData) => editGroup(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CACHED_KEYS.GROUP_DETAILS, id],
      });

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
    onError: (error: AxiosError<ResponseErrorsI<keyof EditGroupFormData>>) =>
      catchErrors<EditGroupFormData>(error, setError),
  });
}
