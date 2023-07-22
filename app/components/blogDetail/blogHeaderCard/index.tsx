import React from "react";
import CustomCard from "../../shared/card";
import { Grid, Typography } from "@mui/material";
import Image from "./../../../assets/images/post-placeholder.jpg";
import UserAvatar from "../../shared/UserAvatar";
import moment from "moment";


const avatarData = { name: "Manuel", lastName: "Rivero", image: null };

export default function BlogHeaderCard() {
  return (
    <CustomCard>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h1" component={"h1"} sx={{marginBottom: "1rem"}}>
            Titulo del Blog
          </Typography>
          <Typography variant="body1" component={"p"} sx={{marginBottom: "1rem"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum orci vitae ipsum venenatis, in porta lacus sagittis. Phasellus efficitur interdum lorem, sit amet tincidunt enim elementum vitae
          </Typography>
          <Typography fontSize={"14px"} sx={{marginBottom: "1rem"}}>
            {moment().format("DD-MM-YYYY")}
          </Typography>
          <UserAvatar user={avatarData} />
        </Grid>
        <Grid item sm={6}>
          <img
            src={Image.src}
            style={{ width: "100%" }}
            alt="Imagen del post"
          />
        </Grid>
      </Grid>
    </CustomCard>
  );
}
