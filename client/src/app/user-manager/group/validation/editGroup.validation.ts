import * as z from "zod";
import {
  GROUP_STATUS,
  GROUP_TYPE,
} from "../../../../shared/types/models/Group.model";
import useFormValidation from "../../../../shared/hooks/useFormValidation";

// EDIT GROUP SCHEMA OBJECT
const editGroupSchema = z.object({
  name: z.string().min(5, "NAME_TOO_SHORT").max(50, "NAME_TOO_LONG"),
  description: z.string().max(400, "DESCRIPTION_TOO_LONG").optional(),
  type: z.nativeEnum(GROUP_TYPE, {
    invalid_type_error: "GROUP_TYPE_REQUIRED",
    required_error: "GROUP_TYPE_REQUIRED",
  }),
  status: z.nativeEnum(GROUP_STATUS, {
    invalid_type_error: "STATUS_REQUIRED",
    required_error: "STATUS_REQUIRED",
  }),
});

// EDIT GROUP SCHEMA OBJECT TYPE
export type EditGroupFormData = z.infer<typeof editGroupSchema>;

// EDIT GROUP FORM DATA HOOK
export default function useEditGroupForm(defaultValues: EditGroupFormData) {
  return useFormValidation<EditGroupFormData>(editGroupSchema, defaultValues);
}
