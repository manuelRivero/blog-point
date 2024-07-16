"use client";
import { Box } from "@mui/material";
import CategorySelection from "../components/shared/categorySelect";
import ContentWrapper from "../components/shared/contentWrapper";

const Categories = () => {
  return (
    <div>
      <Box>
        <CategorySelection />
      </Box>
      <ContentWrapper
        type="category"
        hasTitle={false}
        emptyStateTitle={
          "Selecciona una categoría y empiza a explorar el mejor contenido"
        }
        data={[]}
        metadata={[{ count: 0 }]}
      />
    </div>
  );
};

export default Categories;
