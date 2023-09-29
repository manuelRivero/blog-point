import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";
import { getCategories } from "./client/category";
import { getBlogs } from "./client/blogs";

async function getData({page = 0}) {
  try {
    const [categoriesData, blogsData] = await Promise.all([getCategories({ page: 0 }),getBlogs(page, undefined)]);
    return {
      categoriesData,
      blogsData
    };
  } catch (error) {
    console.log("home error", error)
    return null;
  }
}

export default async function Home({ params }: any) {
  const { page } = params;
  const data = await getData({page});
  const blogs = [
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
      user: {
        name: "Manuel",
        lastName: "Rivero",
        image: null,
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
      user: {
        name: "Manuel",
        lastName: "Rivero",
        image: null,
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
      user: {
        name: "Manuel",
        lastName: "Rivero",
        image: null,
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
      user: {
        name: "Manuel",
        lastName: "Rivero",
        image: null,
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
      user: {
        name: "Manuel",
        lastName: "Rivero",
        image: null,
      },
    },
  ];
  return (
    <main>
      <Hero categories={data ? data.categoriesData.data.categories : []} />
      <Container sx={{ paddingBottom: 8 }}>
        <Grid container spacing={4} sx={{ marginTop: "-6rem" }}>
          {data && data.blogsData.data.blogs[0].data.map((e: any, index: number) => {
            console.log("blog", e)
            return (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Stack direction="row" sx={{ justifyContent: "center" }}>
                  <BlogCard
                    userAvatar={{
                      name: e.user[0].name,
                      lastName: e.user[0].name,
                      image: e.user[0].avatar,
                    }}
                    data={{...e, category: e.category[0].name}}
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
