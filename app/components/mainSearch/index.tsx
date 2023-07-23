"use client";

import {
  Box,
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function MainSearch() {
  const inputRef = useRef<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const searchHandler = () => {
    if (inputRef.current.length >= 3) {
      setIsOpen(true);
      console.log("ref value", inputRef.current);
    } else {
      setIsOpen(false);

    }
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(searchHandler, 1000),
    []
  );
  const getHighlightedText = (text: string, highlight: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        position: "relative",
        "& > .MuiInput-root": {
          width: "100%",
        },
      }}
    >
      <Input
        ref={inputRef}
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          debouncedChangeHandler();
          setValue(e.target.value);
          inputRef.current = e.target.value;
        }}
        endAdornment={
          <InputAdornment
            position="end"
            sx={{ position: "absolute", right: "1rem", top: "1.4rem" }}
          >
            <IconButton aria-label="toggle password visibility" edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Paper
            sx={{
              borderRadius: 4,
              padding: 2,
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              transform: "translateY(100%) translateY(5px)",
            }}
          >
            <MenuList>
              <MenuItem href={"/detalle-del-blog/1"} component={Link}>
                {getHighlightedText("Mis primeras practicas", value)}
              </MenuItem>
              <MenuItem href={"/detalle-del-blog/1"} component={Link}>
              {getHighlightedText("Practicas en el hospital", value)}
              </MenuItem>
              <MenuItem href={"/detalle-del-blog/1"} component={Link}>
                Post con un titulo similar a la busqueda
              </MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
