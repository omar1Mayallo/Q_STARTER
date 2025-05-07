import { postData } from "../../../../../api/methods";
import CACHED_KEYS from "../../../../../shared/constants/query-cached-keys";
import { UserModel } from "../../../../../shared/types/models/User.model";
import { LoginFormData } from "../validations/login.validation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface AuthResponse {
  token: string;
  user: UserModel;
}

const useLoginAPIs = () => {
  const queryClient = useQueryClient();

  // LOGIN
  async function login(body: LoginFormData) {
    const res = await postData<AuthResponse, LoginFormData>(
      "/auth/login",
      body,
    );
    return res;
  }

  function logout(durationToRedirectToLogin: number = 200) {
    Cookies.remove("token");
    queryClient.removeQueries({
      queryKey: [CACHED_KEYS.LOGGED_USER_PERMISSIONS, CACHED_KEYS.LOGGED_USER],
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, durationToRedirectToLogin);
  }

  return { login, logout };
};

export default useLoginAPIs;
