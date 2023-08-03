"use client";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import Hero from "./components/home/hero";

export default function Home() {
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
    },
  ];
  return (
    <main>
      <Hero />
      <Container sx={{ paddingBottom: 8 }}>
        
        <Grid container spacing={4} sx={{ marginTop: "-6rem" }}>
          {blogs.map((e: any, index: number) => {
            console.log("e", e);
            return (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Stack direction="row" sx={{ justifyContent: "center" }}>
                  <BlogCard data={e.data} preview={false} showDescriptionTooltip={false} showTitleTooltip={false}/>
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
