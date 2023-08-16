import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getProfile = () : Promise<AxiosResponse> => {
    return axiosIntance.get("/user/profile/manuel-rivero");
  };
  
  export const updateProfile = (form:FormData) : Promise<AxiosResponse> => {
    return axiosIntance.post("/user/update-profile", form);
  };
  