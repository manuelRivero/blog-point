import React, { useEffect } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Typography } from "@mui/material";
import CustomButton from "../../../customButton";
import CustomInput from "../../../customInput";

const schema = yup.object({
  name: yup.string().required("Campo requerido"),
  lastName: yup.string().required("Campo requerido"),
});
interface Props {
  onSubmit: (values: any) => void;
  resetForm: boolean;
}
export default function Step2({ onSubmit, resetForm }: Props) {
  //form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
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
    <Typography variant="body1" align="center" sx={{color:"#c2c2c2",  marginBottom:2}}>
    Ingresa tus datos personales
    </Typography>
      <Box sx={{ marginBottom: "1rem" }}>
        <Controller
          name={"name"}
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              type="text"
              error={fieldState.error}
              value={field.value}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                field.onChange(e.target.value);
              }}
              label="Nombres"
              outline={true}
              placeholder=""
            />
          )}
        />
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <Controller
          name={"lastName"}
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              type="text"
              error={fieldState.error}
              value={field.value}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                field.onChange(e.target.value);
              }}
              label="Apellidos"
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
