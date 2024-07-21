//"use client";
import { useEffect } from "react";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";
import { getCategories } from "./client/category";
import { getBlogs, getPopular, getRecent } from "./client/blogs";
import CategoryRow from "./components/home/categoryRow";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { axiosIntance } from "./client";

export const revalidate = 60;
async function getData({ page = 0 }) {
  const cookie = cookies().get("token");

  try {
    const [
      { data: categoriesData },
      { data: blogsData },
      { data: recentData },
      { data: fromFollows },
    ] = await Promise.all([
      getCategories({ page: 0, pageSize: 5 }),
      getPopular(0, 5),
      getRecent(0, 5),
      axiosIntance.get("/blogs/from-follows", {
        headers: {
          Cookie: cookie ? `token=${cookie?.value}` : "",
        },
      }),
    ]);
    return {
      categoriesData,
      blogsData,
      recentData,
      fromFollows,
    };
  } catch (error) {
    console.log("home error", error);
    return null;
  }
}

export default async function Home({ params }: any) {
  const { page } = params;

  const data = await getData({ page });

  return (
    <main>
      <Hero categories={data ? data.categoriesData.categories : []} />
      <Container sx={{ paddingBottom: 8, marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8} lg={8}>
            {data?.fromFollows.blogs[0].data.length > 0 && (
              <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h3" sx={{ marginBottom: 2 }}>
                  Recomendados para tí
                </Typography>

                <Stack direction="column" spacing={4}>
                  {data &&
                    data.fromFollows.blogs[0].data.map(
                      (e: any, index: number) => {
                        return (
                          <BlogCard
                            key={index}
                            userAvatar={{
                              name: e.user[0].name,
                              lastName: e.user[0].lastName,
                              image: e.user[0].avatar,
                              slug: e.user[0].slug,
                            }}
                            data={{ ...e, category: e.category[0].name }}
                            preview={false}
                            showDescriptionTooltip={false}
                            showTitleTooltip={false}
                          />
                        );
                      }
                    )}
                </Stack>
                {/* <Stack
                  justifyContent={"center"}
                  direction={"row"}
                  mt={4}
                  mb={4}
                >
                  <Link href={"/tendencias"} style={{ textDecoration: "none" }}>
                    <Button variant="contained">Ver más</Button>
                  </Link>
                </Stack> */}
              </Box>
            )}
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h3" sx={{ marginBottom: 2 }}>
                Tendencias en Historial Medico
              </Typography>

              <Stack direction="column" spacing={4}>
                {data &&
                  data.blogsData.blogs[0].data.map((e: any, index: number) => {
                    return (
                      <BlogCard
                        key={index}
                        userAvatar={{
                          name: e.user[0].name,
                          lastName: e.user[0].lastName,
                          image: e.user[0].avatar,
                          slug: e.user[0].slug,
                        }}
                        data={{ ...e, category: e.category[0].name }}
                        preview={false}
                        showDescriptionTooltip={false}
                        showTitleTooltip={false}
                      />
                    );
                  })}
              </Stack>
              <Stack justifyContent={"center"} direction={"row"} mt={4} mb={4}>
                <Link href={"/tendencias"} style={{ textDecoration: "none" }}>
                  <Button variant="contained">Ver más</Button>
                </Link>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ marginBottom: 2 }}>
                Lo más nuevo
              </Typography>
              <Stack direction="column" spacing={4}>
                {data &&
                  data.recentData.blogs[0].data.map((e: any, index: number) => {
                    return (
                      <BlogCard
                        key={index}
                        userAvatar={{
                          name: e.user[0].name,
                          lastName: e.user[0].lastName,
                          image: e.user[0].avatar,
                          slug: e.user[0].slug,
                        }}
                        data={{ ...e, category: e.category[0].name }}
                        preview={false}
                        showDescriptionTooltip={false}
                        showTitleTooltip={false}
                      />
                    );
                  })}
              </Stack>
              <Stack justifyContent={"center"} direction={"row"} mt={4} mb={4}>
                <Link href={"/lo-mas-nuevo"} style={{ textDecoration: "none" }}>
                  <Button variant="contained">Ver más</Button>
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <CategoryRow
                categories={data ? data.categoriesData.categories : []}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
