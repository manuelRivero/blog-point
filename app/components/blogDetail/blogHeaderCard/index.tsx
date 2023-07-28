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
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h1"
            component={"h1"}
            sx={{ marginBottom: "1rem" }}
          >
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
            <UserAvatar user={avatarData} />
          </Box>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <CustomTag
              color="secondary"
              crossCallback={null}
              linkCallback={null}
              title="Categoría"
            />

            <Typography fontSize={"14px"} sx={{ marginBottom: "1rem" }}>
              {moment().format("DD-MM-YYYY")}
            </Typography>
          </Stack>
          <Stack
            sx={{ marginTop: 1, justifyContent: "space-between" }}
            direction={"row"}
          >
            <Stack
              spacing={"5px"}
              direction={"row"}
              sx={(theme) => ({ color: theme.palette.primary.main })}
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
        </Grid>
        <Grid item sm={6}>
          <Box
            sx={(theme) => ({
              maxWidth: 400,
              maxHeight: 400,
              [theme.breakpoints.down("md")]: {
                maxWidth: 100,
                maxHeight: 100,
              },
            })}
          >
            <img
              src={Image.src}
              style={{ width: "100%", objectFit: "cover" }}
              alt="Imagen del post"
            />
          </Box>
        </Grid>
      </Grid>
    </CustomCard>
  );
}
