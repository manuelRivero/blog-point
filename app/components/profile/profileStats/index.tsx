import React from "react";
import { Stack, Tooltip, Typography } from "@mui/material";
import { useCore } from "@/app/context/core";

interface Props {
  data:{
    fallowers: number,
    fallow: number,
    blogs:number
  }
}
export default function ProfileStats({data}:Props) {

  return (
    <Stack direction={"row"} spacing={2} sx={{ paddingTop:2, justifyContent: "center", marginTop:2, borderTop:"solid 1px rgba(194, 194, 194, .5)" }}>
      
      <Stack
        direction={"column"}
        sx={(theme) => ({
          justifyContent: "center",
          color: theme.palette.primary.main,
          alignItems:"center"
        })}
      >
        <Typography variant="h6" component={"h5"} color="text.primary" sx={{marginBotom:"4px"}}>
          <strong>{data.fallowers}</strong>
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{marginTop:0}}>
          Seguidos
        </Typography>
      </Stack>
      
      <Stack
        direction={"column"}
        sx={(theme) => ({
          justifyContent: "center",
          color: theme.palette.primary.main,
          alignItems:"center"
        })}
      >
        <Typography variant="h6" component={"h5"} color="text.primary" sx={{marginBotom:"4px"}}>
          <strong>{data.fallowers}</strong>
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{marginTop:0}}>
          Seguidores
        </Typography>
      </Stack>
      <Stack
        direction={"column"}
        sx={(theme) => ({
          justifyContent: "center",
          color: theme.palette.primary.main,
          alignItems:"center"

        })}
      >
        <Typography variant="h6" component={"h5"} color="text.primary" sx={{marginBotom:"4px"}}>
         <strong>{data.blogs}</strong>
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{marginTop:0}}>
          Blogs
        </Typography>
      </Stack>
    </Stack>
  );
}
