"use client";
import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NotificationBox from "../../shared/notificationBox";


interface Notification {
    user: { name: string; lastName: string; image: string | null };
    action: "like-post" | "like-comment" | "like-response";
    blogName: string;
    link: string;
}
const notifications:Notification[] = [
  {
    user: { name: "María Y José", lastName: "Contreras Goméz", image: null },
    action: 'like-post',
    blogName: "Primer blog de prueba",
    link: "primer-blog-de-prueba",
  },
  {
    user: { name: "María Y José", lastName: "Contreras Goméz", image: null },
    action: 'like-comment',
    blogName: "Primer blog de prueba",
    link: "primer-blog-de-prueba",
  },
  {
    user: { name: "María Y José", lastName: "Contreras Goméz", image: null },
    action: 'like-response',
    blogName: "Primer blog de prueba",
    link: "primer-blog-de-prueba",
  },
];
export default function NotificationDropdown() {
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
              height: "fit-content",
              transform: "translateY(100%)",
              zIndex: 100,
            }}
          >
            <MenuList>
              {notifications.map((e, i) => {
                return (
                  <MenuItem
                    key={i}
                    component={Link}
                    onClick={() => setIsOpen(false)}
                    href={"/detalle-del-blog/1"}
                  >
                    <NotificationBox data={e} />
                  </MenuItem>
                );
              })}
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
