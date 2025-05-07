import { Table as MuiTable, Paper, TableContainer } from "@mui/material";
import i18next from "i18next";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableIconButtons from "./TableIconButtons";
import TableSearchFilters from "./TableSearchFilters";
import { rolesHeadCells } from "../../data";
import TableNoData from "../../../../../shared/components/Table/TableNoData";
import { RoleModel } from "../../../../../shared/types/models/Role.model";
import { PaginationDetails } from "../../../../../api/types/response.types";
import useSelectRows from "../../../../../shared/hooks/useSelectRows";

const RolesTable = ({
  rolesData,
  paginationDetails,
}: {
  rolesData: RoleModel[];
  paginationDetails: PaginationDetails;
}) => {
  const { selected, isSelected, handleClick, handleSelectAllClick } =
    useSelectRows<RoleModel>(rolesData);

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
              rowCount={rolesData.length}
              headCells={rolesHeadCells(i18next.t)}
            />
            {/* TABLE_BODY */}
            {rolesData.length > 0 && (
              <TableBody
                data={rolesData}
                isSelected={isSelected}
                handleClick={handleClick}
                selected={selected}
              />
            )}
          </MuiTable>
        </TableContainer>

        {rolesData.length === 0 && <TableNoData />}

        {rolesData.length > 0 && (
          <TableFooter
            numOfPages={paginationDetails.numOfPages!}
            totalNumOfItems={paginationDetails.totalNumOfItems!}
          />
        )}
      </Paper>
    </>
  );
};

export default RolesTable;
