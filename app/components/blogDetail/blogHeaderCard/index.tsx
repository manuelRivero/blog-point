"use client";
import React, { useState } from "react";
import CustomCard from "../../shared/card";
import {
  Box,
  Grid,
  Typography,
  Stack,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";
import Image from "./../../../assets/images/post-placeholder.jpg";
import UserAvatar from "../../shared/UserAvatar";
import moment from "moment";
import CustomTag from "../../shared/tag";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { usePathname } from "next/navigation";
import { Category } from "@/app/data/categories";
import { blogLike } from "@/app/client/blogs";
import { setLoginModal, setLoginRedirection, useCore } from "@/app/context/core";

const avatarData = { name: "Manuel", lastName: "Rivero", image: null };
interface Props {
  data: {
    _id: string;
    user: { _id: string; avatar: string | null; name: string; lastName: string; slug: string };
    title: string;
    description: string;
    content: string;
    likes: [];
    slug: string;
    image: string;
    createdAt: string;
    category: Category;
    targetLike: boolean
  };
}
export default function BlogHeaderCard({ data }: Props) {
  console.log("BlogHeaderCard", data)
  const [{ user }, coreDispatch] = useCore();
  const pathname = usePathname();
  const [isLiked, setIsLiked] = useState<boolean>(data.targetLike)
  const [likeCount, setLikeCount] = useState<number>(data.likes.length)

  const handleLike = async () => {
    try {
      if (!user) {
        setLoginRedirection(coreDispatch, `/detalle-del-blog/${data.slug}`)
        setLoginModal(coreDispatch, true);
      } else {
        const response = await blogLike(data.slug)
        if (isLiked) {
          setLikeCount(likeCount - 1)
        } else {
          setLikeCount(likeCount + 1)
        }
        setIsLiked(!isLiked)

      }
    } catch (error) {
      console.log("error like", error)
    }
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <CustomCard>
      <Grid
        container
        spacing={4}
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            flexDirection: "column-reverse",
          },
        })}
      >
        <Grid item xs={12} sm={12}>
          <Box sx={{ marginBottom: 1 }}>
            <UserAvatar user={{ image: data.user.avatar, name: data.user.name, lastName: data.user.lastName, slug: data.user.slug }} />
          </Box>

          <Box sx={{ marginBottom: 1 }}>
            <CustomTag
              color="secondary"
              crossCallback={null}
              linkCallback={null}
              title={data.category.name}
            />
          </Box>
          <Typography variant="h4" component={"h1"} sx={{ marginBottom: 1 }}>
            {data.title}
          </Typography>
          <Typography
            variant="body1"
            component={"p"}
            sx={{ marginBottom: "1rem" }}
          >
            {data.description}
          </Typography>

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center", width:"100%" }}
          >
            <Stack
              sx={{ justifyContent: "flex-start" }}
              spacing={1}
              direction={"row"}
            >
              <Stack
                spacing={"5px"}
                direction={"row"}
                sx={(theme) => ({
                  color: theme.palette.primary.main,
                  alignItems: "center",
                })}
              >
                <ThumbUpIcon onClick={() => handleLike()} sx={{ cursor: "pointer" }} color={isLiked ? "primary" : "disabled"} />
                <Typography variant="body1" color="primary">
                  {likeCount}
                </Typography>
              </Stack>
              <Box sx={{ position: "relative" }}>
                <IconButton onClick={() => setIsOpen(true)}>
                  <ShareIcon />
                </IconButton>
                {isOpen && (
                  <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    <Paper
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 320,
                        height: "fit-content",
                        transform: "translateY(100%)",
                        zIndex: 100,
                      }}
                    >
                      <MenuList>
                        <MenuItem
                          component={"a"}
                          onClick={() => setIsOpen(false)}
                          href={
                            "https://www.facebook.com/sharer/sharer.php?u=" +
                            pathname
                          }
                          target="_blank"
                        >
                          <Typography variant="body1" component={"p"}>
                            Compartir en Facebook
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          component={"a"}
                          onClick={() => setIsOpen(false)}
                          href={"/"}
                          target="_blank"
                        >
                          <Typography variant="body1" component={"p"}>
                            Compartir en Twitter
                          </Typography>
                        </MenuItem>
                      </MenuList>
                    </Paper>
                  </ClickAwayListener>
                )}
              </Box>
            </Stack>
            <Typography fontSize={"14px"}>
              {moment(data.createdAt).format("DD-MM-YYYY")}
            </Typography>
          </Stack>
        </Grid>

      </Grid>
    </CustomCard >
  );
}
