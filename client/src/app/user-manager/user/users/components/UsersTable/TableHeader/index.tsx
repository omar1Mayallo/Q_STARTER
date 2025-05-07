import {
  Checkbox,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Key } from "react";
import SortIcons from "../../../../../../../shared/components/Icons/SortIcons";
import useUserActions from "../../../../../../../shared/hooks/useUserActions";
import { TableHeadCell } from "../../../../../../../shared/types/Interfaces/TableCellHead.interface";
import { UserModel } from "../../../../../../../shared/types/models/User.model";
import useGetAllUsersParamsStore from "../../../store/useGetAllUsersParams.store";
import { useLangStyle } from "../../../../../../../shared/hooks/useStyle";
import { isEmpty } from "../../../../../../../shared/helpers/checks";

export interface TableHeaderProps {
  headCells: TableHeadCell<UserModel>[];
  rowCount: number;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TableHeader({
  headCells,
  numSelected,
  rowCount,
  onSelectAllClick,
}: TableHeaderProps) {
  const { sort, handleSort } = useGetAllUsersParamsStore();
  const { tableActions, isHaveNotDeleteAction } = useUserActions("users");

  const cellDir = useLangStyle("ltr", "rtl");
  return (
    <MuiTableHead>
      <TableRow>
        {/* SELECT_ALL_CHECKBOX */}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            disabled={isHaveNotDeleteAction}
          />
        </TableCell>

        {/* REST_TABLES_HEAD_CELLS */}
        {headCells.map((headCell) => {
          if (isEmpty(tableActions) && headCell.id === "actions") {
            return null;
          }
          return (
            <TableCell
              key={headCell.id as Key}
              align={headCell.numeric ? "center" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              dir={cellDir}
            >
              <TableSortLabel
                active={sort.replace(/-/g, "") === headCell.id}
                onClick={() => handleSort(headCell.id as string)}
                disabled={!headCell.sortable}
                IconComponent={() =>
                  headCell.sortable ? (
                    <SortIcons
                      activeAsc={!sort.startsWith("-")}
                      activeDesc={sort.startsWith("-")}
                      disabled={sort.replace(/-/g, "") !== headCell.id}
                    />
                  ) : (
                    <></>
                  )
                }
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
}
