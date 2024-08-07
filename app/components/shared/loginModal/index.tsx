"use client";
import {
  setInfoModal,
  setLoginModal,
  setLoginRedirection,
  setRegisterModal,
  setUserData,
  setUserTokens,
  useCore,
} from "@/app/context/core";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../customInput";
import SocialLoginButton from "../socialLoginButton";
import CustomButton from "../customButton";
import { useRouter } from "next/navigation";
import { login, me } from "@/app/client/auth";
import { axiosIntance } from "@/app/client";
import CloseIcon from "@mui/icons-material/Close";

const schema = yup.object({
  email: yup.string().email().required("Campo requerido"),
  password: yup.string().required("Campo requerido"),
});

export default function LoginModal() {
  const router = useRouter();
  const [{ showLoginModal, loginRedirection }, coreDispatch] = useCore();
  //form
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  //states
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const submit = async (values: any) => {
    setLoadingSubmit(true);
    try {
      const {
        data: { token, refreshToken },
      } = await login(values);
      await setUserTokens(coreDispatch, { token, refreshToken });
      axiosIntance.defaults.headers.Authorization = "Bearer" + " " + token;
      const data = await me();
      const { name, lastName, email, avatar, slug, social, _id } =
        data.data.data;
      await setUserData(coreDispatch, {
        _id,
        name,
        lastName,
        email,
        avatar,
        slug,
      });

      setLoginModal(coreDispatch, false);
      setInfoModal(coreDispatch, {
        status: "success",
        title: "Has iniciado sesión correctamente",
        hasCancel: null,
        hasSubmit: null,
        onAnimationEnd: () => {
          router.push(loginRedirection);
          router.refresh();
          setLoginRedirection(coreDispatch, "/");
          setInfoModal(coreDispatch, null);
          reset();
        },
      });
    } catch (error) {
      console.log("login error", error);
      setInfoModal(coreDispatch, {
        status: "error",
        title: "No se ha podido iniciar sesión",
        hasCancel: null,
        hasSubmit: {
          title: "Intentar nuevamente",
          cb: () => setInfoModal(coreDispatch, false),
        },
        onAnimationEnd: null,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (!showLoginModal) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLoginModal]);
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginBottom: "1rem" }}
          >
            <IconButton onClick={() => setLoginModal(coreDispatch, false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography
            variant="h2"
            component={"h2"}
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Historial Medico
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
                  placeholder="Escribe tu email"
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
                  placeholder="Escribe tu contraseña"
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
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              title="Ingresar"
              cb={() => {}}
              disabled={loadingSubmit}
              isLoading={loadingSubmit}
            />
          </Box>
          <Typography
            onClick={() => {
              setLoginModal(coreDispatch, false);
              setRegisterModal(coreDispatch, true);
            }}
            fontSize={12}
            align="center"
            sx={{ cursor: "pointer", marginTop: 2 }}
          >
            Si aún no tienes cuenta, regístrate aquí
          </Typography>
        </form>

        {/* <Box
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
            <SocialLoginButton title="Google" icon="google" background="#fff" />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <SocialLoginButton
              title="Facebook"
              icon="facebook"
              background="#fff"
            />
          </Box>
        </Box> */}
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
