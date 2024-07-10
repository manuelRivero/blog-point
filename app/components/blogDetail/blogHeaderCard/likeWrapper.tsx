"use client";
import React, { useState } from "react";
import {
  setLoginModal,
  setLoginRedirection,
  useCore,
} from "@/app/context/core";
import { Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { blogLike } from "@/app/client/blogs";

interface Props {
  likes: [];
  targetLike: boolean;
  slug: string;
}

export default function LikeWrapper({ likes, targetLike, slug }: Props) {
  const [{ user }, coreDispatch] = useCore();

  const [isLiked, setIsLiked] = useState<boolean>(targetLike);
  const [likeCount, setLikeCount] = useState<number>(likes.length);

  const handleLike = async () => {
    try {
      if (!user) {
        setLoginRedirection(coreDispatch, `/detalle-del-blog/${slug}`);
        setLoginModal(coreDispatch, true);
      } else {
        const response = await blogLike(slug);
        if (isLiked) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log("error like", error);
    }
  };

  return (
    <Stack
      spacing={"5px"}
      direction={"row"}
      sx={(theme) => ({
        color: theme.palette.primary.main,
        alignItems: "center",
      })}
    >
      <ThumbUpIcon
        onClick={() => handleLike()}
        sx={{ cursor: "pointer" }}
        color={isLiked ? "primary" : "disabled"}
      />
      <Typography variant="body1" color="primary">
        {likeCount}
      </Typography>
    </Stack>
  );
}
