import { Alert, Box } from "@mui/material";
import i18next from "i18next";
import PermissionsTreeSkeleton from "../../../../../../shared/components/Loaders/PermissionsTreeSkeleton";
import { USER_TYPE } from "../../../../../../shared/types/models/User.model";
import PermissionsTree from "../../../../permissions/components/PermissionsTree";
import {
  useGetSystemPermissions,
  useGetUserActionsById,
} from "../../../../permissions/services/permissions.service";
import useAssignUserPermissions from "../../services/assignUserPermissions";
import { AssignUserPermissionsFormData } from "../../validations/assignUserPermissions.validations";
import { useParams } from "react-router-dom";

const UserPermissionsTree = ({ type }: { type: USER_TYPE }) => {
  const { id } = useParams();

  const { data: permissions, ...restPermissions } =
    useGetSystemPermissions(type);
  const { data: userActions, ...restUserActions } = useGetUserActionsById(+id!);

  const isLoading = restPermissions.isLoading || restUserActions.isLoading;
  const isError = restPermissions.isError || restUserActions.isError;
  const isSuccess = restPermissions.isSuccess || restUserActions.isSuccess;
  const error = restPermissions.error || restUserActions.error;

  const { mutate, isPending } = useAssignUserPermissions(+id!);
  const onSubmit = (checkedItems: string[]) => {
    const data: AssignUserPermissionsFormData = {
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
            actions={userActions}
            systemPermissions={permissions!}
            handleSubmit={onSubmit}
            isPending={isPending}
          />
        )
      )}
    </Box>
  );
};

export default UserPermissionsTree;
