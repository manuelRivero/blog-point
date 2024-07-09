"use client";
import React, { useState } from "react";
import {
  Typography,
  MenuItem,
  MenuList,
  Paper,
  Divider,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { ClickAwayListener } from '@mui/base';
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useCore, logout } from "@/app/context/core";
import { useRouter } from "next/navigation";

export default function HeaderMenu() {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const router = useRouter()
  const [{user}, coreDispatch] = useCore();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <Box
      sx={{
        position: "relative",
        color:"#fff"
      }}
    >
      <IconButton
        onClick={() => setIsOpen(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <Avatar alt={user?.data?.name} src={user?.data?.avatar} />
        {/* <PermIdentityIcon fontSize={'medium'} /> */}
      </IconButton>

      {isOpen && (
         <ClickAwayListener onClickAway={()=> setIsOpen(false)}>
         <Paper
          sx={(theme)=>({
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 200,
            height: "fit-content",
            transform: "translateY(100%)",
            zIndex: 100,
            [theme.breakpoints.down("lg")]: {
              width: 150,
            }
          })}
        >
          <MenuList>
            {isMobile && <MenuItem component={Link} onClick={()=> setIsOpen(false)} href={"/crear-blog"}>
              <Typography variant="body1" component={"p"}>
                Crear blog
              </Typography>
            </MenuItem>}
            <MenuItem component={Link} onClick={()=> setIsOpen(false)} href={"/mis-blogs"}>
              <Typography variant="body1" component={"p"}>
                Mis blogs
              </Typography>
            </MenuItem>
            <MenuItem component={Link} onClick={()=> setIsOpen(false)} href={`/perfil/${user?.data?.slug}`}>
              <Typography variant="body1" component={"p"}>
                Perfil
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem  onClick={()=> {setIsOpen(false); logout(coreDispatch); router.push("/")}} >
              <Typography variant="body1" component={"p"}>
                Cerrar sesión
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
       </ClickAwayListener>
        
      )}
    </Box>
  );
}
