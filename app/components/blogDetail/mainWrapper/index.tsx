"use client";
import BlogCardHorizontal from "@/app/components/shared/blogCardHorizontal";
import BlogHeaderCard from "@/app/components/blogDetail/blogHeaderCard";
import CustomCard from "@/app/components/shared/card";
import CommentCard from "@/app/components/shared/commentCard";
import CommentInput from "@/app/components/shared/commentInput";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getBlogComments } from "@/app/client/blogs";

interface Comment {
  _id: string;
  createAt: string;
  user: string;
  content: string;
}
export default function MainWrapper({ data }: any) {
  const router = useRouter();
  const { slug } = useParams();
  const [page, setPage] = useState<number>(0);
  const [comments, setComments] = useState<Comment[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      console.log("slug", slug.toString());
      const { data } = await getBlogComments(slug.toString(), page);
      console.log("comment data", data.comments[0].data, data.comments[0].metadata);
      setComments(data.comments[0].data);
    };
    getData();
  }, []);
  if (!data) {
    router.push("/");
    return null;
  }
  
  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
      <BlogHeaderCard data={data.blog} />
      <Box sx={{ marginTop: 2 }}>
        <CustomCard>
          <div dangerouslySetInnerHTML={{ __html: data.blog.content }}></div>
        </CustomCard>
      </Box>
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
              {comments &&
                comments.map((e: any, index: number) => {
                  return <CommentCard data={e} key={index} />;
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
