import CustomCard from "../../shared/card";
import { Box, Grid, Typography, Stack } from "@mui/material";
import UserAvatar from "../../shared/UserAvatar";
import moment from "moment";
import CustomTag from "../../shared/tag";
import { Category } from "@/app/data/categories";
import LikeWrapper from "./likeWrapper";
import { headers } from "next/headers";
import SharedMenuWrapper from "./SharedMenuWrapper";
import CustomTagWrapper from "../CustomTagWrapper";

interface Props {
  data: {
    _id: string;
    user: {
      _id: string;
      avatar: string | null;
      name: string;
      lastName: string;
      slug: string;
    };
    title: string;
    description: string;
    content: string;
    likes: [];
    slug: string;
    image: string;
    createdAt: string;
    category: Category;
    targetLike: boolean;
  };
}
export default function BlogHeaderCard({ data }: Props) {
  const headersList = headers();

  const host = headersList.get("host"); // to get domain
  const url = headersList.get("next-url"); // to get url

  console.log("host", host);
  console.log("url", url);

  return (
    <CustomCard>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <Box sx={{ marginBottom: 1 }}>
            <UserAvatar
              user={{
                image: data.user.avatar,
                name: data.user.name,
                lastName: data.user.lastName,
                slug: data.user.slug,
              }}
            />
          </Box>

          <CustomTagWrapper name={data.category.name} />
          <Typography variant="h4" component={"h1"} sx={{ marginBottom: 1 }}>
            {data.title}
          </Typography>
          <Typography
            variant="body1"
            component={"p"}
            sx={{ marginBottom: "1rem" }}
          >
            {data.description}
          </Typography>

          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              sx={{ justifyContent: "flex-start" }}
              spacing={1}
              direction={"row"}
            >
              <LikeWrapper
                slug={data.slug}
                likes={data.likes}
                targetLike={data.targetLike}
              />
              <SharedMenuWrapper url={`${host}${url}`} />
            </Stack>
            <Typography fontSize={"14px"}>
              {moment(data.createdAt).format("DD-MM-YYYY")}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </CustomCard>
  );
}
