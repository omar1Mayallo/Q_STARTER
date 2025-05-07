import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import i18next from "i18next";
import { UseFormSetError } from "react-hook-form";
import catchErrors from "../../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import { toastSuccess } from "../../../../../shared/components/Toasts";
import useUserStore from "../../../../../store/user.store";
import useLoginAPIs from "../api/login.api";
import { LoginFormData } from "./../validations/login.validation";

export default function useLoginService(
  setError: UseFormSetError<LoginFormData>,
) {
  const { login } = useLoginAPIs();
  const { setToken, setUser } = useUserStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setToken(res.data.token);
      setUser(res.data.user);
      toastSuccess(i18next.t("LOGIN_SUCCESS"));
    },
    onError: (error: AxiosError<ResponseErrorsI<keyof LoginFormData>>) =>
      catchErrors<LoginFormData>(error, setError),
  });
}
