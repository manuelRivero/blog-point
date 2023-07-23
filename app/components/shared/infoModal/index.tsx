
"use client"
import React from "react";
import Lottie from "lottie-react";
import { Box, Modal } from "@mui/material";
import { setInfoModal, useCore } from "@/app/context/core";
import success from "./../../../assets/lottie/success.json";

const status: any = {
  success: success,
};


export default function InfoModal() {
  const [{ infoModal }, coreDispatch] = useCore();
  const onAnimationEnd = () => {
      console.log("animation end")
    if(infoModal?.onAnimationEnd){
        infoModal.onAnimationEnd()
    }
  }
  if (!infoModal) {
    return null;
  }
  return (
    <Modal
      open={Boolean(infoModal)}
      onClose={() => setInfoModal(coreDispatch, null)}
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
        <Lottie animationData={status[infoModal.status]} loop={false} onComplete={onAnimationEnd} />
      </Box>
    </Modal>
  );
}
