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
import { setInfoModal, useCore } from "@/app/context/core";

const schema = yup.object({
  name: yup.string().required("Campo requerido"),
  lastName: yup.string().required("Campo requerido"),
  bio: yup.string(),
});

interface Props {
  onChangeEditing: (e: boolean) => void;
}

export default function ProfileInfo({ onChangeEditing }: Props) {
  const [{ showLoginModal }, coreDispatch] = useCore();

  //form
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const[loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
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
  const submit = (values:any)=> {
    setLoadingSubmit(true);
    setInfoModal(coreDispatch, {
      status: "success",
      title: "Tu perfil se ha actualizado correctamente",
      hasCancel: null,
      hasSubmit: null,
      onAnimationEnd: () => {
        setInfoModal(coreDispatch, null);
        setIsEditing(false)
        onChangeEditing(false);
        setLoadingSubmit(false);

      },
    });

  }
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
        <Button color="error" variant="outlined" onClick={handleCancel}>
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
      <Typography variant="h6">Manuel Rivero</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, dicta
        assumenda enim quas, laborum unde molestias cumque asperiores odit eos.
      </Typography>
    </Box>
  );
}
