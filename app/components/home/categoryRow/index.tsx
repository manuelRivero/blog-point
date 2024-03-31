"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CustomTag from "../../shared/tag";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category } from "@/app/data/categories";

interface Props {
  categories: Category[]
}

export default function CategoryRow({categories}:Props) {
  const router = useRouter();
  var param = encodeURIComponent("categoría");

  return (
    <>
    <Typography variant="h3" sx={{marginBottom:2}}>
      Descubre más categorias
    </Typography>
      <Stack
        marginBottom={4}
        direction="row"
        flexWrap={"wrap"}
        sx={{
          margin: " 0 auto 1rem auto",
          marginBottom: "2rem",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        {categories.map((category:Category)=>{
          return (
            <CustomTag
            key={category._id}
            color="secondary"
            title={category.name}
            crossCallback={null}
            linkCallback={() => router.push(`/?category=${category._id}`)}
          />
          )
        })}
       
      </Stack>
      <Stack spacing={1}>
        <Box onClick={() => {}}>
          <Typography
            sx={{
              textDecoration:"none",
              margin: "auto",
              display: "block",
            }}
            align="center"
            variant="body1"
            href={"/"}
            component={Link}
          >
            Explorar más categorías
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
