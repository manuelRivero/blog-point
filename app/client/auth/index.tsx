import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

interface LoginForm {
  email: string;
  password: string;
}

export const login = (data: LoginForm): Promise<AxiosResponse> => {
  return axiosIntance.post("/auth/login", data);
};
export const logout = (id: string): Promise<AxiosResponse> => {
  return axiosIntance.post("/auth/logout/" + id);
};
export const register = (form: FormData): Promise<AxiosResponse> => {
  return axiosIntance.post("/auth/register", form);
};

export const me = (): Promise<AxiosResponse> => {
  return axiosIntance.get("/auth/me");
};
export const postDeviceId = (deviceId: string): Promise<AxiosResponse> => {
  return axiosIntance.post("/auth/device-id", { deviceId });
};
