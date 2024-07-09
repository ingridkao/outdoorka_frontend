"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Grid, Button, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TitleSection from "@/components/layout/home/TitleSection";
import CardActivity from "@/components/ui/card/CardActivity";
import axios from "@/plugins/api/axios";
import { HomeActivityState } from "@/types/ActivitiesType";

function HotActivitiesLoading() {
	return (
		<Grid container spacing={2}>
			{[1, 2, 3, 4].map((value:number) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={value}>
					<Skeleton variant="rounded" width={364} height={244} />
					<Box sx={{p: 1}}>
						<Skeleton width="40%" variant="text" sx={{ fontSize: "1.75rem" }} />
						<Skeleton width="60%" variant="text" sx={{ fontSize: "1.75rem" }} />
						<Skeleton width="90%" height="2rem" />
					</Box>
				</Grid>
			))}
		</Grid>
	);
}

function HotActivities(props: {count:number}) {
	const { count } = props;

	const { activity } = axios;
	const theme = useTheme();
	const [activityList, setActivityList] = useState<HomeActivityState[]>([]);
	const [error, setError] = useState("");
	async function loadData() {
		try {
			const responseBody = await activity.getHotActivityList();
			if (responseBody && responseBody.data) {
				const resArray = responseBody.data.slice(0, count? count: 8);
				setActivityList(resArray);
			}
		} catch (error) {
			setError("Failed to fetch data: " + String(error));
		}
	}
	useEffect(() => {
		loadData();
	}, []);

	return (
		<Box sx={{position: "relative",mb: 25,px: 2}}>
			<TitleSection title="熱門活動" />
			{ error || activityList.length === 0
				? <HotActivitiesLoading/>
				: <>
					<Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 2}}>
						{activityList &&
							activityList.map((value: HomeActivityState) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
									<CardActivity 
										home={true} 
										activity={value} 
										onLoad={()=>loadData()}
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
				</>
			}
		</Box>
	);
}

export default HotActivities;
