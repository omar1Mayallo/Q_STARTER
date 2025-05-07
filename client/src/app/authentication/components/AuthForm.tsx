import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useLangStyle } from "../../../shared/hooks/useStyle";

import LoadingButton from "../../../shared/components/Buttons/LoadingButton";

interface Props {
  isLoading: boolean;
  children: ReactNode;
  handleSubmit: () => void;
  formHead: "Sign In" | "Sign Up";
}

export default function AuthForm({
  isLoading,
  handleSubmit,
  formHead,
  children,
}: Props) {
  return (
    <Stack>
      {/* Form_Header */}
      <Stack alignItems={"center"}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {formHead}
        </Typography>
      </Stack>

      {/* Form_Body */}
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 2, gap: 3, direction: useLangStyle("rtl", "ltr") }}
      >
        {/* INPUTS */}
        {children}

        {/* Submit_Form_Button */}
        <LoadingButton
          type="submit"
          label={formHead}
          isLoading={isLoading}
          sx={{ gap: useLangStyle(1, 0) }}
        />
      </Stack>
    </Stack>
  );
}
