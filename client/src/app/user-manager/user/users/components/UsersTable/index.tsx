import { Table as MuiTable, Paper, TableContainer } from "@mui/material";
import i18next from "i18next";
import { PaginationDetails } from "../../../../../../api/types/response.types";
import TableNoData from "../../../../../../shared/components/Table/TableNoData";
import useSelectRows from "../../../../../../shared/hooks/useSelectRows";
import { UserModel } from "../../../../../../shared/types/models/User.model";
import { usersHeadCells } from "../../data";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableIconButtons from "./TableIconButtons";
import TableSearchFilters from "./TableSearchFilters";

const UsersTable = ({
  usersData,
  paginationDetails,
}: {
  usersData: UserModel[];
  paginationDetails: PaginationDetails;
}) => {
  const { selected, isSelected, handleClick, handleSelectAllClick } =
    useSelectRows<UserModel>(usersData);

  return (
    <>
      {/* ACTIONS */}
      <TableIconButtons />
      <Paper sx={{ width: "100%" }}>
        {/* TABLE_SEARCH_FILTERS */}
        <TableSearchFilters
          selected={selected}
          handleSelectAllClick={handleSelectAllClick}
        />
        {/* TABLE_CONTENT */}
        <TableContainer>
          <MuiTable
            sx={{ minWidth: 750 }}
            aria-labelledby="users-table"
            size={"medium"}
          >
            {/* TABLE_HEADER */}
            <TableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={usersData.length}
              headCells={usersHeadCells(i18next.t)}
            />
            {/* TABLE_BODY */}
            {usersData.length > 0 && (
              <TableBody
                data={usersData}
                isSelected={isSelected}
                handleClick={handleClick}
                selected={selected}
              />
            )}
          </MuiTable>
        </TableContainer>

        {usersData.length === 0 && <TableNoData />}

        {usersData.length > 0 && (
          <TableFooter
            numOfPages={paginationDetails.numOfPages!}
            totalNumOfItems={paginationDetails.totalNumOfItems!}
          />
        )}
      </Paper>
    </>
  );
};

export default UsersTable;
