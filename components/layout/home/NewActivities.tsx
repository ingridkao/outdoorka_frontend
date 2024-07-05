"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";
import TitleSection from "@/components/layout/home/TitleSection";
import CardActivitySlick from "@/components/ui/card/CardActivitySlick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "@/plugins/api/axios";
import { HomeActivityState } from "@/types/ActivitiesType";

const SliderSettings = {
	infinite: true,
	variableWidth: true,
	adaptiveHeight: true,
	slidesToShow: 6,
	slidesToScroll: 6,
	responsive: [
		{
			breakpoint: 1278,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
			},
		},
		{
			breakpoint: 800,
			settings: {
				dots: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
			},
		},
	],
};

const bgStyle = {
	position: "relative",
	overflow: "hidden",
	pb: { xs: 25, xl: 25 },
	mb: { xs: 5, xl: 20 },
	"&::before": {
		content: "''",
		position: "absolute",
		zIndex: 0,
		left: { xs: "5%", lg: "calc(50vw - 768px)", xl: 192 },
		width: { xs: "90%", lg: "1536px" },
		maxWidth: "1536px",
		background:
			"linear-gradient(180deg, rgba(196, 221, 255, 0.18) 0%, #C4DDFF 100%)",
		borderRadius: "48px",
		px: 0,
		py: 44,
		pointerEvents: "none",
	},
}
function NewActivitiesLoading() {
	return (<>
		{[1, 2, 3, 4, 5, 6, 7].map((value:number) => (
			<Box key={value} sx={{ px: 1.5, py: 0.5}}>
				<Skeleton variant="rounded" width={272} height={181} sx={{ bgcolor: "grey.50" }}/>
				<Box sx={{p: 1}}>
					<Skeleton width="40%" variant="text" sx={{ fontSize: "1.75rem", bgcolor: "grey.50" }} />
					<Skeleton width="60%" variant="text" sx={{ fontSize: "1.75rem", bgcolor: "grey.50" }} />
					<Skeleton width="90%" height="2rem" sx={{ bgcolor: "grey.50" }} />
				</Box>
			</Box>
		))}
	</>);
}

function NewActivities() {
	const { activity } = axios;
	const [activityList, setActivityList] = useState<HomeActivityState[]>([]);
	const [error, setError] = useState("");
	async function loadData() {
		try {
			const responseBody = await activity.getNewActivityList();
			if (responseBody && responseBody.data){
				setActivityList(responseBody.data);
			}
		} catch (error) {
			setError("Failed to fetch data: " + String(error));
		}
	}
	useEffect(() => {
		loadData();
	}, []);

	return (
		<Box sx={bgStyle}>
			<TitleSection title="最新活動" />

			{ error || activityList.length === 0
				? <Box display="inline-flex">
					<NewActivitiesLoading />
				</Box>
				: <Slider {...SliderSettings}>
					{activityList.map((value: HomeActivityState) => (
						<Box key={value._id} sx={{ px: 1.5, py: 0.5}}>
							<CardActivitySlick 
								activity={value}
								onLoad={loadData}
							/>
						</Box>
					))}
				</Slider>
			}
		</Box>
	);
}

export default NewActivities;
