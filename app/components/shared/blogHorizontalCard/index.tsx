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
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { usePathname } from "next/navigation";
import { Category } from "@/app/data/categories";
import { blogLike } from "@/app/client/blogs";
import { setLoginModal, setLoginRedirection, useCore } from "@/app/context/core";
import { Blog } from "@/app/data/blog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteBlogModal from "../deleteBlogModal";


interface Props {
  data: Blog;
  onDelete: ()=>void

}
export default function BlogHorizontalCard({ data, onDelete }: Props) {
  
  const [{ user }, coreDispatch] = useCore();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false); 
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

  // crear funcion para eliminar
  // crear el endpoint
  // pasar el id del blog al endpoint
  // pasarle la funciòn al confirmModal component y que la ejecute al darle click en aceptar
 
  return (
    <>
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
            <UserAvatar user={{name:data.user.name, lastName: data.user.lastName, image:data.user.avatar}} />
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
          <Box sx={{ marginBottom: 1 }}>
            <CustomTag
              color="secondary"
              crossCallback={null}
              linkCallback={null}
              title={data.category.name}
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
                <IconButton onClick={() => setIsOpenAction(true)}> 
                  < MoreVertIcon/>
                </IconButton>
                {isOpenAction && (
                  <ClickAwayListener onClickAway={() => setIsOpenAction(false)}>
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
                          onClick={() => setIsOpenAction(false)}
                          component={Link}
                          href={"/editar-blog/" + data.slug}
                        >
                          <Typography variant="body1" component={"p"}>
                            Editar
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {setIsOpenAction(false); setShowConfirmModal(true)}}
                        >
                          <Typography variant="body1" component={"p"}>
                            Eliminar
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
              width: 200,
              height: 200,
              borderRadius:4,
              overflow:"hidden"
              // [theme.breakpoints.down("md")]: {
              //   maxWidth: 100,
              //   maxHeight: 100,
              // },
            })}
          >
            <img
              src={data.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Imagen del post"
            />
          </Box>
        </Grid>
      </Grid>
    </CustomCard>
    <DeleteBlogModal show={showConfirmModal} onClose={()=>setShowConfirmModal(false)} targetBlog={data._id} onDelete={onDelete} />
    </>
  );
}
