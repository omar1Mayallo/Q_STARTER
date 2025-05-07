import { Alert, Box } from "@mui/material";
import i18next from "i18next";
import { useParams } from "react-router-dom";
import PermissionsTreeSkeleton from "../../../../../shared/components/Loaders/PermissionsTreeSkeleton";
import { ROLE_TYPE } from "../../../../../shared/types/models/Role.model";
import PermissionsTree from "../../../permissions/components/PermissionsTree";
import {
  useGetRoleActionsById,
  useGetSystemPermissions,
} from "../../../permissions/services/permissions.service";
import useAssignRolePermissions from "../../services/assignRolePermissions";
import { AssignRolePermissionsFormData } from "../../validation/assignRolePermissions.validations";

const RolePermissionsTree = ({ type }: { type: ROLE_TYPE }) => {
  const { id } = useParams();

  const { data: permissions, ...restPermissions } =
    useGetSystemPermissions(type);
  const { data: roleActions, ...restRoleActions } = useGetRoleActionsById(+id!);

  const isLoading = restPermissions.isLoading || restRoleActions.isLoading;
  const isError = restPermissions.isError || restRoleActions.isError;
  const isSuccess = restPermissions.isSuccess || restRoleActions.isSuccess;
  const error = restPermissions.error || restRoleActions.error;

  const { mutate, isPending } = useAssignRolePermissions(+id!);
  const onSubmit = (checkedItems: string[]) => {
    const data: AssignRolePermissionsFormData = {
      actions: checkedItems,
    };
    mutate(data);
  };
  return (
    <Box mt={5}>
      {isLoading ? (
        <PermissionsTreeSkeleton />
      ) : isError ? (
        <Alert severity="error" variant="outlined">
          {error?.response?.data.message || i18next.t("SOMETHING_WENT_WRONG")}
        </Alert>
      ) : (
        isSuccess && (
          <PermissionsTree
            actions={roleActions}
            systemPermissions={permissions!}
            handleSubmit={onSubmit}
            isPending={isPending}
          />
        )
      )}
    </Box>
  );
};

export default RolePermissionsTree;
