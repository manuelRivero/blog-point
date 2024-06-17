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

import React, { useState } from "react";
import HeaderMenu from "../headerMenu";
import NotificationDropdown from "../notificationDropdown";
import {
  useCore,
  setLoginModal,
  setRegisterModal,
  setLoginRedirection,
  setDeviceToken,
  setNotificationsData,
  setNotification,
} from "@/app/context/core";
import { useRouter } from "next/navigation";
import Link from "next/link";

import firebaseApp from "../../../firebase";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { postDeviceId } from "@/app/client/auth";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Header() {
  const isMobile = useMediaQuery("(max-width:1024px)");

  const [{ user }, coreDispatch] = useCore();
  const router = useRouter();
  const [askedForNotifications, setAskedForNotifications] = useState<
    boolean | null
  >(null);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const isSupported = () =>
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;
  const [notificationStatus, setNotificationStatus] = useState<string>(
    typeof window !== "undefined" && isSupported()
      ? Notification.permission
      : "default"
  );

  const handleCreateBlog = () => {
    if (!user) {
      setLoginRedirection(coreDispatch, "/crear-blog");
      setLoginModal(coreDispatch, true);
    } else {
      router.push("/crear-blog");
    }
  };

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    console.log("permissions", permission);
    if (permission === "granted") {
      setHasPermissions(true);
    } else if (permission === "denied") {
      setHasPermissions(false);
      console.log("Denied for the notification");
    } else if (permission === "default") {
      setHasPermissions(null);
      console.log("Default for the notification");
    }
  }

  async function handleNotifications() {
    const handleMessage = (event: any) => {
      const { data } = event;
      if (data.idUserBlog === user?.data?._id) {
        setNotification(coreDispatch, {
          type: data.type,
          blogName: data.titleBlog,
          title: data.title,
          body: data.body,
          blogSlug: data.slugBlog,
        });
        toast(
          <Box>
            <Typography variant="h6">{data.title} </Typography>
            <Typography variant="body1">{data.body} </Typography>
          </Box>
        );
      }
    };
    const messaging = getMessaging(firebaseApp);
    // Generate Device Token for notification

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });
    if (token) {
      setDeviceToken(coreDispatch, token);
      await postDeviceId(token);
      console.log("token message", token);
      onMessage(messaging, (payload) => {
        handleMessage(payload);
      });
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  }

  useEffect(() => {
    if (
      user &&
      !user.tokens?.device_token &&
      (notificationStatus === "default" ? askedForNotifications : true)
    ) {
      console.log("user", user);
      requestPermission();
    }
  }, [user, askedForNotifications, notificationStatus]);

  useEffect(() => {
    if (hasPermissions && user && !user.tokens?.device_token) {
      handleNotifications();
    }
  }, [user, hasPermissions]);

  return (
    <AppBar
      position="static"
      sx={{
        height: 60,
        borderBottom: "solid 1px #fff",
        justifyContent: "center",
      }}
    >
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
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box>
              <Link href={"/"} style={{ textDecoration: "none" }}>
                <Typography variant="h6" color={"#fff"} component="h1">
                  Historial Medico
                </Typography>
              </Link>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {user && (
              <>
                <Box>
                  <HeaderMenu />
                </Box>
                <Box position="relative">
                  <NotificationDropdown
                    hasPermissions={hasPermissions}
                    askedForNotifications={askedForNotifications}
                    setAskedForNotifications={() =>
                      setAskedForNotifications(true)
                    }
                  />
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
            {!isMobile && (
              <Button
                onClick={handleCreateBlog}
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
              >
                Crear Blog
              </Button>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
