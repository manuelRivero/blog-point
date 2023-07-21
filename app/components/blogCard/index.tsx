"use client";
import React from "react";
import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
  CardMedia,
  Box,
  Stack,
  Rating,
} from "@mui/material";

import Image from "./../../assets/images/post-placeholder.jpg";
import Avatar from "../shared/UserAvatar";
import moment from "moment";

interface Props {
  data: Data;
  preview: boolean;
}
interface Data {
  title: string;
  image: string | null;
  description: string;
  date?: string;
  link?: string;
  rate: number;
}
const avatarData = { name: "Manuel", lastName: "Rivero", image: null };
export default function BlogCard({ data, preview }: Props) {
  return (
    <Card sx={{ padding: "1rem", borderRadius: "1rem", maxWidth: 335 }}>
      <CardMedia
        sx={{ borderRadius: "1rem", width: "100%" }}
        component="img"
        image={data.image ? data.image : Image.src}
        alt="Paella dish"
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          mb={1}
        >
          <Rating name="simple-controlled" value={5} onChange={() => {}} />
          {preview ? (
            <Typography fontSize={"14px"} align="right">
              {moment(data.date).format("DD-MM-YYYY")}
            </Typography>
          ) : (
            <Typography fontSize={"14px"} align="right">
              {moment().format("DD-MM-YYYY")}
            </Typography>
          )}
        </Stack>
        <Box sx={{ marginBottom: 2 }}>
          <Avatar user={avatarData} />
        </Box>
        {data.title ? (
          <Typography
            variant="h5"
            color="text.primary"
            component="h6"
            sx={{ mb: 1 }}
          >
            {data.title}
          </Typography>
        ) : (
          <Box
            sx={{
              height: 20,
              marginBottom: 2,
              width: "100%",
              background: "#c2c2c2",
              borderRadius: "4px",
            }}
          ></Box>
        )}
        {data.description ? (
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            {data.description}
          </Typography>
        ) : (
          <Box
            sx={{
              height: 40,
              width: "100%",
              background: "#c2c2c2",
              borderRadius: "4px",
            }}
          ></Box>
        )}
      </CardContent>
      {preview ? null : (
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Button variant="contained" size="small">
            Leer
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
