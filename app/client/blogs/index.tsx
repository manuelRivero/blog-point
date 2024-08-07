import { AxiosResponse } from "axios";
import { axiosIntance } from "..";

export const getBlogs = (page:number | string[] | undefined, search:string | undefined) : Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs", {
    params:{
      page,
      search
    }
  })
}

export const createBlog = (form: FormData): Promise<AxiosResponse> => {
  return axiosIntance.post("/blogs/create", form);
};
export const editBlog = (form: FormData, id:string): Promise<AxiosResponse> => {
  return axiosIntance.post("/blogs/edit/"+id, form);
};

export const getBlog = (slug: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/" + slug);
};

export const getUserBlog = (id: string, page:number): Promise<AxiosResponse> => {
  return axiosIntance.get(`/blogs/user-blogs/${id}?page=${page}` );
};

export const blogLike = (slug: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/like/" + slug);
};
export const otherUserBlogs = (slug: string):Promise<AxiosResponse> => {
  return axiosIntance.get("/other-user-blogs/" + slug);
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


export const getRelatedBlogs = (categoryId: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/category", { params: { categoryId },
  });
}

export const getBlogsByCategories = (categoryIds: string[], page: number = 0): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/by-category", { params: { categoryIds: categoryIds, page },
  });
}

export const deleteBlog = (id: string): Promise<AxiosResponse> => {
  return axiosIntance.delete("/blogs/delete/" + id);
}

export const findBlogs = (query: string): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/find", { params: { query },
  });
}

export const getSupportBlogs = ( page: number): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/support", { params: { page },
  });
}

export const getPopular = (page: number = 0, pageSize: number = 10): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/popular", { params: { page, pageSize },
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
export const getRecent = (page: number = 0, pageSize: number = 10): Promise<AxiosResponse> => {
  return axiosIntance.get("/blogs/recent", { params: { page, pageSize },
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}