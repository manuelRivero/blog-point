import { AppBar, IconButton, Toolbar, Typography, MenuItem, MenuList } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";
import HeaderMenu from "../headerMenu";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        
        <HeaderMenu />
        <Typography variant="h6" color="inherit" component="h1">
          Post App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
