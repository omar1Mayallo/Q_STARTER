import { Box } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLangStyle } from "../../hooks/useStyle";

export type FormInputProps = {
  labelKey: string;
  isRequired?: boolean;
} & TextFieldProps;

const FormInput: React.FC<FormInputProps> = ({
  labelKey,
  isRequired = false,
  ...textFieldProps
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        component={"label"}
        color={"text.secondary"}
        display={"block"}
        mb={0.5}
      >
        <Typography component={"span"} variant="subtitle2">
          {t(labelKey)}
        </Typography>
        {isRequired && <sup>*</sup>}
      </Typography>
      <TextField
        inputProps={{ dir: useLangStyle("rtl", "ltr") }}
        FormHelperTextProps={{
          style: { textAlign: "start" },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

export default FormInput;
