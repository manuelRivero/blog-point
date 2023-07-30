import BlogHeaderCard from "@/app/components/blogDetail/blogHeaderCard";
import CustomCard from "@/app/components/shared/card";
import CommentCard from "@/app/components/shared/commentCard";
import CommentInput from "@/app/components/shared/commentInput";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogDetail() {
  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
      <BlogHeaderCard />
      <div>BlogDetail</div>
      <Typography variant="h3" component="h3" sx={{ marginBottom: 2, marginTop:2 }}>
        Comentarios
      </Typography>
      <CustomCard>
        <CommentInput/>
        <Stack>
        <CommentCard />
        <CommentCard />
        <CommentCard />
        </Stack>
      </CustomCard>
    </Container>
  );
}
