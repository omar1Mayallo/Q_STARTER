import i18next from "i18next";
import { STATUS } from "../types/enums/status.enum";

/**
 * Represents Material UI colors.
 */
export type MuiColorsT =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

/**
 * Get the corresponding Material UI color for a given status.
 * @param {STATUS} status - The status enum value.
 * @returns {MuiColorsT} The corresponding Material UI color.
 */
export const getStatusColor = (status: string): MuiColorsT => {
  const { ACTIVE, INACTIVE } = STATUS;
  switch (status) {
    case ACTIVE:
      return "success";
    case INACTIVE:
      return "error";
    default:
      return "default";
  }
};

// TypeScript Annotations
/**
 * Translates validation errors using i18next.
 * @param translateKey - The translation key for the error messages.
 * @param restOptions - Additional options for i18next.t.
 * @returns Translated validation error message.
 */
export function translateValidationErrors(
  translateKey: string | undefined,
  restOptions?: object,
): string | undefined {
  if (translateKey) {
    return i18next.t(translateKey, {
      ns: "validations",
      ...(restOptions || {}),
    });
  } else {
    return undefined;
  }
}
