
import React from "react";
import { getBlog } from "@/app/client/blogs";
import MainWrapper from "@/app/components/blogDetail/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";


const getData = async (slug: string) => {
  const cookie = cookies().get("token");

  try {
    const { data } = await axiosIntance.get("/blogs/" + slug, {
      headers: {
        Cookie: cookie ? `token=${cookie?.value}` : "",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default async function BlogDetail({ params }: any) {
  const { slug } = params;
  const data = await getData(slug);
  return (
    <MainWrapper data={data} />
  );
}
