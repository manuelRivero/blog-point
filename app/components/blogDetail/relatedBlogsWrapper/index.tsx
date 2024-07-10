"use client"
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "../../shared/card";
import BlogCardHorizontal from "../../shared/blogCardHorizontal";
import { getRelatedBlogs } from "@/app/client/blogs";

interface Props {
  data: any;
}

export default function RelatedBlogsWrapper({ data }: Props) {
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getRelatedBlogs(data.blog.category._id);
        setCategoryData(res.data.blogs[0].data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((img) => {
      img.width = 13;
      img.height = 11;
    });
  }, [data]);

  return (
    <Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        Blogs relacionados
      </Typography>
        {categoryData.map((e: any, i: number) => {

          return <Box sx={{marginBottom: '1rem'}} key={"related-blog" + "-" + i}><BlogCardHorizontal data={e}  /></Box>;
        })}
    </Box>
  );
}
