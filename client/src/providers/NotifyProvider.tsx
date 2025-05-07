import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { SnackbarProvider, closeSnackbar } from "notistack";

const NotifyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <SnackbarProvider
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
    preventDuplicate
    autoHideDuration={3000}
    maxSnack={3}
    action={(snackbarId) => (
      <IconButton
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        <CloseIcon sx={{ color: "white" }} />
      </IconButton>
    )}
  >
    {children}
  </SnackbarProvider>
);

export default NotifyProvider;
