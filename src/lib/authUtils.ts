/**
 * Authentication utility functions
 */

import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { AxiosErrorResponse, ResponseData } from "@/types/response";
import { TokenPayload } from "@/types/shared";

export const logoutHandler = (route?: string): void => {
  localStorage.removeItem("token");
  window.location.href = route || "/signin";
};

export const getApiErrorMessage = (
  source: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  const data: ResponseData | undefined =
    (source as AxiosErrorResponse)?.response?.data ?? (source as ResponseData);

  return (
    data?.error_msg ||
    data?.resp_msg ||
    data?.message ||
    (source as Error)?.message ||
    fallback
  );
};

export const onError = (error: AxiosErrorResponse) => {
  toast.error(getApiErrorMessage(error, "Request failed"));
};

export const decodeUserToken = (): TokenPayload => {
  let user = {};

  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded: TokenPayload = jwtDecode(token);
      user = decoded;
    } catch (error) {
      console.error("Invalid Token", error);
    }
  }

  return user;
};
