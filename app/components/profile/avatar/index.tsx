"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Modal,
  Slider,
  Typography,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
//images
import EditIcon from "@mui/icons-material/Edit";
import image from "./../../../assets/images/avatar-placeholder.png";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/app/helpers/cropImage";
import { useCore } from "@/app/context/core";

interface Props {
  onChange?: (e: Blob) => void;
}
export default function ProfileAvatar({ onChange }: Props) {
  const [{ showLoginModal, user }, coreDispatch] = useCore();

  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropData, setCropData] = useState<Area | null>(null);
  const [showCrop, setShowCrop] = useState<boolean>(false);

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCropData(croppedAreaPixels);
  };

  const generateCrop = async () => {
    if (imageSrc) {
      const croppedImage: Blob = await getCroppedImg(imageSrc, cropData);
      const objectUrl: string = URL.createObjectURL(croppedImage);
      setShowCrop(false);
      setCropImageSrc(objectUrl);
      if (onChange) {
        onChange(croppedImage);
      }
    }
  };

  const handlePreview = async (e: File) => {
    const objectUrl: string = URL.createObjectURL(e);
    setImageSrc(objectUrl);
    setShowCrop(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      handlePreview(e.target.files[0]);
    }
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Stack direction="row" spacing={4}>
          <Badge
            sx={{ height: "fit-content" }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Box
                sx={(theme) => ({
                  background: "#fff",
                  color: theme.palette.primary.main,
                  borderRadius: 9999,
                  padding: "2px",
                  cursor: "pointer",
                  boxShadow: "0 0 5px 0 rgba(0,0,0, .5)",
                })}
              >
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <label htmlFor="file-input">
                  <EditIcon />
                </label>
              </Box>
            }
          >
            {cropImageSrc && (
              <Avatar
                src={cropImageSrc}
                sx={{ width: 100, height: 100 }}
                alt="foto de perfil"
              />
            )}
            {!cropImageSrc && <Avatar
              src={user?.data?.avatar ? user?.data?.avatar : image.src}
              sx={{ width: 100, height: 100 }}
              alt="foto de perfil"
            />}
          </Badge>
        </Stack>
      </Box>
      <Modal
        open={showCrop}
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
            height: "90%",
            maxWidth: 500,
            maxHeight: 550,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            position="relative"
            sx={{ width: "100%", height: "75%", marginBottom: 2 }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 300, height: 300 }}
              cropShape="round"
            />
          </Box>
          <Box>
            <Typography variant="body1" align="center">
              Zoom
            </Typography>
            <Slider
              aria-label="Zoom"
              value={zoom}
              min={1}
              max={5}
              step={0.1}
              onChange={(e: any) => {
                setZoom(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: 1,
            }}
          >
            <Button variant={"contained"} onClick={generateCrop}>
              Aceptar
            </Button>
            <Button variant={"outlined"} onClick={() => setShowCrop(false)}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
