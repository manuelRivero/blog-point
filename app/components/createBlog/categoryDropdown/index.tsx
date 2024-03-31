"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomInput from "../../shared/customInput";
import { Box, Modal, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setInfoModal, useCore } from "@/app/context/core";
import { createCategory, getCategories } from "@/app/client/category";
import CustomButton from "../../shared/customButton";
import { Category } from "@/app/data/categories";

interface Form {
  name: string;
}
interface Props {
  field: any;
  fieldState: ControllerFieldState;
}

const categoriesList: Category[] = [
  { _id: "1", name: "Medicina general" },
  { _id: "2", name: "Apuntes" },
  { _id: "3", name: "Anatomía" },
];

const schema = yup.object({
  name: yup.string().required("Campo requerido"),
});

export default function CategoryDropdown({ field, fieldState }: Props) {
  const [, coreDispatch] = useCore();

  //form
  const { control, handleSubmit, reset } = useForm<Form>({
    resolver: yupResolver(schema),
  });
  //states
  const [page, setPage] = React.useState(0);
  const [formAlert, setFormAlert] = React.useState<null | string>(null);
  const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCategoryModal, setOpenCategoryModal] =
    React.useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState<Category | null>(
    null
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
    field.onChange({ title: e.name, id: e._id });
  };

  const handleNewCategory = () => {};

  const submit = async (values: Form) => {
    try {
      setLoadingSubmit(true);
      const { data } = await createCategory({ ...values });
      const newCategoriesList = categories ? categories : [];
      setCategories([data.category, ...newCategoriesList]);
      setOpenCategoryModal(false)
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
  React.useEffect(() => {
    const getData = async () => {
      console.log("category call");
      try {
        const { data } = await getCategories({ page });
        setCategories(data.categories);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(()=>{
    if (field.value && field.value !== "") {
      console.log("field.value",field.value)
      setSelectedValue({_id:field.value.id, name:field.value.title});
    }
  },[field.value]);

  return (
    <div>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <CustomInput
          outline={true}
          error={fieldState.error}
          label="Categoría"
          placeholder="Selecciona"
          onChange={() => {}}
          type="text"
          value={selectedValue?.name || ""}
        />
        <Box
          sx={{
            position: "absolute",
            right: 16,
            top: 35,
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon />
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories?.map((e: Category) => {
          return (
            <MenuItem
              key={e._id}
              onClick={() => {
                handleClose();
                handleCategoryClick(e);
              }}
            >
              {e.name}
            </MenuItem>
          );
        })}
        <MenuItem onClick={handleNewCategory}>
          <Stack direction="row" spacing={4}>
            <Typography onClick={() => setOpenCategoryModal(true)}>
              Agregar nueva categoría
            </Typography>
            <AddCircleOutlineIcon color="primary" />
          </Stack>
        </MenuItem>
      </Menu>
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
                    maxLength={15}
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
