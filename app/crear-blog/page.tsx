"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState, useId } from "react";
import CustomCard from "../components/shared/card";
import CustomInput from "../components/shared/customInput";
import CustomInputFile from "../components/shared/inputFile";
import BlogCard from "../components/blogCard";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// editor
// import './../assets/data/es';
import { Editor } from "@tinymce/tinymce-react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../helpers/cropImage";

const schema = yup.object({
  title: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  image: yup.mixed().required("Campo requerido"),
});
interface CardData {
  title: string;
  description: string;
  image: string | null;
}
export default function CreateBlog() {
  const router = useRouter();

  //form
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [cardData, setCardData] = useState<CardData>({
    title: "",
    description: "",
    image: null,
  });
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropData, setCropData] = useState<Area | null>(null);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [showTitleAlert, setShowTitleAlert] = useState<boolean>(false);
  const [showDescriptionAlert, setShowDescriptionAlert] =
    useState<boolean>(false);

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCropData(croppedAreaPixels);
  };

  const generateCrop = async () => {
    if (imageSrc) {
      const croppedImage: Blob = await getCroppedImg(imageSrc, cropData);
      const objectUrl: string = URL.createObjectURL(croppedImage);
      setCardData({ ...cardData, image: objectUrl });
      setShowCrop(false);
    }
  };

  const handleImageCancel = () => {
    setImageSrc(undefined);
    setCardData({ ...cardData, image: null });
    setCropData(null);
  };

  const handlePreview = async (e: File) => {
    const objectUrl: string = URL.createObjectURL(e);
    setImageSrc(objectUrl);
    setShowCrop(true);
  };
  const descriptionLenghtHandler = (status: boolean) => {
    setShowDescriptionAlert(status);
  };

  const titleLenghtHandler = (status: boolean) => {
    setShowTitleAlert(status);
  };
  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h1" component={"h1"} align="center">
        Crear blog
      </Typography>
      <Box sx={{ marginTop: "2rem" }}>
        <CustomCard>
          <form onSubmit={handleSubmit(() => console.log("values"))}>
            <Grid container spacing={8} sx={{ placeContent: "center" }}>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  variant="h2"
                  component={"h2"}
                  sx={{ marginBottom: "1rem" }}
                >
                  Información de tu blog
                </Typography>
                <Box sx={{ marginBottom: "1rem" }}>
                  <Controller
                    name={"title"}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomInput
                        maxLength={80}
                        lengthAlertHandler={{
                          handler: (e) => titleLenghtHandler(e),
                          length: 60,
                        }}
                        type="text"
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
                        label="Título del blog"
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
                      maxLength={160}
                        lengthAlertHandler={{
                          handler: (e) => descriptionLenghtHandler(e),
                          length: 120,
                        }}
                        type="text"
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
                        handleCancel={handleImageCancel}
                        error={fieldState.error}
                        handlePreview={handlePreview}
                        label="Imagen del blog"
                      />
                    )}
                  />
                  {cropData && (
                    <Button
                      sx={{ marginLeft: ".8rem", marginTop: 2 }}
                      variant="outlined"
                      onClick={() => setShowCrop(true)}
                    >
                      Modificar posición de la imagen
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography variant="h2" component={"h2"}>
                  Previsualicación
                </Typography>
                <Typography
                  variant="body1"
                  component={"p"}
                  sx={{ color: "#c2c2c2", marginBottom: 2 }}
                >
                  Esta es la visualización de tu blog en los resultados de
                  busqueda.
                </Typography>
                {showTitleAlert && (
                  <Typography
                    variant="body1"
                    component={"p"}
                    sx={{ color: "#c2c2c2" }}
                  >
                    Pista: Tu título abarca más caracteres de los que se
                    visualizaran en la carta de tu blog pero se visualizara de
                    forma completa en el detalle del blog.
                  </Typography>
                )}
                {showDescriptionAlert && (
                  <Typography
                    variant="body1"
                    component={"p"}
                    sx={{ color: "#c2c2c2" }}
                  >
                    Pista: Tu descripción abarca más caracteres de los que se
                    visualizaran en la carta de tu blog pero se visualizara de
                    forma completa en el detalle del blog.
                  </Typography>
                )}
                <Box sx={{ marginTop: "1rem" }}>
                  <BlogCard
                    data={cardData}
                    preview={true}
                    showDescriptionTooltip={showDescriptionAlert}
                    showTitleTooltip={showTitleAlert}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  component={"h2"}
                  sx={{ marginBottom: "1rem" }}
                >
                  Contenido de tu blog
                </Typography>
                <Box>
                  <Editor
                    apiKey="g8clezyenv99c3qrpf04jm099smc6ldsodi90hapovrk29k4"
                    initialValue=""
                    init={{
                      language: "es",
                      content_langs: [{ title: "Spanish", code: "es" }],
                      branding: false,
                      height: 400,
                      menubar: true,
                      plugins:
                        "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                      toolbar:
                        "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                      image_advtab: true,
                    }}
                    onChange={() => {}}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </CustomCard>
      </Box>
      <Modal
        open={showCrop}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            maxWidth: 500,
            maxHeight: 550,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            position="relative"
            sx={{ width: "100%", height: "75%", marginBottom: 2 }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 300, height: 300 }}
            />
          </Box>
          <Box>
            <Typography variant="body1" align="center">
              Zoom
            </Typography>
            <Slider
              aria-label="Zoom"
              value={zoom}
              min={1}
              max={5}
              step={0.1}
              onChange={(e: any) => {
                setZoom(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: 1,
            }}
          >
            <Button variant={"contained"} onClick={generateCrop}>
              Aceptar
            </Button>
            <Button variant={"outlined"} onClick={() => setShowCrop(false)}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
