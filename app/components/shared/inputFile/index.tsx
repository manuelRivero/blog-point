"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, InputLabel, Stack, Typography } from "@mui/material";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  handlePreview: (e: File) => void;
  handleCancel: () => void;
  error: FieldError | undefined;
}

export default function CustomInputFile({
  label,
  handlePreview,
  error,
  handleCancel,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      handlePreview(e.target.files[0]);
    }
  };

  const onCancel = () => {
    setFile(null);
    handleCancel();
  };

  return (
    <Box sx={{ marginLeft: ".8rem" }}>
      <InputLabel
        sx={{
          marginBottom: ".25rem",
        }}
      >
        {label}
      </InputLabel>
      <Box sx={{ marginBottom: ".25rem" }}>
        {file ? (
          <Typography variant="body1" component="p">
            {file.name}
          </Typography>
        ) : (
          <Typography variant="body1" component="p">
            No se ha seleccionado ningún archivo.
          </Typography>
        )}
      </Box>
      <Box>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained">
            <label htmlFor="file-input">
              {file ? "Cambiar imágen" : "Subir Imagen"}
            </label>
          </Button>
          {file && (
            <Button variant="contained" onClick={onCancel} color="error">
              Cancelar
            </Button>
          )}
        </Stack>
      </Box>
      {error && (
        <Typography fontSize={14} color={"error"}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
