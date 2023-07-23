import React from 'react'
import Lottie from "lottie-react";
import { Box, Modal } from '@mui/material';
import { useCore } from '@/app/context/core';


export default function InfoModal() {
    const [{infoModal}, coreDispatch] = useCore()
  return (
    <Modal
      open={infoModal.status}
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
      </Box>
    </Modal>
  )
}
