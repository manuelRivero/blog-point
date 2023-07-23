"use client"
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  MenuList,
  Button,
  Stack,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React from "react";
import HeaderMenu from "../headerMenu";
import NotificationDropdown from "../notificationDropdown";
import Link from "next/link";
import { useCore, setLoginModal } from "@/app/context/core";

export default function Header() {
  const [{}, coreDispatch] = useCore();

  return (
    <AppBar position="static" sx={{ height: 60, justifyContent: "center" }}>
      <Toolbar variant="dense" sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="h6" color={"#fff"} component="h1">
              Blog App
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box>
              <HeaderMenu />
            </Box>
            <Box>
              <NotificationDropdown />
            </Box>
            <Button
              onClick={() => setLoginModal(coreDispatch, true)}
              variant="outlined"
              color="primary"
              sx={{
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                },
              }}
            >
              Inicia sesión
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                },
              }}
            >
              Registrate
            </Button>
            <Button
              component={Link}
              href="/crear-blog"
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              Crear Blog
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
