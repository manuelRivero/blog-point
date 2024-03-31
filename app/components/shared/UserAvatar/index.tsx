
import { Box, Stack, Typography, Avatar } from "@mui/material";
import placeholder from "./../../../assets/images/avatar-placeholder.png";
import React from "react";
import Link from "next/link";
interface Props {
  user: Data;
}
interface Data {
  image: string | null;
  name: string;
  lastName: string;
  slug: string
}
export default function UserAvatar({ user }: Props) {
  return (
    <Link href={"perfil/" + user.slug} style={{ textDecoration: "none" }}>
      <Box>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Avatar sx={{ width: 24, height: 24 }} src={user.image ? user.image : placeholder.src} />
          <Typography variant="body1" color={"text"}>{`${user.name} ${user.lastName}`}</Typography>
        </Stack>
      </Box>
    </Link >
  );
}
