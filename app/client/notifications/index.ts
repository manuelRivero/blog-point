import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getNotifications = (): Promise<AxiosResponse> => {
  return axiosIntance.get("/notifications/get");
};

