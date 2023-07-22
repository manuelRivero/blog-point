import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MainSearch from "../mainSearch";
import heroImage from "./../../assets/images/hero-1.png"

export default function Hero() {
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.primary.main,
        height: 400,
      })}
    >
      <Stack justifyContent={"center"} sx={{ height: "100%"}}>
        <Typography variant={"h1"} component={"h1"} align={"center"} color={"#fff"} sx={{marginBottom:4}}>
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography variant={"h3"} component={"h3"} align={"center"} color={"#fff"} sx={{marginBottom:4}}>
          Lorem ipsum dolor sit amet
        </Typography>
        <Stack justifyContent={"center"} direction={"row"} mb={4}>
          <MainSearch />
        </Stack>
      </Stack>
    </Box>
  );
}
