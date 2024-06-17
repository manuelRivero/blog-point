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
import MenuIcon from '@mui/icons-material/Menu';import {
    useCore,
    setLoginModal,
    setRegisterModal,
  } from "@/app/context/core";

export default function MobileAccountMenu() {
  const [_, coreDispatch] = useCore();
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
        <MenuIcon fontSize={'medium'} />
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
            <MenuItem onClick={() => setLoginModal(coreDispatch, true)}>
              <Typography variant="body1" component={"p"}>
               Iniciar sesión
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => setRegisterModal(coreDispatch, true)}>
              <Typography variant="body1" component={"p"}>
               Crear cuenta
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
       </ClickAwayListener>
        
      )}
    </Box>
  );
}
