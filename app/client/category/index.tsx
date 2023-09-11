import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

interface CategoryForm {
  name: string;
}

export const createCategory = (data: CategoryForm): Promise<AxiosResponse> => {
  return axiosIntance.post("/category/", data);
};