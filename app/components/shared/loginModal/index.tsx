"use client";
import { setInfoModal, setLoginModal, useCore } from "@/app/context/core";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../customInput";
import SocialLoginButton from "../socialLoginButton";
import CustomButton from "../customButton";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().email().required("Campo requerido"),
  password: yup.string().required("Campo requerido"),
});

export default function LoginModal() {
  const router = useRouter();
  const [{ showLoginModal }, coreDispatch] = useCore();
  //form
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  //states
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  console.log("showLoginModal", showLoginModal);
  const submit = async (values: any) => {
    console.log("values");
    setLoadingSubmit(true);
    setLoginModal(coreDispatch, false);
    setInfoModal(coreDispatch, {
      status: "success",
      title: "Has iniciado sesión correctamente",
      hasCancel: null,
      hasSubmit: null,
      onAnimationEnd: () => {
        router.push("/");
        setInfoModal(coreDispatch, null);
      },
    });
    setLoadingSubmit(false);
    reset();
  };

  return (
    <Modal
      open={showLoginModal}
      onClose={() => setLoginModal(coreDispatch, false)}
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
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "1rem",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            component={"h2"}
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Blog app
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(submit)}>
          <Box sx={{ marginBottom: "1rem" }}>
            <Controller
              name={"email"}
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  type="text"
                  error={fieldState.error}
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    field.onChange(e.target.value);
                  }}
                  label="Email"
                  outline={true}
                />
              )}
            />
          </Box>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <Controller
              name={"password"}
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  type="password"
                  error={fieldState.error}
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    field.onChange(e.target.value);
                  }}
                  label="Contraseña"
                  outline={true}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button variant={"outlined"}>Cancelar</Button>
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              title="Aceptar"
              cb={() => {}}
              disabled={loadingSubmit}
              isLoading={loadingSubmit}
            />
          </Box>
        </form>

        <Box
          sx={{
            height: "1px",
            border: "solid 1px #c2c2c2",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        ></Box>
        <Box>
          <Typography align="center" sx={{ marginBottom: 2 }}>
            Inicia sesión con:
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <SocialLoginButton
              title="Iniciar con Google"
              icon="google"
              background="#fff"
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <SocialLoginButton
              title="Iniciar con Facebook"
              icon="facebook"
              background="#fff"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        ></Box>
      </Box>
    </Modal>
  );
}
