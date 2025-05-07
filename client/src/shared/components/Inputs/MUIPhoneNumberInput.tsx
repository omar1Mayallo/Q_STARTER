import { Box, TextFieldProps, Typography } from "@mui/material";
import { MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import React from "react";
import { useTranslation } from "react-i18next";
import { LanguagesE } from "../../../store/language.store";
import i18next from "i18next";
import { useLangStyle } from "../../hooks/useStyle";

type MUIPhoneNumberInputProps = {
  labelKey: string;
  value?: string;
  handleChange: (newPhone: string, info: MuiTelInputInfo) => void;
  isRequired?: boolean;
} & TextFieldProps;

const MUIPhoneNumberInput: React.FC<MUIPhoneNumberInputProps> = ({
  labelKey,
  value,
  handleChange,
  isRequired = false,
  ...textFieldProps
}) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...restTextFieldProps } = textFieldProps;

  // !NOTE This if you need to get the user country code based on his DeviceIP address
  // const [defaultCountryCode, setDefaultCountryCode] = useState("");
  // useEffect(() => {
  //   const getCountryCodeFromIP = async () => {
  //     const response = await fetch("https://ipapi.co/json/");
  //     const data = await response.json();
  //     setDefaultCountryCode(data.country_code);
  //   };
  //   getCountryCodeFromIP();
  // }, []);

  return (
    <Box>
      <Typography
        component="label"
        color="text.secondary"
        display="block"
        mb={0.5}
      >
        <Typography component="span" variant="subtitle2">
          {t(labelKey)}
        </Typography>
        {isRequired && <sup>*</sup>}
      </Typography>
      <MuiTelInput
        value={value}
        onChange={handleChange}
        fullWidth
        FormHelperTextProps={{
          style: { textAlign: "start" },
        }}
        langOfCountryName={
          i18next.language === "ar" ? LanguagesE.AR : LanguagesE.EN
        }
        sx={{
          "& .MuiInputBase-input": { textAlign: useLangStyle("end", "start") },
        }}
        {...restTextFieldProps}
      />
    </Box>
  );
};

export default MUIPhoneNumberInput;
