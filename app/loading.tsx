"use client";
import Lottie from "lottie-react";
import animation from "./assets/lottie/loading.json";
import { Box } from "@mui/material";
export default function Loading(){
return(
    <Box sx={{ width:'100%', height: '100vh', display: 'grid', placeContent:'center'}}>
        <Lottie
          animationData={animation}
          loop={true}
          style={{width: '150px'}}

          />
    </Box>
)
}