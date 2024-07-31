"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCore } from "@/app/context/core";
import BackButton from "../../shared/BackButton";
import { useSearchParams } from "next/navigation";
import { createAccessToken } from "@/app/client/user";

export default function LinkingContentWrapper() {
  const searchParams = useSearchParams();
  console.log("searchParams", new URLSearchParams(searchParams.toString()).get("code"));
  

  useEffect(() => {
    const code = new URLSearchParams(searchParams.toString()).get("code");
    const getData = async () => {
      if (code) {
        try {
          const response = await createAccessToken(code);
          console.log("LinkingAccount", response);
        } catch (error) {
          console.log("LinkingAccount error:", error.response);
        }
      }
    };

    getData();
  }, [searchParams]);

  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <BackButton />
      <Typography variant="h1" component={"h1"} align="center" mb={3}>
        Procesando vinculación
      </Typography>
    </Container>
  );
}
