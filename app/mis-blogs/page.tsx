"use client";
import { Container, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import BlogHorizontalCard from "../components/shared/blogHorizontalCard";
import { getUserBlog } from "../client/blogs";
import { useCore } from "../context/core";
import { Blog } from "../data/blog";

export default function MyBlogs() {
  const router = useRouter();
  const [{ user }, coreDispatch] = useCore();
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (user && user.data) {
        try {
          const { data } = await getUserBlog(user?.data?._id);
          setBlogs(data.blogs);
        } catch (error) {
          console.log("my blogs error", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getData();
  }, []);
  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h1" component={"h1"} align="center" sx={{marginBottom:3}}>
        Mis blogs
      </Typography>
      {isLoading ? (
        <Typography>Cargando blogs</Typography>
      ) : (
        blogs?.map((blog: Blog) => {
          return <BlogHorizontalCard key={blog._id} data={blog} />;
        })
      )}
    </Container>
  );
}
