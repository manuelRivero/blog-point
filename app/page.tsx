import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";
import { getCategories } from "./client/category";

async function getData() {
  try {
    const { data } = await getCategories({ page: 0 });
    console.log("home data", data);

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const data = await getData();
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
      <Hero categories={data ? data.categories : []} />
      <Container sx={{ paddingBottom: 8 }}>
        <Grid container spacing={4} sx={{ marginTop: "-6rem" }}>
          {blogs.map((e: any, index: number) => {
            return (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Stack direction="row" sx={{ justifyContent: "center" }}>
                  <BlogCard
                    userAvatar={{
                      name: e.user.name,
                      lastName: e.user.name,
                      image: e.user.avatar,
                    }}
                    data={e.data}
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
