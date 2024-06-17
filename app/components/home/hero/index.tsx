"use client"
import { Box, Stack, Typography, Button } from "@mui/material";
import React from "react";
import MainSearch from "../../mainSearch";
import CategoryRow from "../categoryRow";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { setLoginModal, setLoginRedirection, useCore } from "@/app/context/core";
import { useRouter } from "next/navigation";
import { Category } from "@/app/data/categories";

interface Props {
  categories: Category[]
}

export default function Hero({categories}:Props) {
  const [{ user }, coreDispatch] = useCore();
  const router = useRouter();
  const handleCreateBlog = () => {
    if(!user){
      setLoginRedirection(coreDispatch,"/crear-blog")
      setLoginModal(coreDispatch, true);
    }else {
      router.push("/crear-blog");
    }
  }
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.primary.main,
      })}
    >
      <Stack sx={{ padding: "2rem", height: "100%" }}>
        <Typography
          variant={"h1"}
          component={"h1"}
          align={"center"}
          color={"#fff"}
          sx={{ marginBottom: 4 }}
        >
          Contenido personalizado
        </Typography>
        
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
      </Stack>
    </Box>
  );
}
