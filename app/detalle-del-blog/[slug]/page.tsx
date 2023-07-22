import BlogHeaderCard from "@/app/components/blogDetail/blogHeaderCard";
import { Container } from "@mui/material";
import React from "react";

export default function BlogDetail() {
  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
      <BlogHeaderCard />
      <div>BlogDetail</div>
    </Container>
  );
}
