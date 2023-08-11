import React from "react";
import { getProfile } from "@/app/client/user";
import MainWrapper from "@/app/components/profile/mainWrapper";
import { cookies } from "next/headers";
import { axiosIntance } from "@/app/client";

// const getUserProfile = async () => {
//   try {
//     const {data} = await getProfile();
//   return {data}
//   } catch (error) {
//     console.log("error server fetching", error)
//   }
// }

// export async function getServerSideProps() {
//   const token = cookies().get("token")
//   // Fetch data from external API
//   const{data} = await axiosIntance.get("/user/profile/manuel-rivero")

//   console.log("server side data", data)

//   // Pass data to the page
//   return { props: { data } };
// }

async function getData() {
  const cookie = cookies().get("token");
  const response = await axiosIntance.get("/user/profile/manuel-rivero", {
    headers: {
      Cookie: `token=${cookie?.value}`,
    },
  });

  return response;
}

export default async function Profile() {
  const data = await getData();
  console.log("data", data);
  return <MainWrapper data={{}} />;
}
