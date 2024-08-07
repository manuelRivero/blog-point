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
  Stack,
  CardMedia,
} from "@mui/material";
import React, { useState, useId, useEffect } from "react";
import CustomCard from "../components/shared/card";
import CustomInput from "../components/shared/customInput";
import CustomInputFile from "../components/shared/inputFile";
import BlogCard from "../components/blogCard";
import { Swiper, SwiperSlide } from "swiper/react";

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
import { uploadImage } from "../client/uploads";
import CustomButton from "../components/shared/customButton";
import { createBlog, getSupportBlogs } from "../client/blogs";
import {
  setInfoModal,
  setLoginModal,
  setLoginRedirection,
  useCore,
} from "../context/core";
import CategoryDropdown from "../components/createBlog/categoryDropdown";

import introJs from "intro.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlogCardHorizontal from "../components/shared/blogCardHorizontal";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import Loader from "../components/shared/loader";
import PageLoading from "../components/shared/pageLoader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const tutorialData = {
  category:
    "Selecciona la categoría, puedes crear nuevas categorías, si no encuentras una que describa el contenido de tu publicación.",
  title: "Este es el titulo para tu publicación.",
  description: "Añade una breve descripción sobre el contenido de tu publicación.",
  image: "Puedes seleccionar una imagen para tu publicación",
  preview:
    "Así lucira tu publicación en los resultados de busqueda, asegurate que la información de tu publicación se visualice de forma correcta",
  content:
    "En este editor de texto enriquecido es donde puedes crear el contenido de tu publicación, puedes agregar imágenes y videos para hacerla más atractiva",
};

