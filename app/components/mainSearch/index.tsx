"use client";

import { Box, IconButton, Input, InputAdornment } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

import React from "react";

export default function MainSearch() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        "& > .MuiInput-root": {
          width: "100%",
        },
      }}
    >
      <Input
        sx={(theme) => ({
          "& .MuiInput-root": {
            width: "100%",
            backgroundColor: "#c2c2c2",
          },
          "&: after": {
            display: "none",
          },
          "&: before": {
            display: "none",
          },

          "& .MuiInputBase-input": {
            borderRadius: 4,
            position: "relative",
            backgroundColor: "#fff",
            fontSize: 16,
            width: "100%",
            padding: "10px 12px",
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
        placeholder="Buscar"
        endAdornment={
          <InputAdornment position="end" sx={{position:"absolute", right:'1rem', top:'1.4rem'}}>
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
            >
              <SearchIcon/>
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
}
