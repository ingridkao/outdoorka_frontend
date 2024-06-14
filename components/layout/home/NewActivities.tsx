"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import TitleSection from "@/components/layout/home/TitleSection";
import CardActivity from "@/components/ui/shared/card-activity";
import Loading from "@/components/ui/loading/loading";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "@/plugins/api/axios";
import { ActivityState } from "@/types/ActivitiesType";

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

	const SliderSettings = {
		centerMode: true,
		infinite: true,
		variableWidth: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					dots: true,
				},
			},
		],
	};

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
					left: { xs: "5%", lg: "calc(50vw - 768px)" },
					width: { xs: "90%", lg: "1536px" },
					maxWidth: "1536px",
					background:
						"linear-gradient(180deg, rgba(196, 221, 255, 0.18) 0%, #C4DDFF 100%)",
					borderRadius: "48px",
					px: 0,
					py: 43,
					pointerEvents: "none",
				},
			}}
		>
			<TitleSection title="最新活動" />

			<Slider {...SliderSettings}>
				{activityList.map((value) => (
					<Box
						key={value._id}
						sx={{
							px: 1.5,
							py: 0.5
						}}
					>
						<CardActivity
							type="sm"
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
					</Box>
				))}
			</Slider>
		</Box>
	);
}

export default NewActivities;
