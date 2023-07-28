import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "./../../../assets/images/post-placeholder.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function ProfileBlogCard() {
  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="row" spacing={2}>
        <Box>
          <Typography variant="h2">Titulo del blog</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus reprehenderit repellat aut beatae aperiam quibusdam
            necessitatibus dolores at? Accusantium eaque itaque quia omnis fugit
            eos. At accusamus assumenda repellendus deleniti.
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
            src={Image.src}
            alt="blog-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
