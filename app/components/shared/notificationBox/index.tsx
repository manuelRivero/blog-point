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

  return (
    <Box sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        {/* <UserAvatar user={data.user} /> */}
        {data.title}
        <Typography
          variant="body1"
          component="p"
          fontWeight={"bold"}
          sx={{ whiteSpace: "break-spaces" }}
        >
          {data.body}
        </Typography>
      </Stack>
    </Box>
  );
}
