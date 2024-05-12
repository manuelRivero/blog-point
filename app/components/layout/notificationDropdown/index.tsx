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
import { useCore } from "@/app/context/core";
import SettingsIcon from "@mui/icons-material/Settings";
import { Notification } from "@/app/data/notifications";

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
  console.log("notification status", askedForNotifications, hasPermissions);
  const [{ notifications }] = useCore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
              padding: 2,
              height: "fit-content",
              transform: "translateY(100%)",
              zIndex: 100,
            }}
          >
            <MenuList>
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
              {(askedForNotifications &&
                hasPermissions) || hasPermissions &&
                notifications.map((e:Notification, i) => {
                  return (
                    <MenuItem
                      key={i}
                      component={Link}
                      onClick={() => setIsOpen(false)}
                      href={"/detalle-del-blog/" + e.blogSlug}
                    >
                      <NotificationBox data={e} />
                    </MenuItem>
                  );
                })}
              {(askedForNotifications &&
                hasPermissions) || hasPermissions &&
                notifications.length === 0 && (
                  <Typography variant="body1">No hay notificaciones</Typography>
                )}
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
