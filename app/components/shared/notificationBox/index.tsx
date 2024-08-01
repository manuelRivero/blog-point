import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";
import { JsxElement } from "typescript";
import { concatDots } from "@/app/helpers/text";
import { Notification } from "@/app/data/notifications";

interface Props {
  data: Notification
}

export default function NotificationBox({ data }: Props) {
console.log('...', data);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        {/* <UserAvatar user={data.user} /> */}
        <Typography
          variant="h6"
          component="h6"
          fontWeight={"bold"}
          sx={{ whiteSpace: "break-spaces" }}
        >
        {data.title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ whiteSpace: "break-spaces" }}
        >
          {data.body}
        </Typography>
      </Stack>
    </Box>
  );
}
