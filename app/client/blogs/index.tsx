import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

  export const createBlog = (form:FormData) : Promise<AxiosResponse> => {
    return axiosIntance.post("/blogs/create", form);
  };
  