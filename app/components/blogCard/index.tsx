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
  Tooltip,
  CardHeader,
} from "@mui/material";

import Image from "./../../assets/images/post-placeholder.jpg";
import Avatar from "../shared/UserAvatar";
import moment from "moment";
import Link from "next/link";
import { concatDots } from "@/app/helpers/text";
import CustomTag from "../shared/tag";

interface Props {
  data: Data;
  preview: boolean;
  showTitleTooltip: boolean;
  showDescriptionTooltip: boolean;
  userAvatar: { name: string; lastName: string; image: string | null };
}
interface Data {
  title: string;
  image: string | null;
  description: string;
  date?: string;
  link?: string;
  rate?: number;
  category: string;
  slug?: string
}
export default function BlogCard({
  data,
  preview,
  showTitleTooltip,
  showDescriptionTooltip,
  userAvatar,
}: Props) {
  return (
    <Box component={Link} href={"/detalle-del-blog/" + data.slug} sx={{
      textDecoration: "none", width: "100%",
    }}>

      <Card

        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          width: "100%",
          boxShadow: " 0 0 15px -5px rgba(0,0,0, .5)",
        }}
      >
        <CardHeader
          sx={{ paddingTop: 0, paddingLeft: 0 }}
          avatar={
            <Avatar user={userAvatar} />
          }
        />
        <Stack direction={"row"}>

          <CardMedia
            sx={{ borderRadius: "1rem", width: { xs: "100px" }, height: { xs: "100px" }, objectFit: "cover" }}
            component="img"
            image={data.image ? data.image : Image.src}
            alt="Paella dish"
          />
          <CardContent sx={{ width: "100%", paddingTop: 0, paddingRight: 0, paddingBottom: " 0 !important " }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems={"center"}
              mb={1}
            >
              {data.category && (
                <CustomTag
                  color="secondary"
                  linkCallback={null}
                  crossCallback={null}
                  title={data.category}
                />
              )}
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

            {data.title ? (
              <Typography
                variant="h5"
                color="text.primary"
                component="h4"
                sx={{ mb: 1 }}
              >
                {preview ? (
                  showTitleTooltip ? (
                    <Tooltip
                      title="Tu título abarca más caracteres de los que se
              visualizaran en la carta de tu blog pero se visualizara de
              forma completa en el detalle del blog"
                    >
                      <span>{concatDots(data.title, 60)}</span>
                    </Tooltip>
                  ) : (
                    concatDots(data.title, 60)
                  )
                ) : (
                  concatDots(data.title, 60)
                )}
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
              preview ? (
                showDescriptionTooltip ? (
                  <Tooltip
                    title="Tu descripción abarca más caracteres de los que se
              visualizaran en la carta de tu blog pero se visualizara de
              forma completa en el detalle del blog"
                  >
                    <Typography sx={{ mb: 1.5 }} color="text.primary">
                      {concatDots(data.description, 120)}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography sx={{ mb: 1.5 }} color="text.primary">
                    {concatDots(data.description, 120)}
                  </Typography>
                )
              ) : (
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                  {concatDots(data.description, 120)}
                </Typography>
              )
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

        </Stack>
      </Card>

    </Box>
  );
}
