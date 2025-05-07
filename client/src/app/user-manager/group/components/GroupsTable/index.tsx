import { Table as MuiTable, Paper, TableContainer } from "@mui/material";
import i18next from "i18next";
import { PaginationDetails } from "../../../../../api/types/response.types";
import TableNoData from "../../../../../shared/components/Table/TableNoData";
import useSelectRows from "../../../../../shared/hooks/useSelectRows";
import { GroupModel } from "../../../../../shared/types/models/Group.model";
import { groupsHeadCells } from "../../data";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableIconButtons from "./TableIconButtons";
import TableSearchFilters from "./TableSearchFilters";

const GroupsTable = ({
  groupsData,
  paginationDetails,
}: {
  groupsData: GroupModel[];
  paginationDetails: PaginationDetails;
}) => {
  const { selected, isSelected, handleClick, handleSelectAllClick } =
    useSelectRows<GroupModel>(groupsData);

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
            aria-labelledby="groups-table"
            size={"medium"}
          >
            {/* TABLE_HEADER */}
            <TableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={groupsData.length}
              headCells={groupsHeadCells(i18next.t)}
            />
            {/* TABLE_BODY */}
            {groupsData.length > 0 && (
              <TableBody
                data={groupsData}
                isSelected={isSelected}
                handleClick={handleClick}
                selected={selected}
              />
            )}
          </MuiTable>
        </TableContainer>

        {groupsData.length === 0 && <TableNoData />}

        {groupsData.length > 0 && (
          <TableFooter
            numOfPages={paginationDetails.numOfPages!}
            totalNumOfItems={paginationDetails.totalNumOfItems!}
          />
        )}
      </Paper>
    </>
  );
};

export default GroupsTable;
