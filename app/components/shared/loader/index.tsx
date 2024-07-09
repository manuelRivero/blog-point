"use client";
import Lottie from "lottie-react";
import animation from "../../../assets/lottie/loading.json";
import { Stack } from "@mui/material";
export default function Loader(){
return(
    <Stack direction="column" justifyContent="center" alignItems="center">
        <Lottie
          animationData={animation}
          loop={true}
          style={{width: '50px'}}

          />
    </Stack>
)
}