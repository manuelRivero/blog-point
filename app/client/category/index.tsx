import { AxiosResponse } from "axios";
import { axiosIntance } from "..";
import { Category } from "@/app/data/categories";

interface CategoryForm {
  name: string;
}

interface GetCategoriesParams {
  page: number;
}

interface GetCategoriesResponse {
  data: {
    ok: boolean;
    categories: Category[];
  };
}

export const createCategory = (data: CategoryForm): Promise<AxiosResponse> => {
  return axiosIntance.post("/category", data);
};

export const getCategories = (
  data: GetCategoriesParams
): Promise<GetCategoriesResponse> => {
  return axiosIntance.get("/category", {
    params: {
      page: data.page,
    },
  });
};
