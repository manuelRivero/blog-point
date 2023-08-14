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

const schema = yup.object({
  facebook: yup.string(),
  instagram: yup.string(),
  twitter: yup.string(),
});
interface Props {
  onChangeEditing: (e: boolean) => void;
  data: {
    facebook: string;
    instagram: string;
    twitter: string;
    isSameUser: boolean;
  };
}
export interface SocialForm {
  facebook: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
}
export default function ProfileSocial({
  onChangeEditing,
  data,
}: Props) {
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

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    onChangeEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onChangeEditing(true);
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
          </Stack>
        ) : (
          <>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name={"facebook"}
                control={control}
                render={({ field, fieldState }) => (
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
                )}
              />
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name={"instagram"}
                control={control}
                render={({ field, fieldState }) => (
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
                )}
              />
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name={"twitter"}
                control={control}
                render={({ field, fieldState }) => (
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
                )}
              />
            </Box>
            <Stack
              direction="row"
              spacing={4}
              sx={{ justifyContent: "center" }}
            >
              <Button color="error" variant="outlined" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button color="primary" variant="contained">
                Guardar
              </Button>
            </Stack>
          </>
        )}
      </CustomCard>
    </Box>
  );
}
