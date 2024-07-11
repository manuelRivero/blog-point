"use client";
import React, { useState } from "react";
import CustomCard from "../../shared/card";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";

// icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EditIcon from "@mui/icons-material/Edit";

import CustomInput from "../../shared/customInput";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../shared/customButton";
import { setInfoModal, useCore } from "@/app/context/core";
import { updateProfile } from "@/app/client/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = yup.object({
  facebook: yup.string(),
  instagram: yup.string(),
  twitter: yup.string(),
});
interface Props {
  onChangeEditing: (e: boolean) => void;
  data: {
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    isSameUser: boolean;
  };
}
export interface SocialForm {
  facebook: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
}
export default function ProfileSocial({ onChangeEditing, data }: Props) {
  const [, coreDispatch] = useCore();
  const router = useRouter();
  //form
  const { control, handleSubmit, reset } = useForm<SocialForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      facebook: data.facebook || "",
      instagram: data.instagram || "",
      twitter: data.twitter || "",
    },
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    onChangeEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onChangeEditing(true);
  };

  const submit = async (values: any) => {
    const form = new FormData();
    form.append(
      "socialData",
      JSON.stringify({
        facebook: values.facebook || null,
        instagram: values.instagram || null,
        twitter: values.twitter || null,
      })
    );
    try {
      setLoadingSubmit(true);
      const { data } = await updateProfile(form);
      setInfoModal(coreDispatch, {
        status: "success",
        title: "Tu perfil se ha actualizado correctamente",
        hasCancel: null,
        hasSubmit: {
          title: "Ok",
          cb: () => {
            setInfoModal(coreDispatch, null);
            setIsEditing(false);
            onChangeEditing(false);
            router.push(`/perfil/${data.user.slug}`);
          },
        },
        onAnimationEnd: null,
      });
    } catch (error) {
    } finally {
      setLoadingSubmit(false);
    }
  };
  return (
    <Box sx={{ position: "relative", marginTop: 2 }}>
      <CustomCard>
        {!isEditing && data.isSameUser && (
          <Box
            onClick={handleEdit}
            sx={(theme) => ({
              background: "#fff",
              color: theme.palette.primary.main,
              borderRadius: 9999,
              padding: "2px",
              cursor: "pointer",
              boxShadow: "0 0 5px 0 rgba(0,0,0, .5)",
              position: "absolute",
              top: -10,
              right: -10,
              height: 35,
              width: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <EditIcon />
          </Box>
        )}
        {!isEditing ? (
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            {data.instagram && (
              <a href={data.instagram} target="_blank">
                <Box
                  sx={(theme) => ({
                    borderRadius: "100%",
                    height: 40,
                    width: 40,
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  })}
                >
                  <InstagramIcon />
                </Box>
              </a>
            )}
            {data.facebook && (
              <a href={data.facebook} target="_blank">
                <Box
                  sx={(theme) => ({
                    borderRadius: "100%",
                    height: 40,
                    width: 40,
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  })}
                >
                  <FacebookIcon />
                </Box>
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank">
                {" "}
                <Box
                  sx={(theme) => ({
                    borderRadius: "100%",
                    height: 40,
                    width: 40,
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  })}
                >
                  <TwitterIcon />
                </Box>
              </a>
            )}
            {!data.facebook && !data.instagram && !data.twitter && (
              <Box>
                {data.isSameUser ? (
                  <Typography variant={"body1"} component={"p"}>
                    Aún no has agregado tus redes sociales
                  </Typography>
                ) : (
                  <Typography variant={"body1"} component={"p"}>
                    Este usuario no cuenta con información de sus redes sociales
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        ) : (
          <form onSubmit={handleSubmit(submit)}>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name={"facebook"}
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <CustomInput
                      type="text"
                      error={fieldState.error}
                      value={field.value ? field.value : ""}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        field.onChange(e.target.value);
                      }}
                      label="Facebook"
                      outline={true}
                      placeholder="ingresa en elace a tu perfil de Facebook"
                    />

                    {field.value !== "" && (
                      <Button
                        component={Link}
                        href={field.value}
                        target={"_blank"}
                      >
                        Probar
                      </Button>
                    )}
                  </>
                )}
              />
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name={"instagram"}
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <CustomInput
                      type="text"
                      error={fieldState.error}
                      value={field.value ? field.value : ""}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        field.onChange(e.target.value);
                      }}
                      label="Instagram"
                      outline={true}
                      placeholder="Ingresa el enlace a tu perfil Instagram"
                    />
                    {field.value !== "" && (
                      <Button
                        component={Link}
                        href={field.value}
                        target={"_blank"}
                      >
                        Probar
                      </Button>
                    )}
                  </>
                )}
              />
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name={"twitter"}
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <CustomInput
                      type="text"
                      error={fieldState.error}
                      value={field.value ? field.value : ""}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        field.onChange(e.target.value);
                      }}
                      label="Twitter"
                      outline={true}
                      placeholder="Ingresa el enlace a tu perfil de Twitter"
                    />
                    {field.value !== "" && (
                      <Button
                        component={Link}
                        href={field.value}
                        target={"_blank"}
                      >
                        Probar
                      </Button>
                    )}
                  </>
                )}
              />
            </Box>
            <Stack
              direction="row"
              spacing={4}
              sx={{ justifyContent: "center" }}
            >
              <Button
                color="error"
                disabled={loadingSubmit}
                variant="outlined"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
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
          </form>
        )}
      </CustomCard>
    </Box>
  );
}
