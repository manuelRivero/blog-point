"use client"
import { getBlogComments } from "@/app/client/blogs";
import { useCore } from "@/app/context/core";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomCard from "../../shared/card";
import CommentInput from "../../shared/commentInput";
import CommentCard from "../../shared/commentCard";

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

export default function CommentsWrapper() {
  const [{ user, deviceToken }] = useCore();
  const { slug } = useParams();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getBlogComments(slug.toString(), page);
        setComments(data.comments[0].data);
      } catch (error) {
        console.log("comment error", error);
      }
    };
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return (
    <Box>
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
    </Box>
  );
}
