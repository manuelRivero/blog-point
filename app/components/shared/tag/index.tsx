import { Box, Typography } from "@mui/material";
import React from "react";

//icons
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  color: "primary" | "secondary";
  title: string;
  linkCallback: (() => void) | null;
  crossCallback: (() => void) | null;
}
export default function CustomTag({
  color,
  title,
  linkCallback,
  crossCallback,
}: Props) {
  const handleLinkCallback = (e: React.MouseEvent<HTMLElement>) => {
    if (linkCallback) {
      linkCallback();
    }
  };
  const handleCrossCallback = (e: React.MouseEvent<HTMLElement>) => {
    if (crossCallback) {
      crossCallback();
    }
  };
  return (
    <Box
      onClick={handleLinkCallback}
      sx={(theme) => ({
        cursor:"pointer",
        borderRadius: "1rem",
        width: "fit-content",
        backgroundColor: theme.palette[color].main,
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: " 4px 1rem",
      })}
    >
      <Typography variant="body1" color="#fff">{title}</Typography>
      {crossCallback && (
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={handleCrossCallback}
        >
          <CloseIcon />
        </Box>
      )}
    </Box>
  );
}
