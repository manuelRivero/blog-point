"use client";
import BlogCardHorizontal from "@/app/components/shared/blogCardHorizontal";
import BlogHeaderCard from "@/app/components/blogDetail/blogHeaderCard";
import CustomCard from "@/app/components/shared/card";
import CommentCard from "@/app/components/shared/commentCard";
import CommentInput from "@/app/components/shared/commentInput";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getBlogComments } from "@/app/client/blogs";
import { useCore } from "@/app/context/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getRelatedBlogs } from "@/app/client/blogs";


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
  console.log(data, 'data1111111111111')
  const [{ user }] = useCore();
  const router = useRouter();
  const { slug } = useParams();
  const [page, setPage] = useState<number>(0);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);


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
  
  useEffect(() => {
    Promise.all([getData(), getRelatedBlogs(data.blog.category._id)]).then((values:any) => {
      setCategoryData(values[1].data.blogs[0].data)
      console.log('data category 11111111',values[1].data.blogs[0].data)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('data category',categoryData);

  if (!data) {
    router.push("/");
    return null;
  }

  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
       <IconButton onClick={() => router.back()} sx={{marginBottom:2}}>
        <ArrowBackIcon />
      </IconButton>
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
            {categoryData.map((e:any, i:number)=>{
              return <BlogCardHorizontal data={e} key={"related-blog" + "-" + i} />
            })}
          </CustomCard>
        </Grid>
      </Grid>
    </Container>
  );
}
