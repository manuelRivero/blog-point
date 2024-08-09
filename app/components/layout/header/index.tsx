"use client";
import {
  AppBar,
  Toolbar,
  Typography,
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
  setNotification,
} from "@/app/context/core";
import { useRouter } from "next/navigation";
import Link from "next/link";

import firebaseApp from "../../../firebase";
import {
  getToken,
  getMessaging,
  onMessage,
  deleteToken,
} from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { postDeviceId } from "@/app/client/auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileAccountMenu from "../mobileAccountMenu";
import NotificationsWarningModal from "../../shared/NotificationsWarningModal";
import logo from "./../../../assets/images/logo.png";
import Image from "next/image";

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
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setHasPermissions(true);
      } else if (permission === "denied") {
        console.log("Permission denied");
        setHasPermissions(false);
      } else if (permission === "default") {
        console.log("Permission default");
        setHasPermissions(null);
        setAskedForNotifications(null);
      }
    } catch (error) {
      console.log("requestPermission error", error);
    }
  }

  async function handleNotifications() {
    const handleMessage = (event: any) => {
      const { data } = event;
      if (data.idUserBlog === user?.data?._id) {
        let notificationData: any = {
          type: data.type,
          redirectSlug: data.redirectSlug,
          body: data.body,
          title: data.title,
        };

        setNotification(coreDispatch, notificationData);
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
      requestPermission();
    }
  }, [user, askedForNotifications, notificationStatus]);

  useEffect(() => {
    if (hasPermissions && user && !user.tokens?.device_token) {
      handleNotifications();
    }
  }, [user, hasPermissions]);

  console.log(
    "askedForNotifications && hasPermissions",
    askedForNotifications,
    hasPermissions,
    Notification.permission
  );

  return (
    <>
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
                  {isMobile ? (
                    <Stack direction="row" alignItems="center">
                      <Image width={55} height={35} src={logo.src} alt="logo" />
                      <Typography variant="h6" color={"#fff"} component="h1">
                        HM
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="h6" color={"#fff"} component="h1">
                      Historial Medico
                    </Typography>
                  )}
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
              {!user && !isMobile && (
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
                    Crear cuenta
                  </Button>
                </>
              )}
              {!user && isMobile && <MobileAccountMenu />}
              {!isMobile && (
                <Button
                  onClick={handleCreateBlog}
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                >
                  Crear publicación
                </Button>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <NotificationsWarningModal
        showModal={
          askedForNotifications && hasPermissions === null ? true : false
        }
      />
    </>
  );
}
