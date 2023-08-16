"use client";
import React from "react";
import Lottie from "lottie-react";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { setInfoModal, useCore } from "@/app/context/core";
import success from "./../../../assets/lottie/success.json";
import error from "./../../../assets/lottie/error.json";
import CustomButton from "../customButton";

const status: any = {
  success: success,
  error: error,
};

export default function InfoModal() {
  const [{ infoModal }, coreDispatch] = useCore();
  const onAnimationEnd = () => {
    console.log("animation end");
    if (infoModal?.onAnimationEnd) {
      infoModal.onAnimationEnd();
    }
  };
  const handleSubmitCallback = () => {
    if (infoModal?.hasSubmit?.cb) {
      infoModal.hasSubmit.cb();
    }
  };
  if (!infoModal) {
    return null;
  }
  return (
    <Modal
      open={Boolean(infoModal)}
      onClose={() => {}}
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
        <Lottie
          animationData={status[infoModal.status]}
          loop={false}
          onComplete={onAnimationEnd}
        />
        {infoModal.title && (
          <Typography variant="h5" align="center" component="h5">
            {infoModal.title}
          </Typography>
        )}
         {infoModal.title && (
          <Typography variant="body1" color="error" mt={2} align="center" component="p">
            {infoModal.message}
          </Typography>
        )}
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"center"}
          sx={{ marginTop: 2 }}
        >
          {infoModal.hasSubmit && (
            <CustomButton
              type="button"
              cb={handleSubmitCallback}
              disabled={false}
              isLoading={false}
              variant="contained"
              color="primary"
              title={infoModal.hasSubmit.title}
            />
          )}
        </Stack>
      </Box>
    </Modal>
  );
}
