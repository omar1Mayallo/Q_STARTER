import axios from "axios";
import i18next from "i18next";
import Cookies from "js-cookie";
import { toastError } from "../shared/components/Toasts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    config.headers["Accept-Language"] = i18next.language;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized or forbidden responses
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // If I send error message from backend
      if (error.response?.data?.message) {
        toastError(error.response?.data?.message);
      }
      // else return generic error message
      else {
        toastError(i18next.t("ACCESS_DENIED"));
      }
      setTimeout(() => {
        Cookies.remove("token");
        window.location.href = "/login";
      }, 2000);
    }
    return Promise.reject(error);
  },
);

export default api;
