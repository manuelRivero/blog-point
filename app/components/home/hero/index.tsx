import { Box, Stack, Typography, Button } from "@mui/material";
import React from "react";
import MainSearch from "../../mainSearch";
import CategoryRow from "../categoryRow";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";


export default function Hero() {
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.primary.main,
        height: 470,
      })}
    >
      <Stack sx={{ paddingTop: "2rem", height: "100%" }}>
        <Typography
          variant={"h1"}
          component={"h1"}
          align={"center"}
          color={"#fff"}
          sx={{ marginBottom: 1 }}
        >
          Crea contenido a tu medida
        </Typography>
        <Stack direction="row" justifyContent="center" mb={3}>
          <Button
            component={Link}
            href="/crear-blog"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Crear Blog
          </Button>
        </Stack>
        <Typography
          variant={"h3"}
          component={"h3"}
          align={"center"}
          color={"#fff"}
          sx={{ marginBottom: 2 }}
        >
          Encuentra apuntes, casos clinicos y resumenes de profesores y compañeros
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
