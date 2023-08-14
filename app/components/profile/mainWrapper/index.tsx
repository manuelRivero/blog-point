"use client";

import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CustomCard from "../../shared/card";
import ProfileAvatar from "../../profile/avatar";

import ProfileInfo from "../../profile/profileInfo";
import ProfileSocial from "../../profile/profileSocial";
import ProfileBlogCard from "../../profile/profileBlogCard";
import ProfileStats from "../../profile/profileStats";

export default function MainWrapper({ data }: any) {
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isEditingSocial, setIsEditingSocial] = useState<boolean>(false);
  console.log("avatar data", data.data.profileData.avatar);
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
        {!data.data.isSameUser && (
          <Box>
            <CustomCard>
              <ProfileBlogCard />
            </CustomCard>
          </Box>
        )}
        <Box sx={{ maxWidth: 500, width: "100%", position: "relative" }}>
          <Box>
            {!isEditingSocial && (
              <CustomCard>
                <Stack direction="row" spacing={4}>
                  {!isEditingProfile && (
                    <ProfileAvatar
                      isSameUser={data.data.isSameUser}
                      avatar={data.data.profileData.avatar}
                    />
                  )}

                  <ProfileInfo
                    data={data.data}
                    onChangeEditing={handleProfileEdition}
                  />
                </Stack>
                {!isEditingProfile && <ProfileStats />}
              </CustomCard>
            )}
            {!isEditingProfile && (
              <ProfileSocial
                data={data.data}
                onChangeEditing={handleSocialEdition}
              />
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
