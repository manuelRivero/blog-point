"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomInput from "../../shared/customInput";
import {
  alpha,
  Box,
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuList,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setInfoModal, useCore } from "@/app/context/core";
import {
  createCategory,
  getAllCategories,
  getCategories,
} from "@/app/client/category";
import CustomButton from "../../shared/customButton";
import { Category } from "@/app/data/categories";
import debounce from "lodash.debounce";

interface Form {
  name: string;
}
interface Props {
  field: any;
  error: any;
}

const schema = yup.object({
  name: yup.string().required("Campo requerido"),
});

export default function CategoryDropdown({ field, error }: Props) {
  const [, coreDispatch] = useCore();
  const inputRef = React.useRef<string>("");

  //form
  const { control, handleSubmit, reset } = useForm<Form>({
    resolver: yupResolver(schema),
  });
  //states
  const [formAlert, setFormAlert] = React.useState<null | string>(null);
  const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<string>("");
  const [openCategoryModal, setOpenCategoryModal] =
    React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [selectedValue, setSelectedValue] = React.useState<Category | null>(
    null
  );
  const searchHandler = async () => {
    if (inputRef.current.length >= 2) {
      setIsOpen(true);
      const { data } = await getAllCategories(inputRef.current);
      console.log("getAllCategories", data);

      setCategories(data.categories);
    } else {
      setIsOpen(false);
      setCategories([]);
    }
  };
  const debouncedChangeHandler = React.useMemo(
    () => debounce(searchHandler, 1000),
    []
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = (e: Category) => {
    setSelectedValue(e);
    setIsOpen(false)
    field.onChange({ title: e.name, id: e._id });
  };

  const getHighlightedText = (text: string, highlight: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  const submit = async (values: Form) => {
    try {
      setLoadingSubmit(true);
      const { data } = await createCategory({ ...values });
      const newCategoriesList = categories ? categories : [];
      setCategories([data.category, ...newCategoriesList]);
      setOpenCategoryModal(false);
      setInfoModal(coreDispatch, {
        status: "success",
        title: "Se ha creado la categoría",
        hasCancel: null,
        hasSubmit: {
          title: "Ok",
          cb: () => {
            setInfoModal(coreDispatch, null);
            reset({});
          },
        },
        onAnimationEnd: null,
      });
    } catch (error: any) {
      setInfoModal(coreDispatch, {
        status: "error",
        title: error.response.data.error,
        hasCancel: null,
        hasSubmit: {
          title: "Intentar nuevamente",
          cb: () => {
            setInfoModal(coreDispatch, null);
            setOpenCategoryModal(false);
            reset({});
          },
        },
        onAnimationEnd: null,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };
  const handleEmpty = () => {
    if (categories.length === 0 && inputRef.current.length < 2) {
      return (
        <Typography variant="body1" textAlign={"center"}>
          Busca la categoría que mejor defina tu publicación.
        </Typography>
      );
    }
    if (categories.length === 0 && inputRef.current.length >= 2) {
      return (
        <Typography variant="body1" textAlign={"center"}>
          No encontramos resultados, adelante crea una nueva categoría.
        </Typography>
      );
    }
  };
  console.log("field state", error);
  return (
    <div>
      <InputLabel
        sx={(theme) => ({
          marginBottom: ".25rem",
          marginLeft: ".8rem",
        })}
      >
        Categoría
      </InputLabel>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          "& > .MuiInput-root": {
            width: "100%",
          },
        }}
      >
        <Input
          ref={inputRef}
          sx={(theme) => ({
            position: "relative",
            "&: after": {
              display: "none",
            },
            "&: before": {
              display: "none",
            },

            "& .MuiInputBase-input": {
              fontWeight: selectedValue ? "bold" : "regular",
              borderRadius: 2,
              position: "relative",
              backgroundColor: "#fff",
              fontSize: 16,
              width: "100%",
              padding: "10px 12px",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
              transition: theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
              ]),
              // Use the system font instead of the default Roboto font.
              fontFamily: "OpenSans",
              "&:focus": {
                boxShadow: `${alpha(
                  theme.palette.primary.main,
                  0.25
                )} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
              },
            },
          })}
          placeholder="Busca y selecciona"
          value={selectedValue ? selectedValue.name : value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if(selectedValue) return
            debouncedChangeHandler();
            setValue(e.target.value);
            inputRef.current = e.target.value;
          }}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ position: "absolute", right: "1rem", top: "1.4rem" }}
            >
              <Stack direction={"row"} spacing={1} justifyContent="flex-end">
                {selectedValue && (
                  <IconButton
                    onClick={() => {
                      setSelectedValue(null);
                      inputRef.current = "";
                      setValue("");
                      field.onChange(undefined);
                      setCategories([])
                    }}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                )}
                {!selectedValue && (
                  <IconButton
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                )}
              </Stack>
            </InputAdornment>
          }
        />
        {isOpen && (
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Paper
              sx={{
                zIndex: 100,
                borderRadius: 4,
                padding: 2,
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                transform: "translateY(100%) translateY(5px)",
              }}
            >
              {categories.length > 0 ? (
                <MenuList sx={{ maxHeight: "250px", overflow: "auto" }}>
                  {categories.map((e: Category) => {
                    return (
                      <MenuItem
                        key={e._id}
                        sx={{
                          borderRadius: 2,
                          border: "#c2c2c2",
                          boxShadow: " 0 0 15px -5px rgba(0,0,0, .1)",
                          marginBottom: 1,
                          whiteSpace: "break-spaces",
                        }}
                        onClick={() => handleCategoryClick(e)}
                      >
                        <Box>
                          <Typography variant="body1">
                            {getHighlightedText(e.name, value)}
                          </Typography>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              ) : (
                handleEmpty()
              )}

              <Stack
                onClick={() => {
                  setOpenCategoryModal(true);
                }}
                direction="row"
                spacing={4}
                justifyContent={"center"}
                sx={{ padding: 2, cursor: "pointer" }}
              >
                <Typography>Agregar nueva categoría</Typography>
                <AddCircleOutlineIcon color="primary" />
              </Stack>
            </Paper>
          </ClickAwayListener>
        )}
      </Box>
      {error && (
        <Typography sx={{ marginLeft: ".8rem", fontSize: 12 }} color={"error"}>
          Campo requerido, selecciona de la lista
        </Typography>
      )}
      <Modal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(submit)}>
            <Box sx={{ marginBottom: 1 }}>
              <Controller
                name={"name"}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomInput
                    maxLength={30}
                    type="text"
                    error={fieldState.error}
                    value={field.value}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      field.onChange(e.target.value);
                    }}
                    label="Nombre de la categoría"
                    outline={true}
                    placeholder="Escribe el nombre de la categoría"
                  />
                )}
              />
            </Box>
            {formAlert && <Box sx={{ marginBottom: 1 }}>{formAlert}</Box>}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: 1,
              }}
            >
              <CustomButton
                type="submit"
                color="primary"
                variant="contained"
                title="Aceptar"
                cb={() => {}}
                disabled={loadingSubmit}
                isLoading={loadingSubmit}
              />
              <Button
                variant={"outlined"}
                onClick={() => {
                  setOpenCategoryModal(false);
                  reset({});
                }}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
