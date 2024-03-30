"use client";
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
import {
  useCore,
  setLoginModal,
  setRegisterModal,
  setLoginRedirection,
} from "@/app/context/core";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [{ user }, coreDispatch] = useCore();
  const router = useRouter();
  const handleCreateBlog = () => {
    if (!user) {
      setLoginRedirection(coreDispatch, "/crear-blog");
      setLoginModal(coreDispatch, true);
    } else {
      router.push("/crear-blog");
    }
  };

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
            <Box component={Link} href={"/"}>
              <Typography variant="h6" color={"#fff"} component="h1">
                Blog App
              </Typography>
              {/* <Button sx={{color:'white'}}>
                Blog App
              </Button> */}
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {user && (
              <>
                <Box>
                  <HeaderMenu />
                </Box>
                <Box>
                  <NotificationDropdown />
                </Box>
              </>
            )}
            {!user && (
              <>
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
                  onClick={() => setRegisterModal(coreDispatch, true)}
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
              </>
            )}
            <Button
              onClick={handleCreateBlog}
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
