import { Stack, TextField, Toolbar } from "@mui/material";
import { useScreenSizeStyle } from "../../../../../../shared/hooks/useStyle";

import i18next from "i18next";
import useGetAllRolesParamsStore from "../../../store/useGetAllRolesParams.store";
import TablePerPageMenu from "../../../../../../shared/components/Table/TablePerPageMenu";
import TablePagination from "../../../../../../shared/components/Table/TablePagination";

const TableFooter = ({
  totalNumOfItems,
  numOfPages,
}: {
  totalNumOfItems: number;
  numOfPages: number;
}) => {
  const { pagination, handlePagination, handleChangeLimit } =
    useGetAllRolesParamsStore();
  return (
    <Toolbar
      sx={{
        display: "flex",
        flexDirection: useScreenSizeStyle("column-reverse", "row"),
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        py: 2,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={2}
        width={useScreenSizeStyle("100%", undefined)}
      >
        <TextField
          disabled
          id="outlined-disabled"
          label={i18next.t("Total")}
          value={totalNumOfItems}
          size={"small"}
          sx={{
            maxWidth: 90,
          }}
        />
        <TablePerPageMenu
          limit={pagination.limit}
          handleChangeLimit={handleChangeLimit}
        />
      </Stack>
      <TablePagination
        numOfPages={numOfPages}
        page={pagination.page}
        handlePagination={handlePagination}
      />
    </Toolbar>
  );
};

export default TableFooter;
