import { Box } from "@mui/material";
import { FacebookSpinner } from "./FacebookSpinner";

const FullAppLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <FacebookSpinner size={50} />
    </Box>
  );
};

export default FullAppLoading;
