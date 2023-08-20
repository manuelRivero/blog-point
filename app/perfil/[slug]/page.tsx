import React from "react";
import { getProfile } from "@/app/client/user";
import MainWrapper from "@/app/components/profile/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";

async function getData(slug: string) {
  const cookie = cookies().get("token");
  try {
    const { data } = await axiosIntance.get("/user/profile/" + slug, {
      headers: {
        Cookie: cookie ? `token=${cookie?.value}` : "",
      },
    });
    return data;
  } catch (error) {
    return null
  }
}

export default async function Profile({ params, searchParams }: any) {
  const { slug } = params;
  const data = await getData(slug);
  console.log("render server", data);
  return <MainWrapper data={data} />;
}
