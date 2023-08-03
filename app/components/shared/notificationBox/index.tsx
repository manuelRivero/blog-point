import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";
import { JsxElement } from "typescript";
import { concatDots } from "@/app/helpers/text";

interface Props {
  data: {
    user: { name: string; lastName: string; image: string | null };
    action: "like-post" | "like-comment" | "like-response";
    blogName: string;
    link: string;
  };
}

export default function NotificationBox({ data }: Props) {
  const getAction = () => {
    switch (data.action) {
      case "like-post":
        return <Typography>le gustó tu blog</Typography>;
      case "like-comment":
        return <Typography>dió me gusta a tu comentario en:</Typography>;
      case "like-response":
        return <Typography>dió me gusta a tu respuesta en:</Typography>;
      default:
        break;
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        <UserAvatar user={data.user} />
        {getAction()}
        <Typography
          variant="body1"
          component="p"
          fontWeight={"bold"}
          sx={{ whiteSpace: "break-spaces" }}
        >
          {concatDots("Primer blog de pruebas con titulo medianamente largo", 60)}
        </Typography>
      </Stack>
    </Box>
  );
}
