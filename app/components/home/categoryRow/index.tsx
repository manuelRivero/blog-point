"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CustomTag from "../../shared/tag";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CategoryRow() {
  const router = useRouter();
  var param = encodeURIComponent("categoría");

  return (
    <>
      <Stack
        marginBottom={4}
        direction="row"
        flexWrap={"wrap"}
        sx={{
          margin: " 0 auto 1rem auto",
          marginBottom: "2rem",
          gap: "1rem",
          maxWidth: "500px",
          justifyContent: "center",
        }}
      >
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
        <CustomTag
          color="secondary"
          title="categoría"
          crossCallback={null}
          linkCallback={() => router.push(`/?category=${param}`)}
        />
      </Stack>
      <Stack spacing={1}>
        <Box onClick={() => {}}>
          <Typography
            sx={{
              margin: "auto",
              display: "block",
              color: "#fff",
              textDecoration: "none",
            }}
            align="center"
            variant="body1"
            href={"/categorias"}
            component={Link}
          >
            Explorar más categorías
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
