import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import api from ".";

export async function getData<TRes>(url: string, config?: AxiosRequestConfig) {
  const res = await api.get<TRes>(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    ...config,
  });
  return res;
}

export async function postData<TRes, TData>(
  url: string,
  data?: TData,
  isFormData: boolean = false,
) {
  const res = await api.post<TRes>(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      ...(isFormData && { "Content-Type": "multipart/form-data" }),
    },
  });
  return res;
}

export async function putData<TRes, TData>(
  url: string,
  data?: TData,
  isFormData: boolean = false,
) {
  const res = await api.put<TRes>(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      ...(isFormData && { "Content-Type": "multipart/form-data" }),
    },
  });
  return res;
}

export async function patchData<TRes, TData>(url: string, data?: TData) {
  const res = await api.patch<TRes>(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
}

export async function deleteData<TBody = { ids: number[] }>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
) {
  const res = await api.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    data: body,
    ...config,
  });
  return res;
}
