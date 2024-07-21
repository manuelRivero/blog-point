"use client";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  
 const handleGoBack = () => {
    if (window.history?.length && window.history.length > 0) {
      router.back();
      router.refresh()
   } else {
      router.replace("/");
   }
  }

  return (
    <IconButton onClick={() => handleGoBack()} sx={{ marginBottom: 2 }}>
      <ArrowBackIcon />
    </IconButton>
  );
}

