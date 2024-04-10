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
  setDeviceToken,
} from "@/app/context/core";
import { useRouter } from "next/navigation";
import Link from "next/link";

//prueba
import { getAuth, signInAnonymously } from "firebase/auth";
import { messaging } from "../../../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { postDeviceId } from "@/app/client/auth";

//prueba

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

  useEffect(() => {
    if (user) {
      //prueba
      const activarMensajes = async () => {
        const tokenMessaje = await getToken(messaging, {
          vapidKey:
            "BKFAZkkrTjlng6q3pxqSYAwd0IpE7mc263-eWGAQtqfrkPx737IlAbDbI3NgW1qSdXfJU9rax-WexFGUFCJUkYM",
        }).catch((error) => console.log("error al generar el token message"));

        setDeviceToken(coreDispatch, tokenMessaje);
        
        if (tokenMessaje){
          await postDeviceId(tokenMessaje)
          console.log("token message", tokenMessaje);
        } 
        if (!tokenMessaje) console.log("no hay token");
      };

     
        // const auth = getAuth();
        // console.log("usuario autenticado firebase", auth);
        activarMensajes();
        onMessage(messaging, (message) => {
          console.log("tu mensaje", message);
          toast(message.notification?.title);

          // const auth = authUser;
          const auth = getAuth();
          console.log("usuario autenticado firebase", auth);
        });
      
      //prueba
    }
  }, [user]);

  return (
    <AppBar position="static" sx={{ height: 60, justifyContent: "center" }}>
      <ToastContainer />
      <Toolbar variant="dense" sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box>
                <Typography variant="h6" color={"#fff"} component="h1">
                  Blog App
                </Typography>
              </Box>
            </Stack>
          </Link>

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
