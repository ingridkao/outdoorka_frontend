"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TitleSection from "@/components/layout/home/TitleSection";
import CardActivity from "@/components/ui/shared/card-activity";
import Loading from "@/components/ui/loading/loading";
import axios from "@/plugins/api/axios";
import { ActivityState } from "@/types/ActivitiesType";

function HotActivities() {
	const { activity } = axios;
	const theme = useTheme();

	const [activityList, setActivityList] = useState<ActivityState[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadData() {
			try {
				const responseBody = await activity.getHotActivityList();
				if (responseBody && responseBody.data) {
					const resArray = responseBody.data.slice(0, 8);
					setActivityList(resArray);
				}
			} catch (error) {
				setError("Failed to fetch data: " + String(error));
			}
		}
		loadData();
	}, []);

	if (error) return <div>Failed to load</div>;
	if (activityList.length === 0) return <Loading />;

	return (
		<Box
			sx={{
				position: "relative",
				mb: 25,
			}}
		>
			<TitleSection title="熱門活動" />

			<Grid container spacing={2}>
				{activityList?.map((value) => (
					<Grid item xs={12} md={3} key={value._id}>
						<CardActivity
							type="lg"
							activity={{
								title: value.subtitle,
								location: `${value.region} ${value.city}`,
								date: value.activityEndTime,
								photo: value.activityImageUrls[0],
								avatar: value.organizer.photo,
								name: value.organizer.name,
								rating: value.organizer.rating,
								capacity: value.bookedCapacity,
								likers: value.likers,
								// rating: value.popularity
							}}
						/>
					</Grid>
				))}

				<Grid item xs={12} textAlign="center" mt={4}>
					<Button
						component={NextLink}
						href="/activities"
						variant="contained"
						size="medium"
						sx={{
							width: "236px",
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.primary.light,
						}}
					>
						載入更多
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

export default HotActivities;
