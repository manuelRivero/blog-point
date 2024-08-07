import BlogHeaderCard from "@/app/components/blogDetail/blogHeaderCard";
import CustomCard from "@/app/components/shared/card";
import { Box, Container, Grid } from "@mui/material";
import CommentsWrapper from "../commentsWrapper";
import RelatedBlogsWrapper from "../relatedBlogsWrapper";
import BackButton from "../../shared/BackButton";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function MainWrapper({ data, slug }: any) {
  const headersList = headers();

  return (
      <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
        <BackButton />
        <BlogHeaderCard data={data.blog} url={slug} />
        <Box sx={{ marginTop: 2 }}>
          <CustomCard>
            <div
              className="responsive-image-container"
              dangerouslySetInnerHTML={{ __html: data.blog.content }}
            ></div>
          </CustomCard>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <CommentsWrapper />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RelatedBlogsWrapper data={data} />
          </Grid>
        </Grid>
      </Container>
  );
}
