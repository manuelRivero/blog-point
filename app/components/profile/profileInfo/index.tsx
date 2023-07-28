"use client";
import React, { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import EditIcon from "@mui/icons-material/Edit";
import CustomInput from "../../shared/customInput";

const schema = yup.object({
  name: yup.string().required("Campo requerido"),
  lastName: yup.string().required("Campo requerido"),
  bio: yup.string().required("Campo requerido"),
});

interface Props {
  onChangeEditing: (e: boolean) => void;
}

export default function ProfileInfo({ onChangeEditing }: Props) {
  //form
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
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
  return isEditing ? (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginBottom: "1rem" }}>
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
      <Box sx={{ marginBottom: "1rem" }}>
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
      <Box sx={{ marginBottom: "1rem" }}>
        <Controller
          name={"bio"}
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              maxLength={120}
              type="text"
              error={fieldState.error}
              value={field.value}
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
        <Button color="primary" variant="contained">
          Guardar
        </Button>
      </Stack>
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
        assumenda enim quas, laborum unde molestias cumque asperiores odit eos,
        sunt expedita consectetur recusandae. Tempora est commodi repellat
        placeat sed?
      </Typography>
    </Box>
  );
}
