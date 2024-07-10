import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

//icons
import CloseIcon from "@mui/icons-material/Close";
import { concatDots } from "@/app/helpers/text";

interface Props {
  color: "primary" | "secondary";
  title: string;
  linkCallback?: (() => void) | null;
  crossCallback?: (() => void) | null;
}
export default function CustomTag({
  color,
  title,
  linkCallback = null,
  crossCallback  = null,
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
        cursor: "pointer",
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
      <Tooltip title={title}>
        <Typography variant="body1" sx={{whiteSpace:"nowrap", overflow:"hidden", maxWidth:"120px", textOverflow: "ellipsis"}} color="#fff" fontSize={14}>{concatDots(title, 16)}</Typography>
      </Tooltip>
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
