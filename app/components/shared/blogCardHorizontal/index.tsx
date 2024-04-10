"use client";
import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import UserAvatar from "../UserAvatar";
import CustomTag from "../tag";
import moment from "moment";
import Image from "./../../../assets/images/post-placeholder.jpg";
import { concatDots } from "@/app/helpers/text";

interface Props {
  data:any
}
export default function BlogCardHorizontal({data}:Props) {
  console.log('data blog component ',data)
  console.log('data user component ',data.user[0])

  return (
    <Box>
      <Box sx={{ marginBottom: 1 }}>
        <UserAvatar
          user={{ name: data.user[0].name, lastName: data.user[0].lastName, image: data.user[0].avatar, slug:data.user[0].slug }}
        />
      </Box>

      <Box sx={{ maxWidth: 300 }}>
        <Typography variant="h5" component={"h1"}>
          {concatDots(
            data.title,
            60
          )}
        </Typography>
        <Typography
          variant="body1"
          component={"p"}
          fontSize={14}
          sx={{ marginBottom: ".5rem" }}
        >
          {concatDots(
            data.description,
            160
          )}
        </Typography>
        <Box sx={{ marginBottom: 1 }}>
          <CustomTag
            color="secondary"
            crossCallback={null}
            linkCallback={null}
            title={data.category[0].name}
          />
        </Box>
      </Box>
    </Box>
  );
}
