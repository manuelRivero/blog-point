"use client";
import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

import CustomInput from "../customInput";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserAvatar from "../UserAvatar";

const schema = yup.object({
  comment: yup.string().required("Campo requerido"),
});

export default function CommentInput() {
  //form
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Box sx={{marginBottom:2}}>
      <UserAvatar
        user={{
          name: "María y josé",
          lastName: "Contreras Goméz",
          image: null,
        }}
      />
      <Box>
        <Controller
          name={"comment"}
          control={control}
          render={({ field, fieldState }) => (
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
          )}
        />
      </Box>
      <Stack direction={"row"} justifyContent={"center"} spacing={2}>
        {/* <Button
          variant="outlined"
          color="error"
          sx={{ fontSize: 14 }}
          onClick={() => setShowCommentInput(!showCommentInput)}
        >
          Cancelar
        </Button> */}
        <Button variant="contained" sx={{ fontSize: 14 }}>
          Comentar
        </Button>
      </Stack>
    </Box>
  );
}
