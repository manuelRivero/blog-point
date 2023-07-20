"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomCard from "../components/shared/card";
import CustomInput from "../components/shared/customInput";
import CustomInputFile from "../components/shared/inputFile";
import BlogCard from "../components/blogCard";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  image: yup.mixed().required("Campo requerido"),
});
interface CardData {
  title: string;
  description: string;
  image: string;
}
export default function CreateBlog() {
  //form
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [cardData, setCardData] = useState<CardData>({
    title: "",
    description: "",
    image: "",
  });
  const handlePreview = async (e: File) => {
    const objectUrl: string = URL.createObjectURL(e);
  };
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography variant="h1" component={"h1"}>
        Crear blog
      </Typography>
      <Box sx={{ marginTop: "2rem" }}>
        <CustomCard>
          <form onSubmit={handleSubmit(() => console.log("values"))}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={6}>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Controller
                    name={"title"}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomInput
                        error={fieldState.error}
                        value={field.value}
                        onChange={(
                          e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        ) => {
                          field.onChange(e.target.value);
                          setCardData({ ...cardData, title: e.target.value });
                        }}
                        label="Titulo del blog"
                        outline={true}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Controller
                    name={"description"}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomInput
                        error={fieldState.error}
                        value={field.value}
                        onChange={(
                          e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        ) => {
                          field.onChange(e.target.value);
                          setCardData({
                            ...cardData,
                            description: e.target.value,
                          });
                        }}
                        label="Descripción blog"
                        outline={true}
                        multiline={true}
                        rows={5}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Controller
                    name={"image"}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomInputFile
                        error={fieldState.error}
                        handlePreview={handlePreview}
                        label="Imagen del blog"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <BlogCard />
              </Grid>
            </Grid>
            <button type="submit">submit</button>
          </form>
        </CustomCard>
      </Box>
    </Container>
  );
}
