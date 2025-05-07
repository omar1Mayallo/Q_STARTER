import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Skeleton,
  Toolbar,
  Stack,
} from "@mui/material";
import generateArrOfNum from "../../helpers/generateArrOfNum";

const TableSkeleton = ({ rows = 6, columns = 5 }) => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"end"} gap={1} my={3}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
      <Toolbar>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Toolbar>
      <Table>
        <TableBody>
          {Array.from(new Array(rows)).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              {Array.from(new Array(columns)).map((_, columnIndex) => (
                <TableCell key={columnIndex}>
                  <Skeleton variant="text" width="100%" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toolbar className="flex_between">
        <Stack
          display="flex"
          direction={"row"}
          justifyContent={"start"}
          gap={1}
        >
          <Skeleton variant="rectangular" width={80} height={40} />
          <Skeleton variant="rectangular" width={80} height={40} />
        </Stack>
        <Stack display="flex" direction={"row"} justifyContent={"end"} gap={1}>
          {generateArrOfNum(7).map((_, index) => (
            <Skeleton key={index} variant="circular" width={40} height={40} />
          ))}
        </Stack>
      </Toolbar>
    </>
  );
};

export default TableSkeleton;
