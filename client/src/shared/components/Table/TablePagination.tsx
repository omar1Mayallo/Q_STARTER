import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useLangStyle, useScreenSizeStyle } from "../../hooks/useStyle";

export default function TablePagination({
  numOfPages,
  page,
  handlePagination,
}: {
  numOfPages: number;
  page: number;
  handlePagination: (page: number) => void;
}) {
  return (
    <Pagination
      sx={{
        "& .MuiPagination-ul": {
          flexDirection: useLangStyle("row-reverse", "row"),
        },
      }}
      page={page}
      count={numOfPages}
      variant="outlined"
      color="primary"
      size={useScreenSizeStyle("large", "small", "down", "sm")}
      showFirstButton
      showLastButton
      siblingCount={useScreenSizeStyle(0, 1)}
      boundaryCount={useScreenSizeStyle(2, 1, "down", "sm")}
      renderItem={({ onClick, ...item }) => (
        <PaginationItem
          component="span"
          onClick={(e) => {
            onClick(e);
            handlePagination(item.page!);
          }}
          {...item}
        />
      )}
    />
  );
}
