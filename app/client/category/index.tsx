import { AxiosResponse } from "axios";
import { axiosIntance } from "..";
import { Category } from "@/app/data/categories";

interface CategoryForm {
  name: string;
}

interface GetCategoriesParams {
  page: number;
  pageSize?: number;
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
      pageSize: data.pageSize,
      page: data.page,
    },
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
};

export const getAllCategories = (
  searchText: string
): Promise<GetCategoriesResponse> => {
  return axiosIntance.get("/category/get-all", {
    params: {
      searchText,
    },
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
};
