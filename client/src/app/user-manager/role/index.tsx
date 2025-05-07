import i18next from "i18next";
import PageHead from "../../../shared/components/Head/PageHead";
import PageBreadcrumbs from "../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import { rolesBreadcrumbs } from "./data";
import withPageGuard from "../../../shared/components/Routes/withPageGuard";
import useGetAllRoles from "./services/getAll";
import TableSkeleton from "../../../shared/components/Loaders/TableSkeleton";
import TableError from "../../../shared/components/Table/TableError";
import RolesTable from "./components/RolesTable";

const Roles = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetAllRoles();

  return (
    <>
      {/* PAGE_HEAD */}
      <PageHead title={i18next.t("ROLES")}>
        <PageBreadcrumbs breadcrumbs={rolesBreadcrumbs(i18next.t)} />
      </PageHead>

      {/* TABLE */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError message={error.message} />
      ) : (
        isSuccess && (
          <RolesTable
            rolesData={data.data}
            paginationDetails={data.paginationDetails}
          />
        )
      )}
    </>
  );
};

const GuardedRoles = withPageGuard(Roles, "roles");
export default GuardedRoles;
