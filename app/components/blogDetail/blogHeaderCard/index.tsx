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

const avatarData = { name: "Manuel", lastName: "Rivero", image: null };

export default function BlogHeaderCard() {
  const pathname = usePathname();

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
        <Grid item xs={12} sm={8}>
          <Box sx={{ marginBottom: 1 }}>
            <UserAvatar user={avatarData} />
          </Box>
          
          <Typography variant="h4" component={"h1"} sx={{ marginBottom: 1 }}>
            Titulo del Blog
          </Typography>
          <Typography
            variant="body1"
            component={"p"}
            sx={{ marginBottom: "1rem" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum
            orci vitae ipsum venenatis, in porta lacus sagittis. Phasellus
            efficitur interdum lorem, sit amet tincidunt enim elementum vitae
          </Typography>
          <Box sx={{ marginBottom: 1 }}>
            <CustomTag
              color="secondary"
              crossCallback={null}
              linkCallback={null}
              title="Categoría"
            />
          </Box>

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
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
                <ThumbUpIcon />
                <Typography variant="body1" color="primary">
                  50
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
              {moment().format("DD-MM-YYYY")}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          sm={4}
          sx={(theme) => ({
            display: "flex",
            justifyContent: "flex-end",
            [theme.breakpoints.down("md")]: {
              justifyContent: "center",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              width: 250,
              height: 250,
              // [theme.breakpoints.down("md")]: {
              //   maxWidth: 100,
              //   maxHeight: 100,
              // },
            })}
          >
            <img
              src={Image.src}
              style={{ width: "100%", height:"100%",objectFit: "cover" }}
              alt="Imagen del post"
            />
          </Box>
        </Grid>
      </Grid>
    </CustomCard>
  );
}
