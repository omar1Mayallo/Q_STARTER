import i18next from "i18next";
import { enqueueSnackbar } from "notistack";

type ToastErrorFunction = (message?: string) => void;

/**
 * Displays a success toast notification.
 *
 * @param {string} [message=i18next.t("SAVED_SUCCESS")] The message to display in the toast. Defaults to the translation of t("SAVED_SUCCESS").
 * @returns {void}
 */
export const toastSuccess: ToastErrorFunction = (
  message: string = i18next.t("SAVED_SUCCESS"),
) => {
  enqueueSnackbar(message, { variant: "success" });
};

/**
 * Displays an error toast notification.
 *
 * @param {string} [message=i18next.t("SOMETHING_WENT_WRONG")] The message to display in the toast. Defaults to the translation of t("SOMETHING_WENT_WRONG").
 * @returns {void}
 */
export const toastError: ToastErrorFunction = (
  message: string = i18next.t("SOMETHING_WENT_WRONG"),
): void => {
  enqueueSnackbar(message, { variant: "error" });
};
