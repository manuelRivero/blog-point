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
              overflow:"auto",
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
              <MenuItem
                component={Link}
                onClick={() => setIsOpen(false)}
                href={"/crear-blog"}
              >
                <NotificationItem />
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={() => setIsOpen(false)}
                href={"/crear-blog"}
              >
                <NotificationItem />
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={() => setIsOpen(false)}
                href={"/crear-blog"}
              >
                <NotificationItem />
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={() => setIsOpen(false)}
                href={"/crear-blog"}
              >
                <NotificationItem />
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={() => setIsOpen(false)}
                href={"/crear-blog"}
              >
                <NotificationItem />
              </MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}

const NotificationItem = () => {
  return (
    <Box sx={{width:"100%"}}>
      <Stack sx={{width:"100%"}}>
        <Typography variant="body1" component="p" sx={{whiteSpace:"break-spaces"}}>María y josé Contreras ha comentado tu blog</Typography>
        <Typography variant="body1" component="p" fontWeight={"bold"} sx={{whiteSpace:"break-spaces"}}>Como prepararse para tu primer día de practicas</Typography>
      </Stack>
    </Box>
  );
};
