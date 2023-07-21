import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import MainSearch from "./components/mainSearch";

export default function Home() {
  const blogs = [
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
    },
    {
      preview: false,
      data: {
        title: "Lorem ipsum",
        image: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu facilisis libero. Ut eget massa feugiat, lobortis eros in, egestas purus. Sed nec tellus non lacus finibus semper. Donec maximus",
        rate: 2,
        link: "",
        date: "14-12-2023",
      },
    },
  ];
  console.log("page render")
  return (
    <main>
      <Container sx={{ marginTop: "2rem", paddingBottom:8 }}>
        <Stack justifyContent={"center"} direction={"row"} mb={4}>
          <MainSearch />
        </Stack>
        <Grid container spacing={2}>
          {blogs.map((e: any, index: number) => {
            console.log("e", e)
            return (
              <Grid key={index} item xs={12} sm={3}>
                <BlogCard data={e.data} preview={false} />
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
