import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

  export const uploadImage = (form:FormData) : Promise<AxiosResponse> => {
    return axiosIntance.post("/uploads/upload-image", form);
  };
  