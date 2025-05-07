import i18next from "i18next";
import PageBreadcrumbs from "../../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import PageHead from "../../../../shared/components/Head/PageHead";
import TableSkeleton from "../../../../shared/components/Loaders/TableSkeleton";
import TableError from "../../../../shared/components/Table/TableError";
import UsersTable from "./components/UsersTable";
import { userBreadcrumbs } from "./data";
import useGetAllUsers from "./services/getAll";
import withPageGuard from "../../../../shared/components/Routes/withPageGuard";

const Users = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetAllUsers();

  return (
    <>
      {/* PAGE_HEAD */}
      <PageHead title={i18next.t("USERS")}>
        <PageBreadcrumbs breadcrumbs={userBreadcrumbs(i18next.t)} />
      </PageHead>

      {/* TABLE */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError message={error.message} />
      ) : (
        isSuccess && (
          <UsersTable
            usersData={data.data}
            paginationDetails={data.paginationDetails}
          />
        )
      )}
    </>
  );
};

const GuardedUsers = withPageGuard(Users, "users");
export default GuardedUsers;
