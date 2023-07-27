"use client";

import React, { useState } from "react";
import { Box, IconButton, Input, InputLabel, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FieldError } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface Props {
  label: string;
  outline?: boolean;
  outlineColor?: string;
  multiline?: boolean;
  type: "text" | "password";
  rows?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  error: FieldError | undefined;
  placeholder: string
}
export default function CustomInput({
  label,
  outline = false,
  outlineColor,
  multiline = false,
  rows = 1,
  value,
  onChange,
  error,
  type,
  placeholder
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  return (
    <Box
      sx={{
        width: "100%",
        "& > .MuiInput-root": {
          width: "100%",
        },
      }}
    >
      <InputLabel
        sx={(theme) => ({
          marginBottom: ".25rem",
          marginLeft: ".8rem",
        })}
      >
        {label}
      </InputLabel>
      <Input
        type={passwordVisible ? "text" : type}
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        sx={(theme) => ({
          position: "relative",
          "&: after": {
            display: "none",
          },
          "&: before": {
            display: "none",
          },

          "& .MuiInputBase-input": {
            borderRadius: 2,
            position: "relative",
            backgroundColor: "#fff",
            fontSize: 16,
            width: "100%",
            padding: "10px 12px",
            border: outline
              ? `1px solid ${
                  outlineColor
                    ? outlineColor
                    : alpha(theme.palette.primary.main, 0.25)
                }`
              : "",
            transition: theme.transitions.create([
              "border-color",
              "background-color",
              "box-shadow",
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: "OpenSans",
            "&:focus": {
              boxShadow: `${alpha(
                theme.palette.primary.main,
                0.25
              )} 0 0 0 0.2rem`,
              borderColor: theme.palette.primary.main,
            },
          },
        })}
        placeholder={placeholder}
        endAdornment={
          type === "password" ? (
            <Box
              onClick={() => setPasswordVisible(!passwordVisible)}
              sx={(theme) => ({
                cursor: "pointer",
                color: theme.palette.primary.main,
                position: "absolute",
                top: "10px",
                right: "10px",
              })}
            >
              <RemoveRedEyeIcon />
            </Box>
          ) : null
        }
      />
      {error && (
        <Typography sx={{ marginLeft: ".8rem", fontSize: 14 }} color={"error"}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
