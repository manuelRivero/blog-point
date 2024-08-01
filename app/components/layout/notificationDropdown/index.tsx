"use client";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NotificationBox from "../../shared/notificationBox";
import {
  setNotificationsData,
  setNotificationsMetaData,
  useCore,
} from "@/app/context/core";
import SettingsIcon from "@mui/icons-material/Settings";
import { Notification } from "@/app/data/notifications";
import { getNotifications } from "@/app/client/notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../shared/loader";

interface Props {
  askedForNotifications: boolean | null;
  setAskedForNotifications: () => void;
  hasPermissions: boolean | null;
}

export default function NotificationDropdown({
  askedForNotifications,
  setAskedForNotifications,
  hasPermissions,
}: Props) {
  const [{ notificationsData, notificationsMetaData }, dispatch] = useCore();
  const [page, setPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isSupported = () =>
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  const notificationTypes = {
    comment: `/detalle-del-blog/`,
    "like-post": `/detalle-del-blog/`,
    response: "/detalle-del-blog/",
    follow: `/perfil/`,
  };

  const getData = async () => {
    console.log("getData");

    try {
      const { data } = await getNotifications(page + 1, 10);
      setPage((prev) => prev + 1);

      setNotificationsData(dispatch, [
        ...data.notifications[0].data.map((e: any) => ({
          type: e.type,
          redirectSlug: e.redirectSlug,
          body: e.body,
          title: e.title,
        })),
        ...notificationsData,
      ]);
      setNotificationsMetaData(dispatch, data.notifications[0].metadata[0]);
    } catch (error) {
      console.log("Trending error", error);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        color: "#fff",
      }}
    >
      <IconButton
        onClick={() => setIsOpen(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <NotificationsNoneIcon fontSize={"medium"} />
      </IconButton>

      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Paper
            sx={{
              maxHeight: 500,
              overflow: "auto",
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 320,
              padding: .5,
              transform: "translateY(100%)",
              zIndex: 100,
              height: 200,
            }}
            id="scrollableDiv"
          >
            {isSupported() ? (
              <MenuList sx={{ height: "100%" }}>
                {!askedForNotifications && !hasPermissions && (
                  <Box>
                    <Typography variant="body1">
                      Activa las notificaciones
                    </Typography>
                    <Switch
                      checked={Boolean(askedForNotifications && hasPermissions)}
                      onChange={() => setAskedForNotifications()}
                      size="small"
                    />
                  </Box>
                )}
                {askedForNotifications && hasPermissions === false && (
                  <Box>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      Las notificaciones están deshabilitadas en este navegador
                    </Typography>
                    <Button variant="outlined">¿Como activarlas?</Button>
                  </Box>
                )}
                {askedForNotifications && hasPermissions === null && (
                  <Box>
                    <Typography variant="body1">Ya casi estamos</Typography>
                  </Box>
                )}
                <InfiniteScroll
                  scrollableTarget="scrollableDiv"
                  style={{ height: "250px" }}
                  dataLength={notificationsMetaData.count} //This is important field to render the next data
                  next={getData}
                  hasMore={Boolean(
                    notificationsMetaData.count > notificationsData.length
                  )}
                  loader={<Loader />}
                  endMessage={
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant={"body1"} sx={{ marginTop: 2 }}>
                        No hay más notificaciones
                      </Typography>
                    </Stack>
                  }
                >
                  {hasPermissions &&
                    notificationsData.reverse().map((e: Notification, i) => {
                      console.log(e);

                      return (
                        <MenuItem
                          key={i}
                          component={Link}
                          onClick={() => setIsOpen(false)}
                          href={`${notificationTypes[e.type] + e.redirectSlug}`}
                          sx={{borderBottom:'solid 1px rgba(0,0,0, .1)'}}
                        >
                          <NotificationBox data={e} />
                        </MenuItem>
                      );
                    })}
                </InfiniteScroll>
              </MenuList>
            ) : (
              <MenuList sx={{ height: "100%" }}>
                <InfiniteScroll
                  scrollableTarget="scrollableDiv"
                  dataLength={notificationsMetaData.count} //This is important field to render the next data
                  next={getData}
                  hasMore={Boolean(
                    notificationsMetaData.count > notificationsData.length
                  )}
                  loader={<Loader />}
                  endMessage={
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant={"body1"} sx={{ marginTop: 2 }}>
                        No hay más notificaciones
                      </Typography>
                    </Stack>
                  }
                >
                  {!isSupported() &&
                    notificationsData.reverse().map((e: Notification, i) => {
                      return (
                        <MenuItem
                          key={i}
                          component={Link}
                          onClick={() => setIsOpen(false)}
                          href={`${notificationTypes[e.type] + e.redirectSlug}`}
                        >
                          <NotificationBox data={e} />
                        </MenuItem>
                      );
                    })}
                </InfiniteScroll>
              </MenuList>
            )}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
