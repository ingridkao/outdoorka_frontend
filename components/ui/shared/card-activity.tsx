"use client";

import React from "react";
import dayjs from "dayjs";
import { Box, Typography, Avatar, Grid, Paper, CardMedia } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationIcon from "@/components/icon/locationIcon";
import StarFullIcon from "@/components/icon/starFullIcon";
import StarEmptyIcon from "@/components/icon/starEmptyIcon";
import PeopleIcon from "@/components/icon/peopleIcon";

type Activity = {
	title: string;
	location: string;
	date: string;
	photo: string;
	avatar: string;
	name: string;
	capacity?: number;
	likers: number;
	rating: number;
};

interface CardActivityProps {
	type?: "sm" | "lg";
	activity: Activity;
}

const RatingStars = ({ rating = 0 }: { rating: number }) => (
	<Box sx={{ height: "16px" }}>
		{Array.from({ length: rating }, (_, i) => (
			<StarFullIcon
				key={`start-full-${i}`}
				sx={{
					marginRight: "3px",
					width: "12px",
					height: "12px",
				}}
				color="action"
			/>
		))}
		{Array.from({ length: 5 - rating }, (_, i) => (
			<StarEmptyIcon
				key={`start-${i}`}
				sx={{
					marginRight: "1px",
					width: "12px",
					height: "12px",
				}}
				color="action"
			/>
		))}
	</Box>
);

function CardActivity({ activity, type = "sm" }: CardActivityProps) {
	const parseDate = () => {
		return dayjs(activity.date).format("YYYY/MM/DD");
	};
	const roundInfoBoxStyle = {
		padding: "5px 12px",
		border: "1px solid #FFFFFFCC",
		borderRadius: "36px",
		backdropFilter: "invert(25%)",
		backgroundColor: "rgba(255, 255, 255, .15)",
	};
	const infoIconStyle = {
		mr: 1,
		width: "24px",
		height: "24px",
		color: "#F8F9FF",
	};
	const infoIconTextStyle = {
		display: "inline-block",
		fontSize: "16px",
		fontWeight: "500",
		lineHeight: "26px",
		color: "#F8F9FF",
	};
	return (
		<Paper
			sx={{
				width: type === "lg" ? 366 : 272,
				height: type === "lg" ? 436 : 392,
				backgroundColor: "#fff",
				borderRadius: "24px",
				m: "auto",
			}}
		>
			{/* 上方 區塊 */}
			<Box sx={{ position: "relative" }}>
				{/* 底圖 */}
				<Box
					sx={{
						position: "relative",
						width: "100%",
						objectFit: "cover",
						borderTopLeftRadius: "24px",
						borderTopRightRadius: "24px",
						overflow: "hidden",
						"&::before": {
							content: "''",
							position: "absolute",
							width: "100%",
							height: "100%",
							background:
								"linear-gradient(180deg, transparent 50%, rgb(0,0,0,0.8) 100%)",
							pointerEvents: "none",
						},
					}}
				>
					<CardMedia
						component="img"
						alt={activity.title}
						height={type === "lg" ? "244px" : "181px"}
						image={activity.photo}
					/>
				</Box>
				{/* 主揪資訊 */}
				<Grid
					sx={{
						position: "absolute",
						bottom: "8px",
						width: "100%",
						padding: "0 4px",
					}}
					container
					wrap="nowrap"
					justifyContent="space-around"
					alignItems="flex-end"
				>
					{/* 主揪 */}
					<Grid item>
						<Box
							display="inline-flex"
							alignItems="center"
							sx={{
								...roundInfoBoxStyle,
								width: `${type === "lg" ? "159px" : "155px"}`,
								padding: "3px",
							}}
						>
							<Avatar
								alt={activity.name}
								src={activity.avatar}
								sx={{
									width: 32,
									height: 32,
									mr: 1,
								}}
							/>
							<Box
								sx={{
									width: type === "lg" ? "106px" : "103px",
								}}
							>
								{/* 星星評分 */}
								<RatingStars rating={activity.rating} />

								{/* 主揪名稱 */}
								<Typography
									sx={{
										...infoIconTextStyle,
										overflow: "hidden",
										maxWidth: "7.5em",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										fontSize: "14px",
										fontWeight: "400",
										lineHeight: 1,
									}}
								>
									{activity.name}
								</Typography>
							</Box>
						</Box>
					</Grid>

					{/* 參加人數 */}
					{type === "lg" && (
						<Grid item>
							<Box
								display="inline-flex"
								alignItems="center"
								sx={roundInfoBoxStyle}
							>
								<PeopleIcon sx={infoIconStyle} />
								<Typography sx={infoIconTextStyle}>
									{activity.capacity || 0}
								</Typography>
							</Box>
						</Grid>
					)}

					{/* 愛心數 */}
					<Grid item>
						<Box
							display="inline-flex"
							alignItems="center"
							sx={roundInfoBoxStyle}
						>
							<FavoriteIcon sx={infoIconStyle} />
							<Typography sx={infoIconTextStyle}>{activity.likers}</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>

			{/* Info 區塊 */}
			<Box sx={{ padding: type === "lg" ? "20px 32px 20px 32px" : "28px" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "end",
						lineHeight: "24px",
						letterSpacing: "0.25px",
						color: "#B1AAA5",
					}}
				>
					<LocationIcon sx={{ marginRight: "12px" }} color="action" />
					<span>{activity.location}</span>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "end",
						lineHeight: "24px",
						letterSpacing: "0.25px",
						color: "#B1AAA5",
					}}
				>
					<CalendarTodayIcon
						sx={{
							marginRight: "12px",
							marginTop: "8px",
						}}
						color="action"
					/>
					<span>{parseDate()}</span>
				</Box>
				<Typography
					variant="h6"
					sx={{
						marginTop: "16px",
						fontWeight: "700",
						lineHeight: "30px",
					}}
				>
					{activity.title}
				</Typography>
			</Box>
		</Paper>
	);
}

export default CardActivity;
