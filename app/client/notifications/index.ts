import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getNotifications = (
  page: number = 0,
  pageSize: number = 10
): Promise<AxiosResponse> => {
  return axiosIntance.get("/notifications/get", {
    params: { page, pageSize },
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
