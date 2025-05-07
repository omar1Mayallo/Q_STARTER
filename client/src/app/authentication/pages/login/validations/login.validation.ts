import * as z from "zod";
import { PASSWORD_REGEX } from "../../../../../shared/constants/regex";
import { translateValidationErrors } from "../../../../../shared/helpers/factory";
import useFormValidation from "../../../../../shared/hooks/useFormValidation";

// LOGIN SCHEMA OBJECT
const loginSchema = z.object({
  email: z
    .string()
    .min(1, translateValidationErrors("EMAIL_REQUIRED"))
    .email(translateValidationErrors("INVALID_EMAIL")),
  password: z
    .string()
    .min(1, translateValidationErrors("PASSWORD_REQUIRED"))
    .regex(PASSWORD_REGEX, translateValidationErrors("PASSWORD_REGEX")),
});

// LOGIN SCHEMA OBJECT TYPE
export type LoginFormData = z.infer<typeof loginSchema>;

// LOGIN FORM DATA HOOK
export default function useLoginFormData() {
  return useFormValidation<LoginFormData>(loginSchema);
}
