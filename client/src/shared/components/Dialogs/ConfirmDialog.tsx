import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import i18next from "i18next";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  head: string;
  contentText: string;
  btnText?: string;
  btnColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  head,
  contentText,
  btnText = i18next.t("CONFIRM"),
  btnColor = "primary",
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{head}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={onClose}
          color="error"
          variant="contained"
        >
          {i18next.t("BACK")}
        </Button>
        <Button
          onClick={onConfirm}
          color={btnColor}
          variant="contained"
          disabled={loading}
          sx={{ gap: 1 }}
        >
          {loading && <CircularProgress size={18} color="inherit" />}
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
