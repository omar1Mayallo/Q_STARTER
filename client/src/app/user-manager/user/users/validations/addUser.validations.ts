import * as z from "zod";
import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../../../../../shared/constants/regex";
import useFormValidation from "../../../../../shared/hooks/useFormValidation";
import {
  USER_STATUS,
  USER_TYPE,
} from "../../../../../shared/types/models/User.model";
import zodPhoneNumber from "../../../../../shared/utils/validations/zodPhoneNumber";

// ADD USER SCHEMA OBJECT
const addUserSchema = z
  .object({
    username: z
      .string()
      .min(1, "USERNAME_REQUIRED")
      .regex(USERNAME_REGEX, "USERNAME_REGEX"),
    email: z.string().min(1, "EMAIL_REQUIRED").email("INVALID_EMAIL"),
    password: z
      .string()
      .min(1, "PASSWORD_REQUIRED")
      .regex(PASSWORD_REGEX, "PASSWORD_REGEX"),
    confirmPassword: z.string().min(1, "CONFIRM_PASSWORD_REQUIRED"),
    phone: zodPhoneNumber({
      optional: false,
      message: "INVALID_PHONE",
    }),
    status: z
      .nativeEnum(USER_STATUS, {
        invalid_type_error: "STATUS_REQUIRED",
      })
      .default(USER_STATUS.INACTIVE),
    type: z.nativeEnum(USER_TYPE, {
      invalid_type_error: "USER_TYPE_REQUIRED",
      required_error: "USER_TYPE_REQUIRED",
    }),
    login_with_otp: z.boolean().optional().default(false),
    avatar: z.instanceof(File, {
      message: "AVATAR_REQUIRED",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "PASSWORDS_NOT_MATCHES",
  });

// ADD USER SCHEMA OBJECT TYPE
export type AddUserFormData = z.infer<typeof addUserSchema>;

// ADD USER FORM DATA HOOK
export default function useAddUserForm() {
  return useFormValidation<AddUserFormData>(addUserSchema);
}
