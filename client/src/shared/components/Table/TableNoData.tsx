import { Stack, Typography } from "@mui/material";

const TableNoData = () => {
  return (
    <Stack height={"400px"} alignItems={"center"} justifyContent={"center"}>
      <img
        src="/no-files.svg"
        alt="no-data"
        width={150}
        height={150}
        loading="lazy"
        className="mb-3"
      />
      <Typography fontSize={"20px"} color={(theme) => theme.palette.grey[500]}>
        Data Not Found
      </Typography>
    </Stack>
  );
};

export default TableNoData;
