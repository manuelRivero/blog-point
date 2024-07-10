
import React from "react";
import { getBlog } from "@/app/client/blogs";
import MainWrapper from "@/app/components/blogDetail/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";
import { ImageResponse } from "next/server";


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

export async function generateMetadata({ params }: any) {
  const cookie = cookies().get("token");

  try {
    const { data } = await axiosIntance.get("/blogs/" + params.slug, {
      headers: {
        Cookie: cookie ? `token=${cookie?.value}` : "",
      },
    });
    console.log("Metadata", data);
   const metadataBase = new URL(data.blog.image.split('com')[0]+ 'com');
   console.log("metadataBase", metadataBase)
    return {
      metadataBase: metadataBase.origin,
      title: "Historial Medico | " + data.blog.title,
      description: data.blog.description,
      openGraph: {
        title: data.blog.title,
        description: data.blog.description,
        type: "article",
        images: [
          {
            url: data.blog.image,
            width: 1200,
            height: 630,
            alt: data.blog.title,
          },
        ],
      },
    };
  } catch (error) {
    return null;
  }
}

export default async function BlogDetail({ params }: any) {
  const { slug } = params;
  const data = await getData(slug);
  return (
    <>
    <MainWrapper data={data} slug={slug} />
    </>
  );
}
