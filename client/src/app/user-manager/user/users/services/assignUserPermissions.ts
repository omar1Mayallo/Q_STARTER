import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import catchErrors from "../../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import CACHED_KEYS from "../../../../../shared/constants/query-cached-keys";
import useUsersAPIs from "../api";
import useAssignUserPermissionsForm, {
  AssignUserPermissionsFormData,
} from "../validations/assignUserPermissions.validations";

export default function useAssignUserPermissions(id: number) {
  const { setError } = useAssignUserPermissionsForm();
  const { assignUserPermissions } = useUsersAPIs();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: AssignUserPermissionsFormData) =>
      assignUserPermissions(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CACHED_KEYS.USER_ACTIONS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [CACHED_KEYS.LOGGED_USER_ACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [CACHED_KEYS.LOGGED_USER_PERMISSIONS],
      });

      // Navigate To Users Page
      navigate("/users-management/users");
    },
    onError: (
      error: AxiosError<ResponseErrorsI<keyof AssignUserPermissionsFormData>>,
    ) => catchErrors<AssignUserPermissionsFormData>(error, setError),
  });
}
