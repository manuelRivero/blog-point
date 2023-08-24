import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const createBlog = (form: FormData): Promise<AxiosResponse> => {
  return axiosIntance.post("/blogs/create", form);
};

export const getBlog = (slug: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/" + slug);
};

export const getBlogComments = (
  slug: string,
  page: number
): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/comments", {
    params: {
      slug,
      page,
    },
  });
};

export const getCommentsResponses = (
  slug: string,
  commentId:string,
  page: number
): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/responses", {
    params: {
      slug,
      page,
      commentId
    },
  });
};
