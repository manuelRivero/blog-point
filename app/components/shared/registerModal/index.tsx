"use client";
import { setInfoModal, setLoginModal, useCore } from "@/app/context/core";
import { Box, Modal, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

import SocialLoginButton from "../socialLoginButton";
import CustomButton from "../customButton";
import { useRouter } from "next/navigation";
import ProfileAvatar from "../../profile/avatar";
import Step1 from "./forms/step1";
import Step2 from "./forms/step2";
import Step3 from "./forms/step3";

export default function RegisterModal() {
  const router = useRouter();
  const [{ showRegisterModal }, coreDispatch] = useCore();

  //states
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<any>(null);
  const [resetForms, setResetForms] = useState<boolean>(false);

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
  const handleStep4 = (values: any) => {
    console.log("step 4");
  };
  useEffect(() => {
    if (!showRegisterModal) {
      setStep(1);
    }
  }, [showRegisterModal]);

  useEffect(() => {
    if (!showRegisterModal) {
      setResetForms(true);
    } else {
      setResetForms(false);
    }
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
        <Box>
          <Typography
            variant="h2"
            component={"h2"}
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Blog app
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
          <Stack direction="column" alignItems={"center"} justifyContent="center">
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#c2c2c2", marginBottom: 2 }}
            >
              {`Agrega tu foto de perfil (Opcional)`}
            </Typography>
            <ProfileAvatar />
          </Stack>
        )}
        {step === 1 && <Step1 onSubmit={handleStep1} resetForm={resetForms} />}

        {step === 2 && <Step2 onSubmit={handleStep2} resetForm={resetForms} />}

        {step === 3 && <Step3 onSubmit={handleStep3} resetForm={resetForms} />}

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
              cb={() => {}}
              disabled={loadingSubmit}
              isLoading={loadingSubmit}
            />
          )}
        </Box>
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
            <SocialLoginButton title="Google" icon="google" background="#fff" />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <SocialLoginButton
              title="Facebook"
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
