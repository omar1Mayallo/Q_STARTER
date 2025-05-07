import { DialogActions, Button } from "@mui/material";
import React, { ReactNode } from "react";
import i18next from "i18next";
import { useLangStyle } from "../../../hooks/useStyle";

interface DialogFooterProps {
  onClose: () => void;
  children?: ReactNode;
}

const DialogFooter: React.FC<DialogFooterProps> = ({ onClose, children }) => {
  return (
    <DialogActions
      sx={{
        px: 3,
        py: 2,
        justifyContent: "space-between",
        flexDirection: useLangStyle("row-reverse", "row"),
      }}
    >
      <Button variant="contained" color="error" onClick={onClose}>
        {i18next.t("BACK")}
      </Button>
      {children}
    </DialogActions>
  );
};

export default DialogFooter;
