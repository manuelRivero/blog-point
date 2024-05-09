"use client";
import React, { useEffect, useState } from "react";
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
  Switch,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NotificationBox from "../../shared/notificationBox";
import { useCore } from "@/app/context/core";
import SettingsIcon from '@mui/icons-material/Settings';



export default function SettingsMenu() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    
    useEffect(()=>{
        const getPermissionsData = async ()=> {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                setShowNotification(true)
            } else {
                setShowNotification(false)
    
            }

        }
        getPermissionsData()
    },[])
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
        <SettingsIcon fontSize={"medium"} />
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
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
