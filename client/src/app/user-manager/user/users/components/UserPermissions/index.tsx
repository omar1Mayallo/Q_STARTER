import i18next from "i18next";
import { useParams } from "react-router-dom";
import PageBreadcrumbs from "../../../../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import BackButton from "../../../../../../shared/components/Buttons/BackButton";
import PageHead from "../../../../../../shared/components/Head/PageHead";
import { userPermissionsBreadcrumbs } from "../../data";
import useGetUser from "../../services/getOne";
import UserPermissionsTree from "./UserPermissionsTree";
import { Alert, Box } from "@mui/material";
import PermissionsTreeSkeleton from "../../../../../../shared/components/Loaders/PermissionsTreeSkeleton";
import withPageGuard from "../../../../../../shared/components/Routes/withPageGuard";

const UserPermissions = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError, isSuccess } = useGetUser(+id!);

  return (
    <>
      <PageHead title={i18next.t("USER_PERMISSIONS")}>
        <PageBreadcrumbs
          breadcrumbs={userPermissionsBreadcrumbs(i18next.t, id!)}
        />
      </PageHead>

      <BackButton />

      <Box mt={5}>
        {isLoading ? (
          <PermissionsTreeSkeleton />
        ) : isError ? (
          <Alert severity="error" variant="outlined">
            {error.response?.data.message || i18next.t("SOMETHING_WENT_WRONG")}
          </Alert>
        ) : (
          isSuccess && <UserPermissionsTree type={data.type} />
        )}
      </Box>
    </>
  );
};

const GuardedUserPermissions = withPageGuard(
  UserPermissions,
  "users",
  "permissions",
);
export default GuardedUserPermissions;
