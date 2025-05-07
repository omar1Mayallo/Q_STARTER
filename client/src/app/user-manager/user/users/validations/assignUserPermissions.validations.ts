import * as z from "zod";
import useFormValidation from "../../../../../shared/hooks/useFormValidation";

// ASSIGN USER PERMISSIONS SCHEMA OBJECT
const assignUserPermissionsSchema = z.object({
  actions: z
    .array(z.string(), {
      required_error: "ARRAY_MUST_BE_ARRAY",
      invalid_type_error: "ARRAY_MUST_BE_ARRAY",
    })
    .optional()
    .default([]),
});

// ASSIGN USER PERMISSIONS SCHEMA OBJECT TYPE
export type AssignUserPermissionsFormData = z.infer<
  typeof assignUserPermissionsSchema
>;

// ASSIGN USER PERMISSIONS FORM DATA HOOK
export default function useAssignUserPermissionsForm() {
  return useFormValidation<AssignUserPermissionsFormData>(
    assignUserPermissionsSchema,
  );
}
