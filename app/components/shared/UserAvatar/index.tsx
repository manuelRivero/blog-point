
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
  slug: string;
}
export default function UserAvatar({ user }: Props) {
  return (
    <Box component={Link} href={"/perfil/" + user.slug}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Avatar sx={{width:24, height:24}} src={user.image ? user.image : placeholder.src} />
        <Typography>{`${user.name} ${user.lastName}`}</Typography>
      </Stack>
    </Box>
  );
}
