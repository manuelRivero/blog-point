import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";
import { getCategories } from "./client/category";
import { getBlogs } from "./client/blogs";

async function getData({ page = 0 }) {
  //console.log('page get data',page)
  try {
    const [{ data: categoriesData }, { data: blogsData }] = await Promise.all([
      getCategories({ page: 0, pageSize:5 }),
      getBlogs(page, undefined),
    ]);
    console.log(categoriesData, blogsData);
    return {
      categoriesData,
      blogsData,
    };
  } catch (error) {
    console.log("home error");
    return null;
  }
}

export default async function Home({ params }: any) {
  const { page } = params;
  const data = await getData({ page });
  //console.log('data home',data)
  return (
    <main>
      <Hero categories={data ? data.categoriesData.categories : []} />
      <Container sx={{ paddingBottom: 8 }}>
        <Grid container spacing={4} sx={{ marginTop: "-6rem" }}>
          {data &&
            data.blogsData.blogs[0].data.map((e: any, index: number) => {
              console.log("blog", e);
              return (
                <Grid key={index} item xs={12} sm={6} lg={4}>
                  <Stack direction="row" sx={{ justifyContent: "center" }}>
                    <BlogCard
                      userAvatar={{
                        name: e.user[0].name,
                        lastName: e.user[0].lastName,
                        image: e.user[0].avatar,
                        slug: e.user[0].slug
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
