import React, { useEffect } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button, Modal, Typography } from "@mui/material";
import CustomButton from "../../../customButton";
import CustomInput from "../../../customInput";

const schema = yup.object({
  password: yup.string().required("Campo requerido"),
});
interface Props {
  onSubmit: (values: any) => void;
  resetForm: boolean;
  initialValues:any | null
}
export default function Step3({ onSubmit, resetForm, initialValues }: Props) {
  //form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      password:  initialValues?.password ? initialValues.password :"",
    },
    resolver: yupResolver(schema),
  });
  const submit = (values: any) => {
    console.log("values", values);
    onSubmit(values);
  };
  useEffect(() => {
    if (resetForm) {
      reset();
    }
  }, [resetForm]);
  return (
    <>
      <Typography variant="body1" align="center" sx={{ color: "#c2c2c2", marginBottom: 2 }}>
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
              }}
              label="Contraseña"
              outline={true}
              placeholder=""
            />
          )}
        />
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
