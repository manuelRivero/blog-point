import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";
import { getCategories } from "./client/category";
import { getBlogs } from "./client/blogs";
import CategoryRow from "./components/home/categoryRow";

async function getData({ page = 0 }) {
  try {
    const [{ data: categoriesData }, { data: blogsData }] = await Promise.all([
      getCategories({ page: 0, pageSize: 5 }),
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
  return (
    <main>
      <Hero categories={data ? data.categoriesData.categories : []} />
      <Container sx={{ paddingBottom: 8, marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={8} lg={8}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h3" sx={{ marginBottom: 2 }}>
                Tendencias en Historial Medico
              </Typography>
              <Stack direction="column" spacing={4}>
                {data &&
                  data.blogsData.blogs[0].data.map((e: any, index: number) => {
                    console.log("blog", e);
                    return (
                      <BlogCard
                        key={index}
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
                    );
                  })}
              </Stack>
              <Stack justifyContent={"center"} direction={"row"} mt={4} mb={4}>
                <Button variant="contained">Cargar más</Button>
              </Stack>

            </Box>
            <Box>
              <Typography variant="h3" sx={{ marginBottom: 2 }}>
                Lo más nuevo
              </Typography>
              <Stack direction="column" spacing={4}>
                {data &&
                  data.blogsData.blogs[0].data.map((e: any, index: number) => {
                    console.log("blog", e);
                    return (
                      <BlogCard
                        key={index}
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
                    );
                  })}
              </Stack>
              <Stack justifyContent={"center"} direction={"row"} mt={4} mb={4}>
                <Button variant="contained">Cargar más</Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <CategoryRow categories={data ? data.categoriesData.categories : []} />
            </Box>
          </Grid>
        </Grid>

      </Container>
    </main>
  );
}
