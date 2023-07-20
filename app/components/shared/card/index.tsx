import { Card } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function CustomCard({ children }: Props) {
  return (
    <Card
      sx={{ padding: "1rem", borderRadius: "1rem", backgroundColor: "#fff" }}
    >
      {children}
    </Card>
  );
}
