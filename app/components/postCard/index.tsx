import React from "react";
import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
  CardMedia
} from "@mui/material";

import Image from "./../../assets/images/post-placeholder.jpg"

export default function PostCard() {
  return (
    <Card sx={{padding:"1rem", borderRadius:"1rem"}}>
         <CardMedia
         sx={{borderRadius:"1rem"}}
        component="img"
        height="194"
        image={Image.src}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" color="text.primary" component="h6">
          benevolent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          adjective
        </Typography>
        <Typography variant="body1" color="text.primary">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
