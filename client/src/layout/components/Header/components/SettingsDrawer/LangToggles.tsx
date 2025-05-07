import { Box, Button } from "@mui/material";
import { LanguagesE, useLangStore } from "../../../../../store/language.store";
import { useTranslation } from "react-i18next";
import { useLangStyle } from "../../../../../shared/hooks/useStyle";

const LanguageToggles = () => {
  const { setLang } = useLangStore();
  const { t } = useTranslation(["layout"]);

  const handleToggleLang = (nextLang: LanguagesE) => {
    setLang(nextLang);
  };

  return (
    <Box className="flex">
      <Button
        sx={{
          borderRadius: useLangStyle("0px 5px 5px 0px", "5px 0px 0px 5px"),
        }}
        fullWidth
        onClick={() => handleToggleLang(LanguagesE.EN)}
        variant={useLangStyle("outlined", "contained")}
      >
        {t("ENGLISH_LANG")}
      </Button>
      <Button
        sx={{
          borderRadius: useLangStyle("5px 0px 0px 5px", "0px 5px 5px 0px"),
        }}
        fullWidth
        onClick={() => handleToggleLang(LanguagesE.AR)}
        variant={useLangStyle("contained", "outlined")}
      >
        {t("ARABIC_LANG")}
      </Button>
    </Box>
  );
};
export default LanguageToggles;
