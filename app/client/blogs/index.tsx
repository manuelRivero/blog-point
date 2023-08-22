import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

  export const createBlog = (form:FormData) : Promise<AxiosResponse> => {
    return axiosIntance.post("/blogs/create", form);
  };

  export const getBlog = (slug:string) : Promise<AxiosResponse> => {
    return axiosIntance.get("/blogs/" + slug);
  };
  