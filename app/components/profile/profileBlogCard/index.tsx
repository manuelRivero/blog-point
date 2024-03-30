import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "./../../../assets/images/post-placeholder.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface Props { blogs: any }

export default function ProfileBlogCard({ blogs }: Props) {
  console.log('profile blog',blogs)
  console.log('profile blog titulo',blogs.blogs[0].data[0].title)
  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="row" spacing={2}>
        <Box>
          <Typography variant="h2">Titulo del blog</Typography>
          <Typography variant="body1">
           {blogs.blogs[0].data[0].title}
          </Typography>
          <Stack sx={{ marginTop: 1 }}>
            <Stack spacing={"5px"} direction={"row"} sx={(theme)=>({ color: theme.palette.primary.main})}>
              <ThumbUpIcon />
              <Typography variant="body1" color="primary">50</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={(theme) => ({
            maxWidth: 200,
            maxHeight: 200,
            [theme.breakpoints.down("md")]: {
              maxWidth: 100,
              maxHeight: 100,
            },
          })}
        >
          <img
            src={blogs.blogs[0].data[0].image}
            alt="blog-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
