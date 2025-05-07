import { Delete, Search } from "@mui/icons-material";
import {
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import { red } from "@mui/material/colors";
import i18next from "i18next";
import { useState } from "react";
import IconButtonTooltip from "../../../../../../shared/components/Buttons/IconButtonTooltip";
import ConfirmDialog from "../../../../../../shared/components/Dialogs/ConfirmDialog";
import useDeleteRoles from "../../../services/delete";
import useGetAllRolesParamsStore from "../../../store/useGetAllRolesParams.store";
import TableFilterMenu from "./TableFilterMenu";

interface TableSearchFiltersProps {
  selected: number[];
  handleSelectAllClick: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TableSearchFilters({
  selected,
  handleSelectAllClick,
}: TableSearchFiltersProps) {
  const { search, handleSearch } = useGetAllRolesParamsStore();
  const { mutate, isPending } = useDeleteRoles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (selected.length) {
      mutate(selected, {
        onSuccess: () => {
          handleSelectAllClick();
          setIsModalOpen(false);
        },
      });
    }
  };
  return (
    <>
      <ConfirmDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        loading={isPending}
        head="Confirm Deletion"
        contentText="Are you sure you want to delete this item(s)? This action cannot be
        undone."
      />

      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {i18next.t("selectedItems", {
              ns: "labels",
              number: selected.length,
            })}
          </Typography>
        ) : (
          <TextField
            fullWidth
            type="search"
            variant="outlined"
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: {
                border: "none", // Remove borders
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the outlined border on focus
                },
              },
            }}
            placeholder={i18next.t("search", {
              ns: "labels",
            })}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        )}
        {selected.length > 0 ? (
          <IconButtonTooltip
            tooltip={i18next.t("deleteSelected", {
              ns: "labels",
            })}
            variant={red[500]}
            hover={red[700]}
            Icon={Delete}
            onClick={() => setIsModalOpen(true)}
          />
        ) : (
          <TableFilterMenu />
        )}
      </Toolbar>
    </>
  );
}
