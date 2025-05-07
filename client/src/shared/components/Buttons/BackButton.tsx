import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import i18next from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LanguagesE } from "../../../store/language.store";

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back one level in history
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      {...(i18next.language === LanguagesE.AR
        ? { startIcon: <ArrowForward /> }
        : { startIcon: <ArrowBack /> })}
      onClick={handleBackClick}
      sx={{ gap: 0.7, "& .MuiButton-startIcon": { m: 0 } }}
    >
      {i18next.t("BACK")}
    </Button>
  );
};

export default BackButton;
