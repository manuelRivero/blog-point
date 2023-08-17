"use client";
import React, { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import EditIcon from "@mui/icons-material/Edit";

import CustomInput from "../../shared/customInput";
import CustomButton from "../../shared/customButton";
import { setInfoModal, setUserProfileData, useCore } from "@/app/context/core";
import { updateProfile } from "@/app/client/user";
import { useRouter } from "next/navigation";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo requerido")
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^((?!\s{2}).)*$/, 'No se permiten dobles espacios')
    .matches(
      /^([a-zA-Z\sÁÉÍÓÚáéíóúÑñ]+)$/,
      "No se permiten caracteres especiales o numeros"
    ),
  lastName: yup
    .string()
    .required("Campo requerido")
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^((?!\s{2}).)*$/, 'No se permiten dobles espacios')
    .matches(
      /^([a-zA-Z\sÁÉÍÓÚáéíóúÑñ]+)$/,
      "No se permiten caracteres especiales o numeros"
    ),
  bio: yup.string().matches(/^((?!\s{2}).)*$/, 'No se permiten dobles espacios'),
});

interface Props {
  onChangeEditing: (e: boolean) => void;
  data: {
    isSameUser: boolean;
    profileData: {
      name: string;
      lastName: string;
      email: string;
      bio?: string;
    };
  };
}

export default function ProfileInfo({ onChangeEditing, data }: Props) {
  const [, coreDispatch] = useCore();
  const router = useRouter();

  //form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: data.profileData.name,
      lastName: data.profileData.lastName,
      bio: data.profileData.bio ? data.profileData.bio : "",
    },
    resolver: yupResolver(schema),
  });
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    console.log("submit");
    const form = new FormData();
    form.append(
      "profileData",
      JSON.stringify({
        name: values.name,
        lastName: values.lastName,
        bio: values.bio || null,
      })
    );
    try {
      setLoadingSubmit(true);
      const { data } = await updateProfile(form);
      setUserProfileData(coreDispatch, {
        slug: data.user.slug,
        name: values.name,
        lastName: values.lastName,
        bio: values.bio || null,
      });
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
  return isEditing ? (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(submit)}>
        <Box sx={{ marginBottom: 1 }}>
          <Controller
            name={"name"}
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                maxLength={20}
                type="text"
                error={fieldState.error}
                value={field.value}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  field.onChange(e.target.value);
                }}
                label="Nombres"
                outline={true}
                placeholder="Escribe tu nombre"
              />
            )}
          />
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Controller
            name={"lastName"}
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                maxLength={20}
                type="text"
                error={fieldState.error}
                value={field.value}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  field.onChange(e.target.value);
                }}
                label="Apellidos"
                outline={true}
                placeholder="Escribe tu apellido"
              />
            )}
          />
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Controller
            name={"bio"}
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                maxLength={120}
                type="text"
                error={fieldState.error}
                value={field.value ? field.value : ""}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  field.onChange(e.target.value);
                }}
                label="Acerca de tí"
                outline={true}
                multiline={true}
                rows={3}
                placeholder="Escribe acerca de tí"
              />
            )}
          />
        </Box>
        <Stack direction="row" spacing={4} sx={{ justifyContent: "center" }}>
          <Button color="error" disabled={loadingSubmit} variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <CustomButton
            type="submit"
            color="primary"
            variant="contained"
            title="Aceptar"
            cb={() => {}}
            disabled={loadingSubmit}
            isLoading={loadingSubmit}
          />
        </Stack>
      </form>
    </Box>
  ) : (
    <Box>
      {data.isSameUser && (
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
      <Typography variant="h6">{`${data.profileData.name} ${data.profileData.lastName}`}</Typography>
      {data.profileData.bio ? (
        <Typography variant="body1">{data.profileData.bio}</Typography>
      ) : (
        data.isSameUser && (
          <Typography variant="body1" sx={{ color: "#c2c2c2" }}>
            Aun no has agregado contenido a tu biografía
          </Typography>
        )
      )}
    </Box>
  );
}
