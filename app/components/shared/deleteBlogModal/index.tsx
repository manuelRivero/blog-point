"use client";
import {
  setInfoModal,
  setLoginModal,
  setLoginRedirection,
  setUserData,
  setUserTokens,
  useCore,
} from "@/app/context/core";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../customInput";
import SocialLoginButton from "../socialLoginButton";
import CustomButton from "../customButton";
import { useRouter } from "next/navigation";
import { deleteBlog } from "@/app/client/blogs";
import { on } from "events";

interface Props {
  show:boolean;
  onClose: ()=> void
  targetBlog: string
  onDelete: ()=> void
}

export default function DeleteBlogModal({show, onClose, targetBlog, onDelete}:Props) {
  const router = useRouter();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);


  const handleDelete = async()=>{
    try {
      setLoadingSubmit(true)
      await deleteBlog(targetBlog)
      onClose()
      onDelete()
    } catch (error) {
      
    }
    finally {
      setLoadingSubmit(false)
    }
  }
  return (
    <Modal
      open={show}
      onClose={() => onClose()}
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
            variant="h3"
            component={"h3"}
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Eliminar blog
          </Typography>
          <Typography
            variant="body1"
            component={"p"}
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            ¿Seguro que deseas eliminar este blog? 
          </Typography>
          <Typography
            variant="body1"
            color={"error"}
            component={"p"}
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Ésta acción es irreversible  
          </Typography>
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
              type="button"
              color="primary"
              variant="outlined"
              title="Cancelar"
              cb={() => onClose()}
              disabled={loadingSubmit}
              isLoading={false}
            />
            <CustomButton
              type="button"
              color="error"
              variant="contained"
              title="Eliminar"
              cb={() => {handleDelete()}}
              disabled={loadingSubmit}
              isLoading={loadingSubmit}
            />
          </Box>
       

        
      </Box>
    </Modal>
  );
}
