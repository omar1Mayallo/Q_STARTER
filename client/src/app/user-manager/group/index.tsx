import i18next from "i18next";
import PageBreadcrumbs from "../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import PageHead from "../../../shared/components/Head/PageHead";
import TableSkeleton from "../../../shared/components/Loaders/TableSkeleton";
import withPageGuard from "../../../shared/components/Routes/withPageGuard";
import TableError from "../../../shared/components/Table/TableError";
import GroupsTable from "./components/GroupsTable";
import { groupsBreadcrumbs } from "./data";
import useGetAllGroups from "./services/getAll";

const Groups = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetAllGroups();

  return (
    <>
      {/* PAGE_HEAD */}
      <PageHead title={i18next.t("GROUPS")}>
        <PageBreadcrumbs breadcrumbs={groupsBreadcrumbs(i18next.t)} />
      </PageHead>

      {/* TABLE */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError message={error.message} />
      ) : (
        isSuccess && (
          <GroupsTable
            groupsData={data.data}
            paginationDetails={data.paginationDetails}
          />
        )
      )}
    </>
  );
};

const GuardedGroups = withPageGuard(Groups, "roles");
export default GuardedGroups;
