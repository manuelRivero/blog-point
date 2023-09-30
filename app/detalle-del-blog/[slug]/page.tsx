import React from "react";
import { getBlog } from "@/app/client/blogs";
import MainWrapper from "@/app/components/blogDetail/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async ({params}:GetServerSidePropsContext) => { 
  const cookie = cookies().get("token");

  try {
    const { data } = await axiosIntance.get("/blogs/" + params?.slug, {
      headers: {
        Cookie: cookie ? `token=${cookie?.value}` : "",
      },
    });
    return {
      props: { data },
    };
  } catch (error) {
    return {
      notFound: true,
    } as const
  }
};

 function BlogDetail({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <MainWrapper data={data} />;
}

export default BlogDetail