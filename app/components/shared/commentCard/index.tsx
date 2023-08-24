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
import { getCommentsResponses } from "@/app/client/blogs";
import { useParams } from "next/navigation";

const schema = yup.object({
  comment: yup.string().required("Campo requerido"),
});
interface Props {
  data: {
    content: string;
    createAt: string;
    user: [
      {
        _id: string;
        avatar: string;
        slug: string;
        lastName: string;
        name: string;
      }
    ];
    _id: string;
  };
}
interface Response {
  _id: string;
  user: [ {
    "_id": string,
    "avatar": string,
    "slug": string,
    "lastName": string,
    "name": string
}];
  content: string;
}
export default function CommentCard({ data }: Props) {
  const { slug } = useParams();
  const inputRef = useRef<HTMLElement | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const userData = useMemo(
    () => ({
      name: data.user[0].name,
      lastName: data.user[0].lastName,
      image: data.user[0].avatar,
    }),
    [data]
  );
  //form
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const showInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    setShowCommentInput(true);
  };
  const hideInput = () => {
    setShowCommentInput(false);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getCommentsResponses(slug.toString(), data._id, 0);
      console.log("response data", response.data);
      setResponses(response.data.responses);
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
            {moment(data.createAt).format("DD-MM-YYYY")}
          </Typography>
        </Stack>
        <Typography>{data.content}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          variant="text"
          sx={{ fontSize: 12 }}
          onClick={() => {
            showCommentInput ? hideInput() : showInput();
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
                    {moment().format("DD-MM-YYYY")}
                  </Typography>
                </Stack>
                <Typography>
                  {e.content}
                </Typography>
              </Stack>
            </Stack>
          );
        })}

        <Box ref={inputRef}>
          {showCommentInput && (
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
                        name={"comment"}
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
                <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ fontSize: 14 }}
                    onClick={() => setShowCommentInput(!showCommentInput)}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" sx={{ fontSize: 14 }}>
                    Responder
                  </Button>
                </Stack>
              </Stack>
            </ClickAwayListener>
          )}
        </Box>
      </Box>
    </Box>
  );
}
