import React from "react";
import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
  CardMedia,
  Box,
} from "@mui/material";

import Image from "./../../assets/images/post-placeholder.jpg";

interface Props {
  data: Data;
  preview: boolean;
}
interface Data {
  title: string;
  image: string | null;
  description: string;
  date?: string;
  link?: string;
}

export default function BlogCard({ data, preview }: Props) {
  return (
    <Card sx={{ padding: "1rem", borderRadius: "1rem", maxWidth: 335 }}>
      <CardMedia
        sx={{ borderRadius: "1rem", width: 300, height: 300 }}
        component="img"
        image={data.image ? data.image : Image.src}
        alt="Paella dish"
      />
      <CardContent>
        {data.title ? (
          <Typography variant="h5" color="text.primary" component="h6" sx={{ mb: 1 }}>
            {data.title}
          </Typography>
        ) : (
          <Box
            sx={{
              height: 20,
              marginBottom:2,
              width: "100%",
              background: "#c2c2c2",
              borderRadius: '4px',
            }}
          ></Box>
        )}
        {data.description ?<Typography sx={{ mb: 1.5 }} color="text.primary">
          {data.description}
        </Typography> : <Box
            sx={{
              height: 40,
              width: "100%",
              background: "#c2c2c2",
              borderRadius: '4px',
            }}
          ></Box>}
      </CardContent>
      {preview ? null : (
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Button variant="contained" size="small">
            Leer
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
