"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  ClickAwayListener,
} from "@mui/material";
import UserAvatar from "../UserAvatar";
import moment from "moment";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../customInput";
import { createResponse, getCommentsResponses } from "@/app/client/blogs";
import { useParams } from "next/navigation";
import { setInfoModal, useCore } from "@/app/context/core";
import CustomButton from "../customButton";

const schema = yup.object({
  response: yup.string().required("Campo requerido"),
});
interface Props {
  data: {
    content: string;
    createdAt: string;
    user: [
      {
        _id?: string;
        avatar: string;
        slug: string;
        lastName: string;
        name: string;
      }
    ];
    _id?: string;
  };
}
interface Response {
  _id: string;
  user: [
    {
      _id: string;
      avatar: string;
      slug: string;
      lastName: string;
      name: string;
    }
  ];
  content: string;
}

interface Values {
  response: string;
}
export default function CommentCard({ data }: Props) {
  const { slug } = useParams();
  const inputRef = useRef<HTMLElement | null>(null);
  const [, coreDispatch] = useCore();
  const [showResponseInput, setShowResponseInput] = useState<boolean>(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const userData = useMemo(
    () => ({
      name: data.user[0].name,
      lastName: data.user[0].lastName,
      image: data.user[0].avatar,
    }),
    [data]
  );
  //form
  const { control, handleSubmit, reset, setValue } = useForm<Values>({
    resolver: yupResolver(schema),
  });

  const showInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    setShowResponseInput(true);
  };
  const hideInput = () => {
    setShowResponseInput(false);
  };
  const submit = async (values: Values) => {
    try {
      if (data._id) {
        setLoadingSubmit(true);
        const response = await createResponse({
          slug: slug.toString(),
          commentId: data._id,
          content: values.response,
        });
        setResponses([
          {
            _id: response.data.data[0].comments.responses._id,
            user: [
              {
                _id: response.data.data[0].user[0]._id,
                avatar: response.data.data[0].user[0].avatar,
                slug: response.data.data[0].user[0].slug,
                lastName: response.data.data[0].user[0].lastName,
                name: response.data.data[0].user[0].name,
              },
            ],
            content: response.data.data[0].comments.responses.content,
          },
          ...responses,
        ]);
        setValue("response", "");
        setInfoModal(coreDispatch, {
          status: "success",
          title: "",
          hasCancel: null,
          hasSubmit: null,
          onAnimationEnd: () => setInfoModal(coreDispatch, null),
        });
      }
    } catch (error) {
      setInfoModal(coreDispatch, {
        status: "error",
        title: "No se pudo crear tu respuesta",
        hasCancel: null,
        hasSubmit: {
          title: "Intentar nuevamente",
          cb: () => {
            setInfoModal(coreDispatch, null);
          },
        },
        onAnimationEnd: null,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      if (data._id) {
        const response = await getCommentsResponses(
          slug.toString(),
          data._id,
          0
        );
        console.log("response data", response.data);
        setResponses(response.data.responses);
      }
    };
    getData();
  }, []);
  return (
    <Box>
      <Stack
        direction="column"
        sx={{ width: "fit-content", padding: 1, borderRadius: 2 }}
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <UserAvatar user={userData} />
          <Typography fontSize={"14px"} align="right">
            {moment(data.createdAt).format("DD-MM-YYYY")}
          </Typography>
        </Stack>
        <Typography>{data.content}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          variant="text"
          sx={{ fontSize: 12 }}
          onClick={() => {
            showResponseInput ? hideInput() : showInput();
          }}
        >
          Responder
        </Button>
      </Stack>

      <Box>
        {responses.map((e, index) => {
          return (
            <Stack direction="row" key={e._id}>
              <Box
                sx={{
                  borderLeft: "solid 1px rgba(194, 194, 194, .5)",
                  height: 50,
                  width: 50,
                  marginLeft: 2,
                  borderBottom: "solid 1px rgba(194, 194, 194, .5)",
                }}
              ></Box>
              <Stack
                direction="column"
                sx={{ width: "fit-content", padding: 1, borderRadius: 2 }}
              >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  <UserAvatar
                    user={{
                      name: e.user[0].name,
                      lastName: e.user[0].lastName,
                      image: e.user[0].avatar,
                    }}
                  />
                  <Typography fontSize={"14px"} align="right">
                    {moment(e.createdAt).format("DD-MM-YYYY")}
                  </Typography>
                </Stack>
                <Typography>{e.content}</Typography>
              </Stack>
            </Stack>
          );
        })}

        <Box ref={inputRef}>
          <form onSubmit={handleSubmit(submit)}>
            {showResponseInput && (
              <ClickAwayListener onClickAway={hideInput}>
                <Stack>
                  <Stack direction="row">
                    <Box
                      sx={{
                        borderLeft: "solid 1px rgba(194, 194, 194, .5)",
                        height: 50,
                        width: 50,
                        marginLeft: 2,
                        borderBottom: "solid 1px rgba(194, 194, 194, .5)",
                      }}
                    ></Box>
                    <Box sx={{ width: "100%" }}>
                      <Box>
                        <Controller
                          name={"response"}
                          control={control}
                          render={({ field, fieldState }) => (
                            <CustomInput
                              maxLength={120}
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
                              hasLabel={false}
                              label="Respuesta"
                              outline={true}
                              placeholder="Escribe tu respuesta"
                              multiline={true}
                              rows={2}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    spacing={2}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ fontSize: 14 }}
                      onClick={() => setShowResponseInput(!showResponseInput)}
                    >
                      Cancelar
                    </Button>
                    <CustomButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      title="Responder"
                      cb={() => {}}
                      disabled={loadingSubmit}
                      isLoading={loadingSubmit}
                    />
                  </Stack>
                </Stack>
              </ClickAwayListener>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
}
