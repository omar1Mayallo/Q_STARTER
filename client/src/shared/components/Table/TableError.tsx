import { Paper, Typography } from "@mui/material";

const TableError = ({ message }: { message?: string }) => {
  return (
    <Paper
      className="flex flex-col items-center justify-center"
      sx={{ width: "100%", height: "500px", borderRadius: "15px" }}
    >
      <img
        src="/file-error.svg"
        alt="error"
        width={150}
        height={150}
        loading="lazy"
        className="mb-3"
      />
      <Typography fontSize={"20px"} color={(theme) => theme.palette.grey[500]}>
        {message || "Something went wrong, Please try again later"}
      </Typography>
    </Paper>
  );
};

export default TableError;
