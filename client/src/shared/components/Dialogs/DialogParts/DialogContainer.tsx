import { Dialog, DialogProps } from "@mui/material";
import React from "react";
import DialogHeader from "./DialogHeader"; // Adjust the import path as needed
import { useLangStyle } from "../../../hooks/useStyle";

interface DialogContainerProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  head: string;
  children: React.ReactNode;
}

const DialogContainer: React.FC<DialogContainerProps> = ({
  open,
  onClose,
  head,
  children,
  ...restProps
}) => {
  return (
    <Dialog
      dir={useLangStyle("rtl", "ltr")}
      open={open}
      onClose={onClose}
      {...restProps}
    >
      <DialogHeader head={head} onClose={onClose} />
      {children}
    </Dialog>
  );
};

export default DialogContainer;
