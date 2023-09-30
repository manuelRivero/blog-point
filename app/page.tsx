import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";
import { getCategories } from "./client/category";
import { getBlogs } from "./client/blogs";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";



export const getServerSideProps: GetServerSideProps = async ({params}:GetServerSidePropsContext) => {
  let page: string | string[] = "0";
  if (params?.page) {
    page = params.page;
  }
  try {
    const [categoriesData, blogsData] = await Promise.all([
      getCategories({ page: 0 }),
      getBlogs(page, undefined),
    ]);
    return {
      props: {
        categoriesData: categoriesData.data,
        blogsData: blogsData.data,
      },
    };
  } catch (error) {
    console.log("home error", error);
    return {
      notFound: true,
    } as const
  }
}

 function Home({ categoriesData, blogsData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <Hero categories={categoriesData ? categoriesData.categories : []} />
      <Container sx={{ paddingBottom: 8 }}>
        <Grid container spacing={4} sx={{ marginTop: "-6rem" }}>
          {blogsData &&
            blogsData.blogs[0].data.map((e: any, index: number) => {
              console.log("blog", e);
              return (
                <Grid key={index} item xs={12} sm={6} lg={4}>
                  <Stack direction="row" sx={{ justifyContent: "center" }}>
                    <BlogCard
                      userAvatar={{
                        name: e.user[0].name,
                        lastName: e.user[0].name,
                        image: e.user[0].avatar,
                      }}
                      data={{ ...e, category: e.category[0].name }}
                      preview={false}
                      showDescriptionTooltip={false}
                      showTitleTooltip={false}
                    />
                  </Stack>
                </Grid>
              );
            })}
        </Grid>
        <Stack justifyContent={"center"} direction={"row"} mt={4} mb={4}>
          <Button variant="contained">Cargar más</Button>
        </Stack>
      </Container>
    </main>
  );
}

export default Home