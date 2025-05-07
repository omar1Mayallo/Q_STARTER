import { Alert, Box } from "@mui/material";
import i18next from "i18next";
import { useParams } from "react-router-dom";
import useGetRole from "../../services/getOne";
import PageHead from "../../../../../shared/components/Head/PageHead";
import PageBreadcrumbs from "../../../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import { rolePermissionsBreadcrumbs } from "../../data";
import BackButton from "../../../../../shared/components/Buttons/BackButton";
import PermissionsTreeSkeleton from "../../../../../shared/components/Loaders/PermissionsTreeSkeleton";
import RolePermissionsTree from "./RolePermissionsTree";
import withPageGuard from "../../../../../shared/components/Routes/withPageGuard";

const RolePermissions = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError, isSuccess } = useGetRole(+id!);

  return (
    <>
      <PageHead title={i18next.t("ROLE_PERMISSIONS")}>
        <PageBreadcrumbs
          breadcrumbs={rolePermissionsBreadcrumbs(i18next.t, id!)}
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
          isSuccess && <RolePermissionsTree type={data.type} />
        )}
      </Box>
    </>
  );
};

const GuardedRolePermissions = withPageGuard(
  RolePermissions,
  "roles",
  "permissions",
);
export default GuardedRolePermissions;
