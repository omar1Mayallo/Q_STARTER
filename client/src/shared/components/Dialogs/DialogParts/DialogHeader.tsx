import { Close } from "@mui/icons-material";
import { DialogTitle, DialogTitleTypeMap, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";

interface DialogHeaderProps
  extends Omit<DialogTitleTypeMap["props"], "children"> {
  head: string;
  onClose: () => void;
}

const DialogHeader: React.FC<PropsWithChildren<DialogHeaderProps>> = ({
  head,
  onClose,
  ...restProps
}) => {
  return (
    <DialogTitle
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      id="scroll-dialog-title"
      {...restProps}
    >
      {head}
      <IconButton
        onClick={onClose}
        sx={{
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  );
};

export default DialogHeader;
