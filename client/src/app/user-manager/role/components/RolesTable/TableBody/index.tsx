import {
  Checkbox,
  Chip,
  TableBody as MUITableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../../../../shared/components/Dialogs/ConfirmDialog";
import TableRowActions from "../../../../../../shared/components/Table/TableRowActions";
import TextTooltip from "../../../../../../shared/components/Tooltips/TextTooltip";
import { isEmpty } from "../../../../../../shared/helpers/checks";
import { getStatusColor } from "../../../../../../shared/helpers/factory";
import { formatToRegularString } from "../../../../../../shared/helpers/formats";
import { RoleModel } from "../../../../../../shared/types/models/Role.model";
import useDeleteRoles from "../../../services/delete";
import EditRole from "../../EditRole";
import useFactoryActions from "../../../../../../shared/hooks/useFactoryActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetRoleActionsById } from "../../../../permissions/services/permissions.service";

interface TableBodyProps {
  data: RoleModel[];
  isSelected: (id: number) => boolean;
  handleClick: (id: number) => void;
  selected: number[];
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  isSelected,
  handleClick,
  selected,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending } = useDeleteRoles();
  const [selectedRowId, setSelectedRowId] = useState<number>();
  const [formState, setFormState] = useState<RoleModel>();
  useEffect(() => {
    if (selectedRowId) {
      setFormState(data.find((item) => item.id === selectedRowId));
    }
  }, [data, selectedRowId]);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (selectedRowId) {
      mutate([selectedRowId], {
        onSuccess: () => {
          setIsConfirmDeleteModalOpen(false);
        },
      });
    }
  };

  const userActionHandlers: { [key: string]: (id: number) => void } = {
    update: (id: number) => {
      setSelectedRowId(id);
      setIsEditModalOpen(true);
    },
    delete: (id: number) => {
      setSelectedRowId(id);
      setIsConfirmDeleteModalOpen(true);
    },
    permissions: (id: number) =>
      navigate(`${location.pathname}/${id}/permissions`),
  };

  const { actionsItems, isHaveNotDeleteAction } = useFactoryActions(
    userActionHandlers,
    "roles",
  );

  const { data: roleActions } = useGetRoleActionsById(+selectedRowId!);

  return (
    <>
      {/* DELETE_CONFIRMATION_DIALOG */}
      <ConfirmDialog
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={isPending}
        head="Confirm Deletion"
        contentText="Are you sure you want to delete this item(s)? This action cannot be
        undone."
      />

      {/* EDIT_DIALOG */}
      {selectedRowId && (
        <EditRole
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setFormState(undefined);
          }}
          selectedRowId={selectedRowId}
          formState={formState!}
          disableType={!!roleActions?.length}
        />
      )}

      <MUITableBody>
        {data.map((row) => {
          const isItemSelected = isSelected(row.id);
          return (
            <TableRow
              hover
              // onClick={() => handleClick(row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              sx={{ cursor: "pointer" }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={() => handleClick(row.id)}
                  disabled={isHaveNotDeleteAction}
                />
              </TableCell>
              <TableCell
                component="th"
                id={`${row.id}`}
                scope="row"
                align="center"
              >
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">
                <TextTooltip text={row.description || "---"} />
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={formatToRegularString(row.status)}
                  color={getStatusColor(row.status)}
                  size="small"
                  variant="filled"
                />
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={formatToRegularString(row.type)}
                  color={"default"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">{`${row.created_at}`}</TableCell>
              {isEmpty(actionsItems) || (
                <TableCell align="center">
                  <TableRowActions
                    actionsItems={actionsItems!}
                    id={row.id}
                    selected={selected}
                  />
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </MUITableBody>
    </>
  );
};

export default TableBody;
