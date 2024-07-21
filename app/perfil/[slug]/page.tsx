import React from "react";
import MainWrapper from "@/app/components/profile/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";

export const revalidate = 10

async function getData(slug: string) {
  const cookie = cookies().get("token");
  try {
    const [{data:profileData}, {data:blogData}] = await Promise.all([axiosIntance.get("/user/profile/" + slug, {
      headers: {
        Cookie: cookie ? `token=${cookie?.value}` : "",
      },
    }),axiosIntance.get("/blogs/other-user-blogs/" + slug, {
      headers: {
        Cookie: cookie ? `token=${cookie?.value}` : "",
      },
    }) ])
    console.log("data", {profileData, blogData})
    return {profileData, blogData};
  } catch (error) {
    console.log("error profile", error)
    return null
  }
}

export default async function Profile({ params, searchParams }: any) {
  const { slug } = params;
  const data = await getData(slug);
 
  return <MainWrapper data={data?.profileData} blogs={data?.blogData} />;
}
