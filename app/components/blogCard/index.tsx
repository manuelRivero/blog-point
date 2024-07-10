"use client";
import React, { useEffect } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  data: Data;
  preview: boolean;
  showTitleTooltip: boolean;
  showDescriptionTooltip: boolean;
  userAvatar: {
    name: string;
    lastName: string;
    image: string | null;
    slug: string;
  };
}
interface Data {
  title: string;
  image: string | null;
  description: string;
  date?: string;
  link?: string;
  rate?: number;
  category: string;
  slug?: string;
}
export default function BlogCard({
  data,
  preview,
  showTitleTooltip,
  showDescriptionTooltip,
  userAvatar,
}: Props) {
  const isMobile = useMediaQuery("(max-width:1200px)");

  return (
    <Box
      sx={{
        textDecoration: "none",
        width: "100%",
      }}
    >
      <Card
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          width: "100%",
          boxShadow: " 0 0 15px -5px rgba(0,0,0, .5)",
        }}
      >
        <CardHeader
          sx={{
            paddingTop: 0,
            paddingLeft: 0,
            paddingBottom: { xs: 1, lg: 2 },
          }}
          avatar={<Avatar user={userAvatar} />}
        />
        <Link
          href={"/detalle-del-blog/" + data.slug}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Stack direction={"row"} gap={{ xs: 2, lg: 4 }}>
            <CardContent
              sx={{
                width: "100%",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: " 0 !important ",
                textDecoration: "none",
                paddingLeft: { xs: " 0 !important " },
              }}
            >
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
              </Stack>

              {data.title ? (
                <Typography
                  variant="h5"
                  color="text.primary"
                  component="h4"
                  sx={{ mb: 1, fontSize: { xs: "14px" } }}
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
              {data.description &&
                (preview ? (
                  showDescriptionTooltip ? (
                    <Tooltip
                      title="Tu descripción abarca más caracteres de los que se
              visualizaran en la carta de tu blog pero se visualizara de
              forma completa en el detalle del blog"
                    >
                      <Typography
                        sx={{ mb: 1.5, display: { xs: "none", lg: "block" } }}
                        color="text.primary"
                      >
                        {concatDots(data.description, 120)}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      sx={{ mb: 1.5, display: { xs: "none", lg: "block" } }}
                      color="text.primary"
                    >
                      {concatDots(data.description, 120)}
                    </Typography>
                  )
                ) : (
                  <Typography
                    sx={{ mb: 1.5, display: { xs: "none", lg: "block" } }}
                    color="text.primary"
                  >
                    {concatDots(data.description, 120)}
                  </Typography>
                ))}
              {console.log("preview", preview)}
              {preview ? (
                <Typography fontSize={"14px"} align="left">
                  {moment().format("DD-MM-YYYY")}
                </Typography>
              ) : (
                <Typography fontSize={"14px"} align="left">
                  {moment(data.createdAt).format("DD-MM-YYYY")}
                </Typography>
              )}
            </CardContent>
            <CardMedia
              sx={{
                borderRadius: "1rem",
                xs: { display: "none" },
                width: { xs: "100px" },
                height: { xs: "100px" },
                objectFit: "cover",
              }}
              component="img"
              image={data.image ? data.image : Image.src}
              alt="Paella dish"
            />
          </Stack>
        </Link>
      </Card>
    </Box>
  );
}
