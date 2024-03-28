"use client";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import BlogHorizontalCard from "../components/shared/blogHorizontalCard";
import { getUserBlog } from "../client/blogs";
import { setInfoModal, setLoginModal, setLoginRedirection, useCore } from "../context/core";
import { Blog } from "../data/blog";
import ReactPaginate from "react-paginate";

export default function MyBlogs() {
  const router = useRouter();
  const [{ user }, coreDispatch] = useCore();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsPaginationData, setBlogsPaginationData] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (event: any) => {
    setPage(event.selected) 
  }
  const handleDelete = (id:string)=>{

    const filteredBlogs = [...blogs]?.filter((e)=> e._id !== id);
     setBlogs(filteredBlogs)
  }
  useEffect(() => {
    if (!user) {
      setInfoModal(coreDispatch, {
        status: "error",
        title: "Inicia sesión para visualizar tus blogs",
        hasCancel: null,
        hasSubmit: {
          title: "ok",
          cb: () => {
            router.push("/");
            setLoginRedirection(coreDispatch, "/mis-blogs");
            setInfoModal(coreDispatch, null);
            setLoginModal(coreDispatch, true);
          },
        },
        onAnimationEnd: null,
      });
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (user && user.data) {
        try {
          const { data } = await getUserBlog(user?.data?._id, page);
          setBlogs(data.blogs[0].data.map((e:any) =>({
            _id: e._id,
            user: { 
              _id: e.user[0]._id,
              email: e.user[0].email,
              avatar: e.user[0].avatar,
              createdAt: e.user[0].createdAt,
              updatedAt: e.user[0].updatedAt,
              slug: e.user[0].slug,
              lastName: e.user[0].lastName,
              name: e.user[0].name
            },
            title: e.title,
            description:e.description,
            content: e.content,
            likes: e.likes,
            slug: e.slug,
            image: e.image,
            createdAt: e.createdAt,
            category: e.category[0],
            targetLike: false,
          })));
          setBlogsPaginationData(data.blogs[0].metadata[0].count)
        } catch (error) {
          console.log("my blogs error", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


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
          return  <Box sx={{marginBottom:1.5}}>
                    <BlogHorizontalCard key={blog._id} data={blog} onDelete={()=>handleDelete(blog._id)} />;
                  </Box>
        })
      )}
      {blogsPaginationData && <ReactPaginate
                containerClassName="custom-pagination"
                activeClassName="p-1 px-2 border-customYellow-500 border rounded-lg"
                breakLabel="..."
                nextLabel={
                  <Button variant="contained" color="primary">Siguiente</Button>
                }
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(blogsPaginationData / 10)}
                previousLabel={
                  <Button variant="contained" color="primary">Anterior</Button>
                }
                renderOnZeroPageCount={null}
              />}
    </Container>
  );
}
