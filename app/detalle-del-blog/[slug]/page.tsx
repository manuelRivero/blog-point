import BlogCardHorizontal from "@/app/components/shared/blogCardHorizontal";
import BlogHeaderCard from "@/app/components/blogDetail/blogHeaderCard";
import CustomCard from "@/app/components/shared/card";
import CommentCard from "@/app/components/shared/commentCard";
import CommentInput from "@/app/components/shared/commentInput";
import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogDetail() {
  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
      <BlogHeaderCard />
      <div>BlogDetail</div>
      <Grid container direction="row" flexWrap={"nowrap"} spacing={2}>
        <Grid item sm={8}>
          <Typography
            variant="h3"
            component="h3"
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            Comentarios
          </Typography>
          <CustomCard>
            <CommentInput />
            <Stack>
              {[1, 2, 3, 4, 5].map((e: any, index: number) => {
                return <CommentCard key={index} />;
              })}
            </Stack>
          </CustomCard>
        </Grid>
        <Grid item sm={4}>
          <Typography
            variant="h3"
            component="h3"
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            Blogs relacionados
          </Typography>
          <CustomCard>
            <BlogCardHorizontal />
          </CustomCard>
        </Grid>
      </Grid>
    </Container>
  );
}
