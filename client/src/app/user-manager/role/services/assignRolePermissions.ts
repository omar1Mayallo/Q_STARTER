import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import catchErrors from "../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import useRolesAPIs from "../api";
import useAssignUserPermissionsForm, {
  AssignRolePermissionsFormData,
} from "../validation/assignRolePermissions.validations";
import CACHED_KEYS from "../../../../shared/constants/query-cached-keys";

export default function useAssignRolePermissions(id: number) {
  const { setError } = useAssignUserPermissionsForm();
  const { assignRolePermissions } = useRolesAPIs();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: AssignRolePermissionsFormData) =>
      assignRolePermissions(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [CACHED_KEYS.ROLE_ACTIONS, id],
      });

      // Navigate To Roles Page
      navigate("/users-management/roles");
    },
    onError: (
      error: AxiosError<ResponseErrorsI<keyof AssignRolePermissionsFormData>>,
    ) => catchErrors<AssignRolePermissionsFormData>(error, setError),
  });
}
