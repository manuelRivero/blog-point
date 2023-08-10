"use client";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomCard from "../../components/shared/card";
import ProfileAvatar from "../../components/profile/avatar";

//images
import EditIcon from "@mui/icons-material/Edit";
import CustomInput from "../../components/shared/customInput";
import ProfileInfo from "../../components/profile/profileInfo";
import ProfileSocial from "../../components/profile/profileSocial";
import ProfileBlogCard from "../../components/profile/profileBlogCard";
import ProfileStats from "../../components/profile/profileStats";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getProfile } from "@/app/client/user";

// export const getServerSideProps: GetServerSideProps<{
//   repo: Repo
// }> = async () => {
//   const res = await getProfile()
//   const repo = await res.json()
//   return { props: { repo } }
// }
 


export default function Profile() {
  
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isEditingSocial, setIsEditingSocial] = useState<boolean>(false);

  const router = useRouter();

  const handleProfileEdition = (status: boolean) => {
    setIsEditingProfile(status);
  };
  const handleSocialEdition = (status: boolean) => {
    setIsEditingSocial(status);
  };

  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h1" component={"h1"} align="center">
        Perfil
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={(theme) => ({
          justifyContent: "center",
          marginTop: 4,
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column-reverse",
            alignItems: "center",
            gap: 4,
          },
        })}
      >
        <Box>
          <CustomCard>
            <ProfileBlogCard />
          </CustomCard>
        </Box>
        <Box sx={{ maxWidth: 500, width: "100%", position: "relative" }}>
          <Box>
            {!isEditingSocial && (
              <CustomCard>
                <Stack direction="row" spacing={4}>
                  {!isEditingProfile && <ProfileAvatar />}

                  <ProfileInfo onChangeEditing={handleProfileEdition} />
                </Stack>
                {!isEditingProfile && <ProfileStats />}
              </CustomCard>
            )}
            {!isEditingProfile && (
              <ProfileSocial onChangeEditing={handleSocialEdition} />
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
