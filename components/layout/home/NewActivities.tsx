"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import Slider from "react-slick";
import { Box } from "@mui/material";
import TitleSection from "@/components/layout/home/TitleSection";
import CardActivitySlick from "@/components/ui/card/CardActivitySlick";
import Loading from "@/components/ui/loading/loading";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "@/plugins/api/axios";
import { ActivityState } from "@/types/ActivitiesType";

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

function NewActivities() {
	const { activity } = axios;

	const [activityList, setActivityList] = useState<ActivityState[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadData() {
			try {
				const responseBody = await activity.getNewActivityList();
				if (!responseBody || !responseBody.data) return;
				setActivityList(responseBody.data);
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
				overflow: "hidden",
				pb: 10,
				mb: 25,
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
			}}
		>
			<TitleSection title="最新活動" />

			<Slider {...SliderSettings}>
				{activityList.map((value:ActivityState) => (
					<Box
						key={value._id}
						component={NextLink}
						href={`/activity/${value._id}`}
						sx={{
							px: 1.5,
							py: 0.5,
						}}
					>
						<CardActivitySlick activity={value} />
					</Box>
				))}
			</Slider>
		</Box>
	);
}

export default NewActivities;
