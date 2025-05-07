import * as z from "zod";
import { USERNAME_REGEX } from "../../../../../shared/constants/regex";
import useFormValidation from "../../../../../shared/hooks/useFormValidation";
import {
  USER_STATUS,
  USER_TYPE,
  UserModel,
} from "../../../../../shared/types/models/User.model";
import zodPhoneNumber from "../../../../../shared/utils/validations/zodPhoneNumber";

// EDIT USER SCHEMA OBJECT
const editUserSchema = z.object({
  username: z
    .string()
    .min(1, "USERNAME_REQUIRED")
    .regex(USERNAME_REGEX, "USERNAME_REGEX"),
  email: z.string().min(1, "EMAIL_REQUIRED").email("INVALID_EMAIL"),
  phone: zodPhoneNumber({
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
  avatar: z.any(),
});

// EDIT USER SCHEMA OBJECT TYPE
export type EditUserFormData = z.infer<typeof editUserSchema>;

// EDIT USER FORM DATA HOOK
export default function useEditUserForm(defaultValues: UserModel) {
  return useFormValidation<EditUserFormData>(editUserSchema, defaultValues);
}
