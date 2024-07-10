"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { fetchActivities } from "@/features/activity/activitySlice";
import MainLayout from "@/components/layout/MainLayout/MainLayout";

function ListPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const activities = useSelector((state: any) => state.activities.items);
  const status = useSelector((state: any) => state.activities.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchActivities());
    }
  }, [dispatch, status]);

  return (
    <MainLayout>
      <Typography
        variant="h2"
        sx={{
          fontSize: 28,
          fontWeight: 700,
          [theme.breakpoints.down("md")]: {
            color: theme.palette.secondary.main,
          },
        }}
      >
        List of Activities
      </Typography>
      {activities?.map((activity: any) => (
        <Box key={activity.id}>
          <Typography
            variant="h4"
            sx={{
              fontSize: 20,
              [theme.breakpoints.down("md")]: {
                color: theme.palette.secondary.main,
              },
            }}
          >
            {activity.title}
          </Typography>
          <Box component="p">{activity.body}</Box>
        </Box>
      ))}
    </MainLayout>
  );
}

export default ListPage;
