import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import React from "react";
interface Props {
  title: string;
  cb: () => void;
  disabled: boolean;
  isLoading: boolean;
  color: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning"
  variant: "outlined" | "contained" | "ghost";
  type:"submit" | "button"
}
export default function CustomButton({
  title,
  cb,
  disabled,
  isLoading,
  color,
  variant,
  type
}: Props) {
  return (
    <Button type={type} variant={variant} onClick={() => cb()} color={color} disabled={disabled}>
      {isLoading ? (
        <CircularProgress size={"1rem"} color="inherit" />
      ) : (
        <Typography>{title}</Typography>
      )}
    </Button>
  );
}
