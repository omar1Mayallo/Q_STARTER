import LanguageIcon from "@mui/icons-material/Language";
import { IconButton, Tooltip } from "@mui/material";
import { useLangStore } from "../../../../store/language.store";
import { useTranslation } from "react-i18next";

const LangIcon = () => {
  const toggleLang = useLangStore((s) => s.toggleLang);
  const { t } = useTranslation(["layout"]);

  return (
    <Tooltip title={t("SWITCH_LANG")}>
      <IconButton
        aria-label="Change Language"
        onClick={toggleLang}
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LangIcon;
