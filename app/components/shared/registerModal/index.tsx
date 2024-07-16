"use client";
import React, { useEffect, useState } from "react";
import {
  setInfoModal,
  setLoginModal,
  useCore,
  setRegisterModal,
} from "@/app/context/core";
import { Box, Modal, Typography, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SocialLoginButton from "../socialLoginButton";
import CustomButton from "../customButton";
import { useRouter } from "next/navigation";
import ProfileAvatar from "../../profile/avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Step1 from "./forms/step1";
import Step2 from "./forms/step2";
import Step3 from "./forms/step3";
import { register } from "@/app/client/auth";

export default function RegisterModal() {
  const router = useRouter();
  const [{ showRegisterModal }, coreDispatch] = useCore();

  //states
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<any | null>(null);
  const [resetForms, setResetForms] = useState<boolean>(false);
  const [step1Error, setStep1Error] = useState<null | {
    fieldName: "email";
    error: string;
  }>(null);

  const submit = async () => {
    setLoadingSubmit(true);
    const form = new FormData();
    Object.keys(userData).forEach((key) => {
      form.append(key, userData[key]);
    });
    try {
      const response = await register(form);
      setLoginModal(coreDispatch, false);
      setInfoModal(coreDispatch, {
        status: "success",
        title: "Te has registrado exitosamente, ahora puedes iniciar sesión",
        hasCancel: null,
        hasSubmit: {
          title: "Excelente",
          cb: () => {
            setLoginModal(coreDispatch, true);
            setInfoModal(coreDispatch, null);
          },
        },
        onAnimationEnd: null,
      });
    } catch (error: any) {
      // set step for error
      setRegisterModal(coreDispatch, false);

      setInfoModal(coreDispatch, {
        status: "error",
        title: "No se ha podido completar el registro",
        hasCancel: null,
        message: error.response.data.error,
        hasSubmit: {
          title: "Intentar nuevamente",
          cb: () => {
            setUserData(null);
            setStep(1);
            setInfoModal(coreDispatch, null);
            setRegisterModal(coreDispatch, true);
          },
        },
        onAnimationEnd: null,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleStep1 = (values: any) => {
    setUserData({ ...userData, ...values });
    setStep(2);
  };

  const handleStep2 = (values: any) => {
    setUserData({ ...userData, ...values });
    setStep(3);
  };

  const handleStep3 = (values: any) => {
    setUserData({ ...userData, ...values });
    setStep(4);
  };
  const handleStep4 = () => {};
  const handleImage = (image: any) => {
    setUserData({ ...userData, image });
  };
  useEffect(() => {
    if (!showRegisterModal) {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRegisterModal]);

  useEffect(() => {
    if (!showRegisterModal) {
      setResetForms(true);
      setUserData(null);
    } else {
      setResetForms(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRegisterModal]);

  return (
    <Modal
      open={showRegisterModal}
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
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ marginBottom: "1rem" }}
        >
          <IconButton onClick={() => setLoginModal(coreDispatch, false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {step > 1 && (
          <IconButton onClick={() => setStep(step - 1)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box>
          <Typography
            variant="h2"
            component={"h2"}
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Historial Medico
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Registro
          </Typography>
        </Box>

        {step === 4 && (
          <Stack
            direction="column"
            alignItems={"center"}
            justifyContent="center"
          >
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#c2c2c2", marginBottom: 2 }}
            >
              {`Agrega tu foto de perfil (Opcional)`}
            </Typography>
            <ProfileAvatar
              onChange={handleImage}
              isSameUser={true}
              avatar={null}
            />
          </Stack>
        )}
        {step === 1 && (
          <Step1
            onSubmit={handleStep1}
            resetForm={resetForms}
            initialValues={userData}
            error={step1Error}
          />
        )}

        {step === 2 && (
          <Step2
            onSubmit={handleStep2}
            resetForm={resetForms}
            initialValues={userData}
          />
        )}

        {step === 3 && (
          <Step3
            onSubmit={handleStep3}
            resetForm={resetForms}
            initialValues={userData}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {step === 4 && (
            <CustomButton
              type="button"
              color="primary"
              variant="contained"
              title="Ingresar"
              cb={() => submit()}
              disabled={loadingSubmit}
              isLoading={loadingSubmit}
            />
          )}
          <Typography
            onClick={() => {
              setRegisterModal(coreDispatch, false);
              setLoginModal(coreDispatch, true);
            }}
            fontSize={12}
            align="center"
            sx={{ cursor: "pointer" }}
          >
            Si ya tienes cuenta inicia sesión
          </Typography>
        </Box>
        {step <= 1 && (
          <>
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
                Ingresa con:
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <SocialLoginButton
                  title="Google"
                  icon="google"
                  background="#fff"
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <SocialLoginButton
                  title="Facebook"
                  icon="facebook"
                  background="#fff"
                />
              </Box>
            </Box>
          </>
        )}
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
