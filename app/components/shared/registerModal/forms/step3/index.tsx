import React, { useEffect, useState } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button, Modal, Typography, Stack } from "@mui/material";
import CustomButton from "../../../customButton";
import CustomInput from "../../../customInput";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close";

const upperCaseRegex = /[A-Z]+/;

const lowerCaseRegex = /[a-z]+/;

const numericRegex = /[0-9]+/;

const schema = yup.object({
  password: yup
    .string()
    .required("Campo requerido")
    .matches(upperCaseRegex, {
      message: "La contraseña debe tener al menos una mayúscula",
    })
    .matches(lowerCaseRegex, {
      message: "La contraseña debe tener al menos una minuscula",
    })
    .matches(numericRegex, {
      message: "La contraseña debe tener al menos un numero",
    }).min(8, "La contraseña debe tener al menos ocho caracteres" )
});
interface Props {
  onSubmit: (values: any) => void;
  resetForm: boolean;
  initialValues: any | null;
}
export default function Step3({ onSubmit, resetForm, initialValues }: Props) {
  const [hasUpperCase, setHasUppercase] = useState<boolean>(false);
  const [hasLowerCase, setHasLowerCase] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  //form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      password: initialValues?.password ? initialValues.password : "",
    },
    resolver: yupResolver(schema),
  });
  const submit = (values: any) => {
    console.log("values", values);
    onSubmit(values);
  };
  const checkRegex = () => {
    setHasUppercase(upperCaseRegex.test(inputValue));
    setHasLowerCase(lowerCaseRegex.test(inputValue));
    setHasNumber(numericRegex.test(inputValue));
  };
  useEffect(() => {
    if (resetForm) {
      reset();
    }
  }, [resetForm]);

  useEffect(() => {
    checkRegex();
  }, [inputValue]);
  return (
    <>
      <Typography
        variant="body1"
        align="center"
        sx={{ color: "#c2c2c2", marginBottom: 2 }}
      >
        Asegura tu cuenta
      </Typography>
      <Box sx={{ marginBottom: "1rem" }}>
        <Controller
          name={"password"}
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              type="password"
              error={fieldState.error}
              value={field.value}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                field.onChange(e.target.value);
                setInputValue(e.target.value);
              }}
              label="Contraseña"
              outline={true}
              placeholder="Escribe tu contraseña"
            />
          )}
        />
        <Typography variant="body1" component={"p"} sx={{ color: "#c2c2c2" }}>
          Requisitos de la contraseña:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1" component={"p"} sx={{ color: "#c2c2c2" }}>
            Ocho caracteres
          </Typography>
          {inputValue.length >= 8 ? <CheckIcon color="success" /> : <CloseIcon color={"warning"} />}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1" component={"p"} sx={{ color: "#c2c2c2" }}>
            Una mayúscula
          </Typography>
          {hasUpperCase ? <CheckIcon color="success" /> : <CloseIcon color={"warning"} />}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1" component={"p"} sx={{ color: "#c2c2c2" }}>
            Una minuscula
          </Typography>
          {hasLowerCase ? <CheckIcon color="success" /> : <CloseIcon color={"warning"} />}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1" component={"p"} sx={{ color: "#c2c2c2" }}>
            Un Numero
          </Typography>
          {hasNumber ? <CheckIcon color="success" /> : <CloseIcon color={"warning"} />}
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <CustomButton
          type="button"
          color="primary"
          variant="contained"
          title="Siguiente"
          disabled={false}
          isLoading={false}
          cb={handleSubmit(submit)}
        />
      </Box>
    </>
  );
}
