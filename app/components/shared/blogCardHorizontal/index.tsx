"use client";
import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import UserAvatar from "../UserAvatar";
import CustomTag from "../tag";
import moment from "moment";
import Image from "./../../../assets/images/post-placeholder.jpg";
import { concatDots } from "@/app/helpers/text";

export default function BlogCardHorizontal() {
  return (
    <Box>
      <Box sx={{ marginBottom: 1 }}>
        <UserAvatar
          user={{ name: "Manuel", lastName: "Rivero", image: null }}
        />
      </Box>

      <Box sx={{ maxWidth: 300 }}>
        <Typography variant="h5" component={"h1"}>
          {concatDots(
            `Este es un titulo del Blog ni muy largo ni muy corto`,
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
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum
          orci vitae ipsum venenatis, in porta lacus sagittis. Phasellus
          efficitur interdum lorem, sit amet tincidunt enim elementum vitae`,
            160
          )}
        </Typography>
        <Box sx={{ marginBottom: 1 }}>
          <CustomTag
            color="secondary"
            crossCallback={null}
            linkCallback={null}
            title="Categoría"
          />
        </Box>
      </Box>
    </Box>
  );
}
