
import React from "react";
import { getBlog } from "@/app/client/blogs";
import MainWrapper from "@/app/components/blogDetail/mainWrapper";

const getData = async (slug: string) => {
  try {
    const { data } = await getBlog(slug);
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
