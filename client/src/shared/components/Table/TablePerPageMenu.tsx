import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import i18next from "i18next";

const TablePerPageMenu = ({
  limit,
  handleChangeLimit,
}: {
  limit: number;
  handleChangeLimit: (limit: number) => void;
}) => {
  return (
    <FormControl size="small" sx={{ minWidth: 90 }}>
      <InputLabel id="demo-simple-select-helper-label">
        {i18next.t("PerPage")}
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label={i18next.t("PerPage")}
        value={limit}
        onChange={(e) => {
          handleChangeLimit(+e.target.value);
        }}
        autoWidth
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TablePerPageMenu;
