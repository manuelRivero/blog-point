
import { Box, Stack, Typography, Avatar } from "@mui/material";
import placeholder from "./../../../assets/images/avatar-placeholder.png";
import React from "react";
interface Props {
  user: Data;
}
interface Data {
  image: string | null;
  name: string;
  lastName: string;
}
export default function UserAvatar({ user }: Props) {
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Avatar src={user.image ? user.image : placeholder.src} />
        <Typography>{`${user.name} ${user.lastName}`}</Typography>
      </Stack>
    </Box>
  );
}
