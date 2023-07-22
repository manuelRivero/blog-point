import { Card } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function CustomCard({ children }: Props) {
  return (
    <Card
      sx={{ padding: "1.5rem", borderRadius: "1rem", backgroundColor: "#fff", boxShadow:" 0 0 15px -5px rgba(0,0,0, .5)" }}
    >
      {children}
    </Card>
  );
}
