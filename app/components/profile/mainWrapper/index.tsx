"use client";

import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CustomCard from "../../shared/card";
import ProfileAvatar from "../../profile/avatar";

import ProfileInfo from "../../profile/profileInfo";
import ProfileSocial from "../../profile/profileSocial";
import ProfileBlogCard from "../../profile/profileBlogCard";
import ProfileStats from "../../profile/profileStats";
import {
  logout as coreLogout,
  setInfoModal,
  setLoginModal,
  useCore,
} from "@/app/context/core";
import { updateProfile } from "@/app/client/user";
import { Blog } from "@/app/data/blog";
import BlogCard from "../../blogCard";
import { logout } from "@/app/client/auth";
import BackButton from "../../shared/BackButton";

interface Props {
  data: any;
  blogs: any;
}

export default function MainWrapper({ data, blogs }: Props) {
  const [{ user }, coreDispatch] = useCore();
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isEditingSocial, setIsEditingSocial] = useState<boolean>(false);

  const router = useRouter();

  const handleProfileEdition = (status: boolean) => {
    setIsEditingProfile(status);
  };
  const handleSocialEdition = (status: boolean) => {
    setIsEditingSocial(status);
  };

  const onChangeAvatar = async (avatar: Blob) => {
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

  const handleEmpty = async () => {
    router.replace("/");

    await logout(user?.data?._id!);
    coreLogout(coreDispatch);
    setInfoModal(coreDispatch, {
      status: "error",
      title: "Tu sesión ha expirado",
      hasCancel: null,
      hasSubmit: {
        title: "Iniciar sesión",
        cb: () => {
          setInfoModal(coreDispatch, null);
          setLoginModal(coreDispatch, true);
        },
      },
      onAnimationEnd: null,
    });
  };

  if (!data) {
    handleEmpty();
    return null;
  }
  console.log("user data", data.data);
  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: 8 }}>
      <BackButton />
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
        <Box sx={{ maxWidth: 500, width: "100%", position: "relative" }}>
          {!data.data.isSameUser &&
            blogs.blogs[0].data.map((e: any) => {
              return (
                <Box sx={{ marginBottom: 4 }} key={e._id}>
                  <BlogCard
                    userAvatar={{
                      name: e.user[0].name,
                      lastName: e.user[0].lastName,
                      image: e.user[0].avatar,
                      slug: e.user[0].slug,
                    }}
                    data={{ ...e, category: e.category[0].name }}
                    preview={false}
                    showDescriptionTooltip={false}
                    showTitleTooltip={false}
                  />
                </Box>
              );
            })}
        </Box>

        <Box
          sx={{
            maxWidth: 500,
            width: "100%",
            position: "relative",
            marginLeft: { xs: "0 !important", lg: "32px !important" },
          }}
        >
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
                    isSameUser={data.data.isSameUser}
                    targetUser={data.data.profileData._id}
                    following={data.data.profileData.follow}
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
