import React, { useEffect } from "react";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button, Modal, Typography } from "@mui/material";
import CustomButton from "../../../customButton";
import CustomInput from "../../../customInput";

const schema = yup.object({
  email: yup.string().email("Email invalido").required("Campo requerido"),
});
interface Props {
  onSubmit: (values: any) => void;
  resetForm: boolean;
  initialValues: any;
  error: { fieldName: "email"; error: string } | null;
}
export default function Step1({
  onSubmit,
  resetForm,
  initialValues,
  error,
}: Props) {
  //form
  const { control, handleSubmit, reset, setError, clearErrors } = useForm({
    defaultValues: {
      email: initialValues?.email ? initialValues.email : "",
    },
    resolver: yupResolver(schema),
  });
  const submit = (values: any) => {
    onSubmit(values);
  };
  useEffect(() => {
    if (resetForm) {
      reset();
      clearErrors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm]);

  useEffect(() => {
    if (error) {
      setError(error.fieldName, { type: "custom", message: error.error });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <>
      <Typography
        variant="body1"
        align="center"
        sx={{ color: "#c2c2c2", marginBottom: 2 }}
      >
        {`Empecemos por tu email`}
      </Typography>
      <Box sx={{ marginBottom: "1rem" }}>
        <Controller
          name={"email"}
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
              label="Email"
              outline={true}
              placeholder="Escribe tu email"
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