const schema = yup.object({
  title: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  image: yup.mixed().required("Campo requerido"),
  content: yup.string().required("Campo requerido"),
  category: yup.object({
    title: yup.string().required("Campo requerido"),
    id: yup.string().required("Campo requerido"),
  }),
});
interface CardData {
  title: string;
  description: string;
  image: string | null;
  category: string;
}
export default function CreateBlog() {
  const [{ user }, coreDispatch] = useCore();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1200px)");
  //form
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [cardData, setCardData] = useState<CardData>({
    title: "",
    description: "",
    image: null,
    category: "",
  });
  const [supportBlogs, setSupportBlogs] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropData, setCropData] = useState<Area | null>(null);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [showTitleAlert, setShowTitleAlert] = useState<boolean>(false);
  const [resetFile, setResetFile] = useState<boolean>(false);
  const [showDescriptionAlert, setShowDescriptionAlert] =
    useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSupportBlogs, setShowSupportBlogs] = useState<boolean>(false);

  const watchCategory = watch("category");

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
    setValue("image", "");
    setImageSrc(undefined);
    setCardData({ ...cardData, image: null });
    setCropData(null);
  };

  const handlePreview = async (e: File) => {
    setResetFile(false);
    const objectUrl: string = URL.createObjectURL(e);
    setImageSrc(objectUrl);
    setShowCrop(true);
  };

  const handleTutorial = () => {
    const intro = introJs();
    intro.setOption("nextLabel", " Siguiente ");
    intro.setOption("dontShowAgain", true);
    intro.setOption("dontShowAgainLabel", "No mostrar de nuevo este tutorial");
    intro.setOption("prevLabel", " Anterior ");
    intro.setOption("doneLabel", " Entendido ");
    intro.start();
  };

  const handleShowSupportBlogs = () => {
    setShowSupportBlogs((prev: boolean) => !prev);
  };

  const descriptionLenghtHandler = (status: boolean) => {
    setShowDescriptionAlert(status);
  };

  const titleLenghtHandler = (status: boolean) => {
    setShowTitleAlert(status);
  };

  const submit = async (values: any) => {
    const form = new FormData();
    form.append("title", values.title);
    form.append("description", values.description);
    form.append("image", values.image);
    form.append("content", values.content);
    form.append("category", values.category.id);
    try {
      setLoadingSubmit(true);
      const { data } = await createBlog(form);
      setInfoModal(coreDispatch, {
        status: "success",
        title: "Tu blog se ha publicado",
        hasCancel: null,
        hasSubmit: {
          title: "¡Genial!",
          cb: () => {
            setInfoModal(coreDispatch, null);
            router.push(`/detalle-del-blog/${data.blog.slug}`);
          },
        },
        onAnimationEnd: null,
      });
    } catch (error: any) {
      if (error.response.status === 401) {
        return;
      }
      setInfoModal(coreDispatch, {
        status: "error",
        title: "Hubo un error",
        hasCancel: null,
        hasSubmit: {
          title: "Intentar nuevamente",
          cb: () => {
            setInfoModal(coreDispatch, null);
          },
        },
        onAnimationEnd: null,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (watchCategory) {
      setCardData({ ...cardData, category: watchCategory.title });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCategory]);

  useEffect(() => {
    if (!user) {
      setInfoModal(coreDispatch, {
        status: "error",
        title: "Inicia sesión para crear nuevas publicaciones",
        hasCancel: null,
        hasSubmit: {
          title: "ok",
          cb: () => {
            router.push("/");
            setLoginRedirection(coreDispatch, "/crear-blog");
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
    const intro = introJs();
    intro.setOption("nextLabel", " Siguiente ");
    intro.setOption("dontShowAgain", true);
    intro.setOption("dontShowAgainLabel", "No mostrar de nuevo este tutorial");
    intro.setOption("prevLabel", " Anterior ");
    intro.setOption("doneLabel", " Entendido ");
    intro.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSupportBlogs(0);
        setSupportBlogs(data.blogs[0].data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  console.log("errors", errors);
  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h1" component={"h1"} align="center">
        Crear publicación
      </Typography>
      <Box sx={{ marginTop: "2rem", padding: 1 }}>
        {supportBlogs.length > 0 && (
          <Box sx={{ marginBottom: "2rem" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={1}
              sx={{ marginBottom: "1rem" }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant="h4">Ver contenido de ayuda</Typography>
                <Button onClick={() => handleShowSupportBlogs()}>
                  {showSupportBlogs ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
              </Stack>
              <Button variant="contained" onClick={() => handleTutorial()}>
                <Typography
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Ver tutorial
                </Typography>
              </Button>
            </Stack>
            {showSupportBlogs && (
              <Swiper
                modules={[Navigation]}
                navigation={true}
                slidesPerView={1}
                spaceBetween={"50px"}
              >
                {supportBlogs.map((e) => (
                  <SwiperSlide style={{ width: "100%" }} key={e._id}>
                    <Grid container justifyContent={"center"}>
                      <Grid item xs={11} sx={{ padding: ".5rem" }}>
                        <BlogCard
                          userAvatar={{
                            name: e.user[0].name,
                            lastName: e.user[0].lastName,
                            image: e.user[0].avatar,
                            slug: e.user[0].slug,
                          }}
                          data={{ ...e, category: e.category[0].name }}
                          preview={false}
                          showDescriptionTooltip={false}
                          showTitleTooltip={false}
                        />
                      </Grid>
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Box>
        )}
        <CustomCard>
          <form onSubmit={handleSubmit(submit)}>
            <Grid container spacing={8} sx={{ placeContent: "center" }}>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  variant="h2"
                  component={"h2"}
                  sx={{ marginBottom: "1rem" }}
                >
                  Información
                </Typography>
                <div data-intro={tutorialData.category}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Controller
                      name={"category"}
                      control={control}
                      render={({ field, fieldState }) => (
                        <CategoryDropdown
                          field={field}
                          error={fieldState.error}
                        />
                      )}
                    />
                  </Box>
                </div>
                <div data-intro={tutorialData.title}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Controller
                      name={"title"}
                      control={control}
                      render={({ field, fieldState }) => (
                        <CustomInput
                          maxLength={60}
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
                          label="Título"
                          outline={true}
                          placeholder="Escribe el titulo de tu publicación"
                        />
                      )}
                    />
                  </Box>
                </div>
                <div data-intro={tutorialData.description}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Controller
                      name={"description"}
                      control={control}
                      render={({ field, fieldState }) => (
                        <CustomInput
                          maxLength={120}
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
                          label="Descripción"
                          outline={true}
                          multiline={true}
                          rows={5}
                          placeholder="Escribe la descripción de tu publicación"
                        />
                      )}
                    />
                  </Box>
                </div>
                <div data-intro={tutorialData.image}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Controller
                      name={"image"}
                      control={control}
                      render={({ field, fieldState }) => (
                        <CustomInputFile
                          reset={resetFile}
                          handleCancel={() => {
                            handleImageCancel();
                            field.onChange("");
                          }}
                          error={fieldState.error}
                          handlePreview={(e) => {
                            handlePreview(e);
                            field.onChange(e);
                          }}
                          label="Imagen"
                          imageSrc={cardData.image}
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
                </div>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography variant="h2" component={"h2"}>
                  Previsualización
                </Typography>
                <Typography
                  variant="body1"
                  component={"p"}
                  sx={{ color: "#c2c2c2", marginBottom: 2 }}
                >
                  Esta es la visualización de tu publicación en los resultados de
                  busqueda.
                </Typography>
                {showTitleAlert && (
                  <Typography
                    variant="body1"
                    component={"p"}
                    sx={{ color: "#c2c2c2" }}
                  >
                    Pista: Tu título abarca más caracteres de los que se
                    visualizaran en la tarjeta de tu publicación pero se visualizara de
                    forma completa en el detalle de la misma.
                  </Typography>
                )}
                <div data-intro={tutorialData.preview}>
                  <Box sx={{ marginTop: "1rem" }}>
                    {user?.data && (
                      <BlogCard
                        data={cardData}
                        preview={true}
                        showDescriptionTooltip={showDescriptionAlert}
                        showTitleTooltip={showTitleAlert}
                        userAvatar={{
                          name: user.data.name,
                          lastName: user.data.lastName,
                          image: user.data.avatar,
                          slug: user.data.slug,
                        }}
                      />
                    )}
                  </Box>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  component={"h2"}
                  sx={{ marginBottom: "1rem" }}
                >
                  Contenido
                </Typography>
                <div data-intro={tutorialData.content}>
                  <Box>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <Editor
                              apiKey="g8clezyenv99c3qrpf04jm099smc6ldsodi90hapovrk29k4"
                              initialValue=""
                              init={{
                                images_upload_handler: async (
                                  blobInfo: any
                                ) => {
                                  return new Promise(
                                    async (success, failure) => {
                                      const form = new FormData();
                                      form.append(
                                        "image",
                                        blobInfo.blob(),
                                        blobInfo.filename()
                                      );
                                      try {
                                        const { data } = await uploadImage(
                                          form
                                        );
                                        success(data.url);
                                      } catch (error) {
                                        failure("Error al subir la imagen");
                                      }
                                    }
                                  );
                                },
                                language: "es",
                                content_langs: [
                                  { title: "Spanish", code: "es" },
                                ],
                                branding: false,
                                height: 400,
                                menubar: true,
                                plugins:
                                  "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                                toolbar:
                                  "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                                image_advtab: true,
                              }}
                              onEditorChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            {fieldState.error && (
                              <Typography
                                sx={{ marginLeft: ".8rem", fontSize: 12 }}
                                color={"error"}
                              >
                                {fieldState.error.message}
                              </Typography>
                            )}
                          </>
                        );
                      }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12}>
                {Object.keys(errors).length > 0 && (
                  <Typography
                    sx={{ marginLeft: ".8rem", fontSize: 12, marginBottom: 2 }}
                    align="center"
                    color={"error"}
                  >
                    Parece que la información de tu publicación está incompleta, por
                    favor verificala antes de continuar.
                  </Typography>
                )}
                <Stack direction="row" justifyContent="center">
                  <CustomButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    title="Guardar"
                    cb={() => {}}
                    disabled={loadingSubmit}
                    isLoading={loadingSubmit}
                  />
                </Stack>
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
            <Button
              variant={"outlined"}
              onClick={() => {
                setShowCrop(false);
                handleImageCancel();
                setResetFile(true);
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
