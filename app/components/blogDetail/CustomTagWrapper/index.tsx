"use client"
import { Box } from "@mui/material";
import React from "react";
import CustomTag from "../../shared/tag";

interface Props {
    name: string;
}

export default function CustomTagWrapper({name}: Props) {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <CustomTag color="secondary" title={name} />
    </Box>
  );
}
