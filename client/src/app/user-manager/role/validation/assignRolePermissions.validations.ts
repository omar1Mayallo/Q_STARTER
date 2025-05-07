import * as z from "zod";
import useFormValidation from "../../../../shared/hooks/useFormValidation";

// ASSIGN ROLE PERMISSIONS SCHEMA OBJECT
const assignRolePermissionsSchema = z.object({
  actions: z
    .array(z.string(), {
      required_error: "ARRAY_MUST_BE_ARRAY",
      invalid_type_error: "ARRAY_MUST_BE_ARRAY",
    })
    .optional()
    .default([]),
});

// ASSIGN ROLE PERMISSIONS SCHEMA OBJECT TYPE
export type AssignRolePermissionsFormData = z.infer<
  typeof assignRolePermissionsSchema
>;

// ASSIGN ROLE PERMISSIONS FORM DATA HOOK
export default function useAssignUserPermissionsForm() {
  return useFormValidation<AssignRolePermissionsFormData>(
    assignRolePermissionsSchema,
  );
}
