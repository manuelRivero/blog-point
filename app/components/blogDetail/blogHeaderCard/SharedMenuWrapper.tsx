"use client";
import React, { useState } from "react";
import {
  Box,
  ClickAwayListener,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

interface Props {
  url: string;
}
export default function SharedMenuWrapper({ url }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton onClick={() => setIsOpen(true)}>
        <ShareIcon />
      </IconButton>
      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Paper
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 320,
              height: "fit-content",
              transform: "translateY(100%)",
              zIndex: 100,
            }}
          >
            <MenuList>
              <MenuItem
                component={"a"}
                onClick={() => setIsOpen(false)}
                href={"https://www.facebook.com/sharer/sharer.php?u=" + url}
                target="_blank"
              >
                <Typography variant="body1" component={"p"}>
                  Compartir en Facebook
                </Typography>
              </MenuItem>
              {/* <MenuItem
                          component={"a"}
                          onClick={() => setIsOpen(false)}
                          href={"/"}
                          target="_blank"
                        >
                          <Typography variant="body1" component={"p"}>
                            Compartir en Twitter
                          </Typography>
                        </MenuItem> */}
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
