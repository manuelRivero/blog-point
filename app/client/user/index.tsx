import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getProfile = () : Promise<AxiosResponse> => {
    return axiosIntance.get("/auth/profile");
  };
  