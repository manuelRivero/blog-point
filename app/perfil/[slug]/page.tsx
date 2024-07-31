import React from "react";
import MainWrapper from "@/app/components/profile/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";
import { createAccessToken } from "@/app/client/user";

export const revalidate = 10;
export const dynamic = "force-dynamic";

async function getData(slug: string) {
  const cookie = cookies().get("token");
  try {
    const [{ data: profileData }, { data: blogData }] = await Promise.all([
      axiosIntance.get("/user/profile/" + slug, {
        headers: {
          Cookie: cookie ? `token=${cookie?.value}` : "",
        },
      }),
      axiosIntance.get("/blogs/other-user-blogs/" + slug, {
        headers: {
          Cookie: cookie ? `token=${cookie?.value}` : "",
        },
      }),
    ]);

    // const repsonse = await createAccessToken();
    // console.log("AccessToken", repsonse);

    console.log("data", { profileData, blogData });
    return { profileData, blogData };
  } catch (error) {
    console.log("AccessToken error", error.response);
    console.log("error profile", error);
    return null;
  }
}

export default async function Profile({ params, searchParams }: any) {
  const { slug } = params;
  const data = await getData(slug);

  return <MainWrapper data={data?.profileData} blogs={data?.blogData} />;
}
