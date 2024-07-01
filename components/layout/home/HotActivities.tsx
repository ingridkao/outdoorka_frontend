"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TitleSection from "@/components/layout/home/TitleSection";
import CardActivity from "@/components/ui/card/CardActivity";
import Loading from "@/components/ui/loading/loading";
import axios from "@/plugins/api/axios";
import { ActivityState } from "@/types/ActivitiesType";

function HotActivities() {
	const { activity } = axios;
	const theme = useTheme();

	const [activityList, setActivityList] = useState<ActivityState[]>([]);
	const [error, setError] = useState("");

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
	useEffect(() => {
		loadData();
	}, []);
	const reload = (res:boolean) => {
		if(res) loadData();
	}

	if (error) return <div>Failed to load</div>;
	if (activityList.length === 0) return <Loading />;

	return (
		<Box
			sx={{
				position: "relative",
				mb: 25,
				px: 2,
			}}
		>
			<TitleSection title="熱門活動" />

			<Grid container spacing={2}>
				{activityList && activityList.map((value:ActivityState) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
						<CardActivity
							home={true}
							activity={value}
							onLoad={reload}
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
							color: theme.palette.background.default,
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
