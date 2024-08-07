"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import CustomTag from "../../shared/tag";
import { useRouter } from "next/navigation";
import { Category } from "@/app/data/categories";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import "swiper/css/navigation";
import "swiper/css";
interface Props {
  categories: Category[];
}

export default function MobileCategoryRow({ categories }: Props) {
  const isMobile = useMediaQuery("(max-width:1024px)");

  const router = useRouter();

  return isMobile && categories.length > 0 ? (
    <>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Categorías
      </Typography>
    <Box sx={{ position: "relative" }} className={"category-swiper-wrapper"}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={"16px"}
        style={{ width: "90%" }}
        observer={true}
        observeParents={true}
        navigation={{
          prevEl: ".swiper-button-next",
          nextEl: ".swiper-button-prev",
          enabled: true,
        }}
      >
        <SwiperSlide style={{ width: "auto" }}>
          <IconButton component={Link} href="/categorias">
            <SearchIcon />
          </IconButton>
        </SwiperSlide>
        {categories.map((category: Category) => (
          <SwiperSlide
            style={{ width: "auto", display: "flex", alignItems: "center" }}
            key={category._id}
          >
            <CustomTag
              key={category._id}
              color="secondary"
              title={category.name}
              crossCallback={null}
              linkCallback={() =>
                router.push(`/categorias?category=${category._id}`)
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next">
        <NavigateNextIcon />
      </div>
      <div className="swiper-button-prev">
        <NavigateNextIcon sx={{ transform: "rotate(180deg)" }} />
      </div>
    </Box>
    </>
  ) : null;
}
