import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import i18next from "i18next";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
  label: string;
  isLoading: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  isLoading,
  loadingText: loadingTextProp,
  ...buttonProps
}) => {
  const loadingText = loadingTextProp || i18next.t("loading");

  return (
    <Button
      variant="contained"
      fullWidth
      disabled={isLoading}
      endIcon={isLoading && <CircularProgress size={15} color="inherit" />}
      {...buttonProps}
    >
      {isLoading ? loadingText : label}
    </Button>
  );
};

export default LoadingButton;
