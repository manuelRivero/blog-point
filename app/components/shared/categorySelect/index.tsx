"use client";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material/styles";
import { getAllCategories } from "@/app/client/category";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CategorySelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        console.log("getAllCategories", error);
      }
    };

    getData();
  }, []);

  const handleCategoryChange = (event, value) => {
    if (
      value &&
      !selectedCategories.some((category: string) => category === value)
    ) {
      const newSelectedCategories = [...selectedCategories, value];
      setSelectedCategories(newSelectedCategories);
      setSearchTerm("");
    }
  };

  const handleRemoveCategory = (category) => {
    const newSelectedCategories = selectedCategories.filter(
      (selectedCategory) => selectedCategory !== category
    );
    setSelectedCategories(newSelectedCategories);
  };

  useEffect(() => {
    router.push(
      `${selectedCategories
        .map((element: any, index: number) => {
          const target: any =
            categories.find((e: any) => e.name === element) ?? null;
          if (target) {
            return `${index === 0 ? "?" : "&"}category=${target._id}`;
          }
        })
        .join("")}`
    );
  }, [selectedCategories]);

  useEffect(() => {
    if (categories) {
      const ids = new URLSearchParams(searchParams.toString()).getAll(
        "category"
      );
      const categoriesFromParams = ids.map((id: any) => {
        const target: any = categories.find((e: any) => e._id === id) ?? null;
        if (target) {
          return target.name;
        }
      });
      setSelectedCategories(categoriesFromParams);
    }
  }, [categories]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Explora las categorías en Historial Medico
      </Typography>
      <Autocomplete
        sx={(theme) => ({
          "& .MuiInput-root": {
            marginTop: "2rem",
            backgroundColor: "red",
            width: "100%",
            maxWidth: "300px",
          },
          "& .MuiInputBase-root": {
            width: "100%",
            maxWidth: "300px",
          },
          "&: after": {
            display: "none",
          },
          "&: before": {
            display: "none",
          },
          "& .MuiInputBase-input": {
            borderRadius: 4,
            position: "relative",
            backgroundColor: "#fff",
            fontSize: 16,
            transition: theme.transitions.create([
              "border-color",
              "background-color",
              "box-shadow",
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: "OpenSans",
            "&:focus": {
              outline: "none",
              boxShadow: `${alpha(
                theme.palette.primary.main,
                0.25
              )} 0 0 0 0.2rem`,
              borderColor: theme.palette.primary.main,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiAutocomplete-input": {
            padding: "8px 8px !important",
          },
          " & .MuiInputLabel-root": {
            left: "1rem",
          },
        })}
        options={categories.map((element: any) => element.name)}
        freeSolo
        value={searchTerm}
        placeholder="Buscar categoria"
        onChange={handleCategoryChange}
        onInputChange={(event, value) => setSearchTerm(value)}
        renderInput={(params) => (
          <TextField {...params} label="Buscar categoría" />
        )}
      />
      <Stack direction="row" spacing={2} style={{ marginTop: 10 }}>
        {selectedCategories.map((category) => (
          <Chip
            key={category} // Ensure unique key for each chip
            label={category}
            sx={(theme) => ({
              background: theme.palette.secondary.main,
              color: "#fff",
            })}
            onDelete={() => handleRemoveCategory(category)}
            deleteIcon={
              <IconButton aria-label="delete">
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            } // Add delete icon
          />
        ))}
      </Stack>
    </Container>
  );
}
