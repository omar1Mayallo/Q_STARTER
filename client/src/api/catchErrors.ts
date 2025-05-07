import { AxiosError } from "axios";
import i18next from "i18next";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toastError } from "../shared/components/Toasts";
import { ResponseErrorsI } from "./types/response.types";

export default function catchErrors<DataT extends FieldValues>(
  error: AxiosError<ResponseErrorsI<string>>,
  setError: UseFormSetError<DataT>,
) {
  // console.log(error);
  const resErrors = error?.response?.data;

  // HTTP(Nest)_ERRORS, DATABASE_ERRORS
  if (resErrors?.message) {
    toastError(resErrors.message);
  }

  // SERVER_VALIDATION_ERRORS
  else if (resErrors?.errors) {
    toastError(i18next.t("VALIDATION_ERROR"));
    resErrors?.errors.forEach(({ field, message }) => {
      setError(field as Path<DataT>, { message }, { shouldFocus: true });
    });
  }

  // DEFAULT
  else {
    toastError(error.message);
  }
}
