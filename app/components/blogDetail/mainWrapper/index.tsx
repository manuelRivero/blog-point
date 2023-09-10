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
import { useCore } from "@/app/context/core";

interface Comment {
  content: string;
  createdAt: string;
  user: [
    {
      _id?: string;
      avatar: string;
      slug: string;
      lastName: string;
      name: string;
    }
  ];
  _id: string;
}
interface NewComment {
  _id: string;
  comments: {
    user: string;
    content: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    responses: [];
  };
  user: [
    {
      _id: string;
      avatar: string;
      slug: string;
      lastName: string;
      name: string;
    }
  ];
}
export default function MainWrapper({ data }: any) {
  const [{ user }] = useCore();
  const router = useRouter();
  const { slug } = useParams();
  const [page, setPage] = useState<number>(0);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const addComment = (data: NewComment) => {
    const newCommentsList = comments ? [...comments] : [];
    if (user?.data) {
      setComments([
        {
          _id: data.comments._id,
          content: data.comments.content,
          createdAt: data.comments.createdAt,
          user: [
            {
              avatar: data.user[0].avatar,
              slug: data.user[0].slug,
              lastName: data.user[0].lastName,
              name: data.user[0].name,
            },
          ],
        },
        ...newCommentsList,
      ]);
    }
  };
  useEffect(() => {
    const getData = async () => {
      console.log("slug", slug.toString());
      const { data } = await getBlogComments(slug.toString(), page);
      console.log(
        "comment data",
        data.comments[0].data,
        data.comments[0].metadata
      );
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
            <CommentInput addComment={addComment} />
            <Stack>
              {comments &&
                comments.map((e: any, index: number) => {
                  return <CommentCard data={e} key={e._id} />;
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
