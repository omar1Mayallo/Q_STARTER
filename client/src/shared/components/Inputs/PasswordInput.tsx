import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import FormInput from "./FormInput";
import { useState } from "react";

export type PasswordProps = {
  labelKey: string;
  isRequired?: boolean;
} & TextFieldProps;

const PasswordInput = ({
  labelKey,
  isRequired = false,
  ...textFieldProps
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <FormInput
      labelKey={labelKey}
      isRequired={isRequired}
      type={showPassword ? "text" : "password"}
      autoComplete="new-password" // Just To Prevent google auto fill
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...textFieldProps}
    />
  );
};

export default PasswordInput;
