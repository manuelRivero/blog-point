"use client";

import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CustomCard from "../../shared/card";
import ProfileAvatar from "../../profile/avatar";

import ProfileInfo from "../../profile/profileInfo";
import ProfileSocial from "../../profile/profileSocial";
import ProfileBlogCard from "../../profile/profileBlogCard";
import ProfileStats from "../../profile/profileStats";
import { logout, setInfoModal, setLoginModal, useCore } from "@/app/context/core";
import { updateProfile } from "@/app/client/user";
import { Blog } from "@/app/data/blog";

interface Props { data: any, blogs: any }

export default function MainWrapper({ data, blogs }: Props) {
  const [, coreDispatch] = useCore();
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isEditingSocial, setIsEditingSocial] = useState<boolean>(false);
  console.log('data mainwrapper', blogs)
  const router = useRouter();

  const handleProfileEdition = (status: boolean) => {
    setIsEditingProfile(status);
  };
  const handleSocialEdition = (status: boolean) => {
    setIsEditingSocial(status);
  };

  const onChangeAvatar = async (avatar: Blob) => {
    console.log("submit");
    const form = new FormData();
    form.append("image", avatar);
    try {
      const { data } = await updateProfile(form);

      setInfoModal(coreDispatch, {
        status: "success",
        title: "Tu perfil se ha actualizado correctamente",
        hasCancel: null,
        hasSubmit: {
          title: "Ok",
          cb: () => {
            setInfoModal(coreDispatch, null);
            router.push(`/perfil/${data.user.slug}`);
          },
        },
        onAnimationEnd: null,
      });
    } catch (error) {
      setInfoModal(coreDispatch, {
        status: "error",
        title: "No se pudo actualizar tu avatar",
        hasCancel: null,
        hasSubmit: {
          title: "Intentar nuevamente",
          cb: () => {
            setInfoModal(coreDispatch, null);
            router.push(`/perfil/${data.user.slug}`);
          },
        },
        onAnimationEnd: null,
      });
    }
  };

  if (!data) {
    router.replace("/");
    logout(coreDispatch);
    setInfoModal(coreDispatch, {
      status: "error",
      title: "Tu sesión ha expirado",
      hasCancel: null,
      hasSubmit: {
        title: "Iniciar sesión",
        cb: () => {
          setInfoModal(coreDispatch, null);
          setLoginModal(coreDispatch, true)
        },
      },
      onAnimationEnd: null,
    });
    return null
  }

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

        {!data.data.isSameUser && blogs.blogs[0].data.map((e: Blog) => {
          return <Box key={blog._id}>
            <CustomCard>
              <ProfileBlogCard blogs={blogs} />
            </CustomCard>
          </Box  >
        })}

        <Box sx={{ maxWidth: 500, width: "100%", position: "relative" }}>
          <Box>
            {!isEditingSocial && (
              <CustomCard>
                <Stack direction="row" spacing={4}>
                  {!isEditingProfile && (
                    <ProfileAvatar
                      isSameUser={data.data.isSameUser}
                      avatar={data.data.profileData.avatar}
                      onChange={onChangeAvatar}
                    />
                  )}

                  <ProfileInfo
                    data={data.data}
                    onChangeEditing={handleProfileEdition}
                  />
                </Stack>
                {!isEditingProfile && (
                  <ProfileStats
                    data={{
                      fallow: data.data.profileData.fallow,
                      fallowers: data.data.profileData.fallowers,
                      blogs: data.data.profileData.blogs,
                    }}
                  />
                )}
              </CustomCard>
            )}
            {!isEditingProfile && (
              <ProfileSocial
                data={{
                  ...data.data.profileData.social,
                  isSameUser: data.data.isSameUser,
                }}
                onChangeEditing={handleSocialEdition}
              />
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
