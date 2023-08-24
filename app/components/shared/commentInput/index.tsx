"use client";
import React, { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

import CustomInput from "../customInput";

import { useParams, usePathname } from "next/navigation";

// form
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserAvatar from "../UserAvatar";
import {
  setInfoModal,
  setLoginModal,
  setLoginRedirection,
  useCore,
} from "@/app/context/core";
import CustomButton from "../customButton";
import { createComment } from "@/app/client/blogs";

const schema = yup.object({
  comment: yup.string().required("Campo requerido"),
});

interface Props {
  addComment: (e: string) => void;
}

export default function CommentInput({ addComment }: Props) {
  const pathname = usePathname();
  const [{ user }, coreDispatch] = useCore();
  const { slug } = useParams();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  //form
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const submit = async (values: FieldValues) => {
    try {
      setLoadingSubmit(true);
      const { data } = await createComment({
        slug: slug.toString(),
        content: values.comment,
      });
      addComment(values.comment);
      setValue("comment", "");
      setInfoModal(coreDispatch, {
        status: "success",
        title: "",
        hasCancel: null,
        hasSubmit: null,
        onAnimationEnd: () => setInfoModal(coreDispatch, null),
      });
    } catch (error) {
      setInfoModal(coreDispatch, {
        status: "error",
        title: "No se pudo crear tu comentario",
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
  return user ? (
    <Box sx={{ marginBottom: 2 }}>
      {user.data && (
        <UserAvatar
          user={{
            name: user.data.name,
            lastName: user.data.lastName,
            image: user.data.avatar,
          }}
        />
      )}
      <Box>
        <form onSubmit={handleSubmit(submit)}>
          <Controller
            name={"comment"}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <CustomInput
                  maxLength={160}
                  type="text"
                  error={fieldState.error}
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    field.onChange(e.target.value);
                  }}
                  hasLabel={false}
                  label="Comentario"
                  outline={true}
                  placeholder="Escribe tu comentario"
                  multiline={true}
                  rows={2}
                />
              </>
            )}
          />
          <Stack direction={"row"} justifyContent={"center"} spacing={2}>
            <CustomButton
              variant="contained"
              type="submit"
              color="primary"
              disabled={loadingSubmit}
              isLoading={loadingSubmit}
              title={"Comentar"}
              cb={() => {}}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  ) : (
    <Box>
      <Typography variant="h4" component="h4" sx={{ marginBottom: 2 }}>
        Inicia sesión para dejar tu comentario
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <CustomButton
          variant="contained"
          type="button"
          color="primary"
          disabled={false}
          isLoading={false}
          title={"Iniciar sesión"}
          cb={() => {
            setLoginRedirection(coreDispatch, pathname);
            setLoginModal(coreDispatch, true);
          }}
        />
      </Box>
    </Box>
  );
}
