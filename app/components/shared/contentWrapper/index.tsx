"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BlogCard from "../../blogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { getPopular, getRecent } from "@/app/client/blogs";
import Loader from "../loader";
import Lottie from "lottie-react";
import animation from "./../../../assets/lottie/ghost.json";

interface Props {
  title: string;
  data: any[];
  metadata: [{ count: number }];
}

export default function ContentWrapper({ title, data, metadata }: Props) {
  const [dataList, setDataList] = useState<any[]>(data);
  const [page, setPage] = useState<number>(0);

  const getData = async () => {
    try {      
      switch (title) {
        case "Tendencias en Historial Médico":
          const { data: trendingData } = await getPopular(page + 1, 3);
          setDataList([...dataList, ...trendingData.blogs[0].data]);
          setPage((prev) => prev + 1);
          break;
        case "Lo más nuevo":          
          const { data: recentData } = await getRecent(page + 1, 3);
          setDataList([...dataList, ...recentData.blogs[0].data]);
          setPage((prev) => prev + 1);
          break;
      }
    } catch (error) {
      console.log("Trending error", error);
    }
  };

  console.log("ContentWrapper", data);
  return (
    <Container sx={{ paddingBottom: 8, marginTop: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} lg={8}>
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
              {title}
            </Typography>
            <Stack direction="column" spacing={4}>
              <InfiniteScroll
                dataLength={metadata[0].count} //This is important field to render the next data
                next={getData}
                hasMore={Boolean(metadata[0].count > dataList.length)}
                loader={<Loader />}
                endMessage={
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Lottie
                      animationData={animation}
                      loop={true}
                      style={{ width: "100px" }}
                    />
                    <Typography variant={"body1"}>
                      Has llegado al final del camino
                    </Typography>
                  </Stack>
                }
              >
                {dataList &&
                  dataList.map((e: any, index: number) => {
                    return (
                      <Box key={e._id} sx={{ marginBottom: "1.5rem" }}>
                        <BlogCard
                          userAvatar={{
                            name: e.user[0].name,
                            lastName: e.user[0].name,
                            image: e.user[0].avatar,
                            slug: e.user[0].slug,
                          }}
                          data={{ ...e, category: e.category[0].name }}
                          preview={false}
                          showDescriptionTooltip={false}
                          showTitleTooltip={false}
                        />
                      </Box>
                    );
                  })}
              </InfiniteScroll>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box />
        </Grid>
      </Grid>
    </Container>
  );
}
