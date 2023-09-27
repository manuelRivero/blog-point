import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const createBlog = (form: FormData): Promise<AxiosResponse> => {
  return axiosIntance.post("/blogs/create", form);
};

export const getBlog = (slug: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/" + slug);
};

export const getUserBlog = (id: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/user-blogs/" + id);
};

export const blogLike = (slug: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/like/" + slug);
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
  commentId: string,
  page: number
): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/responses", {
    params: {
      slug,
      page,
      commentId,
    },
  });
};

export const createComment = (form: {
  slug: string;
  content: string;
}): Promise<AxiosResponse> => {
  return axiosIntance.post("/blogs/create-comment", form);
};

export const createResponse = (form: {
  slug: string;
  commentId:string;
  content: string;
}): Promise<AxiosResponse> => {
  return axiosIntance.post("/blogs/create-response", form);
};
