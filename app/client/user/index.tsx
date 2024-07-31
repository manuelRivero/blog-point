import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getProfile = (): Promise<AxiosResponse> => {
  return axiosIntance.get("/user/profile/manuel-rivero");
};

export const updateProfile = (form: FormData): Promise<AxiosResponse> => {
  return axiosIntance.post("/user/update-profile", form);
};

export const follow = (id: string): Promise<AxiosResponse> => {
  return axiosIntance.post("/user/follow", { id });
};

export const unFollow = (id: string): Promise<AxiosResponse> => {
  return axiosIntance.post("/user/unfollow", { id });
};

export const createAccessToken = (code: string): Promise<AxiosResponse> => {
  return axiosIntance.post("/payment/access", {
    clientSecret: "uSsYsrUPxgaMmzKn5TWs5p2UqoVeRkFl",
    clientId: "6845307964887160",
    code,
    redirectUri: "https%3A%2F%2Fblog-point-nine.vercel.app%2F/procesando-vinculacion",
  });
};
