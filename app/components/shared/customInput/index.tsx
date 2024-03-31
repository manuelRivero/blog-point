"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FieldError } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { sliceText } from "@/app/helpers/text";

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
  placeholder: string;
  maxLength?: number | null;
  // lengthAlert?: {length:number, message:string} | null
  lengthAlertHandler?: { handler: (e: boolean) => void; length: number } | null;
  hasLabel?: boolean;
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
  placeholder,
  maxLength = null,
  lengthAlertHandler,
  hasLabel = true,
}: // lengthAlert = null
Props) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    if (lengthAlertHandler) {
      if (value && value.length >= lengthAlertHandler.length) {
        lengthAlertHandler.handler(true);
      } else {
        lengthAlertHandler.handler(false);
      }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box
      sx={{
        width: "100%",
        "& > .MuiInput-root": {
          width: "100%",
        },
      }}
    >
      {hasLabel && (
        <InputLabel
          sx={(theme) => ({
            marginBottom: ".25rem",
            marginLeft: ".8rem",
          })}
        >
          {label}
        </InputLabel>
      )}
      <Input
        type={passwordVisible ? "text" : type}
        value={value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          if (maxLength) {
            onChange(sliceText(e, maxLength));
          } else {
            onChange(e);
          }
        }}
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
              {passwordVisible ?<VisibilityOffIcon/> :<RemoveRedEyeIcon />}
            </Box>
          ) : null
        }
      />
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", marginTop: "5px" }}
      >
        {error && (
          <Typography
            sx={{ marginLeft: ".8rem", fontSize: 12 }}
            color={"error"}
          >
            {error.message}
          </Typography>
        )}
        {/* {(value && lengthAlert && value.length >= lengthAlert?.length) && (
          <Typography
            sx={{ marginLeft: ".8rem", fontSize: 12 }}
            color={"info"}
          >
            {lengthAlert.message}
          </Typography>
        )} */}
        {maxLength && (
          <Stack direction="row" sx={{ justifyContent: "flex-end", flex: 1 }}>
            <Typography variant={"body1"} fontSize={"10px"}>
              {`${value ? value.length : 0}/${maxLength}`}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
