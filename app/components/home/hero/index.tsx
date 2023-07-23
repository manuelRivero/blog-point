import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MainSearch from "../../mainSearch";
import CategoryRow from "../categoryRow";

export default function Hero() {
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.primary.main,
        height: 470,
      })}
    >
      <Stack sx={{ paddingTop:"2rem", height: "100%" }}>
        <Typography
          variant={"h1"}
          component={"h1"}
          align={"center"}
          color={"#fff"}
          sx={{ marginBottom: 4 }}
        >
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography
          variant={"h3"}
          component={"h3"}
          align={"center"}
          color={"#fff"}
          sx={{ marginBottom: 4 }}
        >
          Lorem ipsum dolor sit amet
        </Typography>
        <Stack justifyContent={"center"} direction={"row"} mb={2}>
          <MainSearch />
        </Stack>
        <Box>
          <CategoryRow />
        </Box>
      </Stack>
    </Box>
  );
}
