import { Box, Button, Container, Grid, Stack } from "@mui/material";
import BlogCard from "./components/blogCard";
import MainSearch from "./components/mainSearch";

export default function Home() {
  return (
    <main>
      <Container sx={{ marginTop: "2rem" }}>
        <Stack justifyContent={"center"} direction={"row"} mb={4}>
          <MainSearch />
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BlogCard />
          </Grid>
        </Grid>
        <Stack justifyContent={"center"} direction={"row"} mt={4}>
          <Button variant="contained">Cargar más</Button>
        </Stack>
      </Container>
    </main>
  );
}
