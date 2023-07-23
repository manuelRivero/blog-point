import { Box, Stack, Typography } from "@mui/material";
import googleIcon from "./../../../assets/images/icons/google-icon.png";
import facebookIcon from "./../../../assets/images/icons/facebook-icon.png";
import React from "react";

interface Props {
  title: string;
  icon: "facebook" | "google";
  background: string;
}
const icons = {
  google: googleIcon,
  facebook: facebookIcon
};
export default function SocialLoginButton({ title, icon, background }: Props) {
  return (
    <Box
      sx={{
        cursor:"pointer",
        background: background,
        borderRadius: "8px",
        padding: ".5rem",
        border: "solid 1px #c2c2c2",
        "&:hover":{
            boxShadow: "0 0 15px -4px rgba(0,0,0, .5)"
        }
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <img
          style={{ width: "32px" }}
          src={icons[icon].src}
          alt="Icono de inicio de sesión"
        />
        <Typography>{title}</Typography>
      </Stack>
    </Box>
  );
}
