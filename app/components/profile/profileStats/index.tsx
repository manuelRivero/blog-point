import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { numify } from "numify";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { createAccessToken, follow, unFollow } from "@/app/client/user";
import Link from "next/link";

interface Props {
  data: {
    fallowers: number;
    fallow: number;
    blogs: number;
  };
  targetUser: string;
  following: boolean;
  isSameUser: boolean;
}
export default function ProfileStats({
  data,
  targetUser,
  following,
  isSameUser,
}: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean>(following);
  const [followersCount, setFollowersCount] = useState<number>(data.fallowers);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("isSameUser", isSameUser);
  useEffect(() => {
    const getData = async () => {
      try {
        const repsonse = await createAccessToken();
        console.log("AccessToken", repsonse);
      } catch (error) {
        console.log("AccessToken", error.response);
      }
    };

    getData();
  }, []);
  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const response = await follow(targetUser);
      setFollowersCount((prev) => prev + 1);
      setIsFollowing(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnFollow = async () => {
    try {
      setIsLoading(true);
      const response = await unFollow(targetUser);
      setFollowersCount((prev) => prev - 1);
      setIsFollowing(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleStatus = () => {
    if (isLoading) {
      return (
        <Box sx={{ padding: ".5rem" }}>
          <CircularProgress size={"1rem"} color="inherit" />
        </Box>
      );
    } else if (!isLoading && !isSameUser) {
      return !isFollowing ? (
        <>
          <Button
            variant="text"
            sx={(theme) => ({ fontFamily: "OpenSans", textTransform: "none" })}
            endIcon={<PersonAddAlt1Icon />}
            onClick={handleFollow}
          >
            Seguir
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="text"
            sx={(theme) => ({
              fontFamily: "OpenSans",
              textTransform: "none",
              color: theme.palette.error.main,
            })}
            endIcon={<PersonRemoveIcon />}
            onClick={handleUnFollow}
          >
            Dejar de seguir
          </Button>
        </>
      );
    }
  };
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "flex-end" }}
      spacing={4}
      sx={{
        paddingTop: 2,
        justifyContent: "space-between",
        marginTop: 2,
        borderTop: "solid 1px rgba(194, 194, 194, .5)",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Stack
            direction={"column"}
            sx={(theme) => ({
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <Typography
              variant="h6"
              component={"h5"}
              sx={{ height: "24px" }}
              color="text.primary"
            >
              {numify(data.fallow)}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ marginTop: 0 }}
            >
              Seguidos
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={(theme) => ({
              justifyContent: "center",
              color: theme.palette.primary.main,
              alignItems: "center",
            })}
          >
            <Typography
              variant="h6"
              component={"h5"}
              sx={{ height: "24px" }}
              color="text.primary"
            >
              {numify(followersCount)}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ marginTop: 0 }}
            >
              Seguidores
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={(theme) => ({
              justifyContent: "center",
              color: theme.palette.primary.main,
              alignItems: "center",
            })}
          >
            <Typography
              variant="h6"
              component={"h5"}
              sx={{ height: "24px" }}
              color="text.primary"
            >
              {numify(data.blogs)}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ marginTop: 0 }}
            >
              Blogs
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          {handleStatus()}
        </Stack>
      </Box>
    </Stack>
  );
}
