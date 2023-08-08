import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const login = () => {
  return axiosIntance;
};
export const register = (form:FormData): Promise<AxiosResponse> => {
  return axiosIntance.post("/auth/register", form);
};
