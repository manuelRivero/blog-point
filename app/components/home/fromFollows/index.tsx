"use client"
import { useCore } from '@/app/context/core'
import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import BlogCard from '../../blogCard'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function FromFollows() {

    return (
    <Box sx={{ marginBottom: 4 }}>
    <Typography variant="h3" sx={{ marginBottom: 2 }}>
      Tendencias en Historial Medico
    </Typography>

    <Stack direction="column" spacing={4}>
      {data &&
        data.blogsData.blogs[0].data.map((e: any, index: number) => {
          return (
            <BlogCard
              key={index}
              userAvatar={{
                name: e.user[0].name,
                lastName: e.user[0].lastName,
                image: e.user[0].avatar,
                slug: e.user[0].slug,
              }}
              data={{ ...e, category: e.category[0].name }}
              preview={false}
              showDescriptionTooltip={false}
              showTitleTooltip={false}
            />
          );
        })}
    </Stack>
    <Stack justifyContent={"center"} direction={"row"} mt={4} mb={4}>
      <Link href={"/tendencias"} style={{textDecoration: 'none'}}>
        <Button variant="contained">Ver más</Button>
      </Link>
    </Stack>
  </Box>
  )
}
