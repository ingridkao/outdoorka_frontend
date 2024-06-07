"use client";

import React from "react";
import {
	Box,
	Typography,
	Avatar,
	Grid,
	Paper,
	CardMedia,
	Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@/components/icon/locationIcon";
import PeopleIcon from "@/components/icon/peopleIcon";
import RatingStars from "./RatingStar";
import { CardTicketProps } from "@/types/TicketType";
import { parseDate } from "@/utils/dateHandler";

function CardTicket({ tickets, type = "sm" }: CardTicketProps) {
	const ChipStyle = {
		px:0,
		py:2,
		borderRadius: "36px",
		border: "1px solid #FFFFFFCC",
		backdropFilter: "invert(25%)",
		backgroundColor: "rgba(255, 255, 255, .15)",
		color: "#F8F9FF",
		fontSize: "16px",
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
				width: "100%",
				maxWidth: "464px",
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
						alt={tickets.title}
						height="310px"
						image={tickets.photo}
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
						<Chip
							sx={ChipStyle}
							className="chipAvatarSmall"
							avatar={<Avatar alt={tickets.name} src={tickets.avatar} />}
							label={
								<Box
									sx={{
										width: type === "lg" ? "75px" : "103px",
									}}
								>
									{/* 星星評分 */}
									<RatingStars rating={tickets.rating} />
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
										{tickets.name}
									</Typography>
								</Box>
							}
						/>
					</Grid>

					{/* 參加人數 */}
					{type === "lg" && (
						<Grid item>
							<Chip
								label={
									<Box display="inline-flex" alignItems="center">
										<PeopleIcon sx={infoIconStyle} />
										<Typography sx={infoIconTextStyle}>
											{tickets.capacity || 0}
										</Typography>
									</Box>
								}
								sx={ChipStyle}
							/>
						</Grid>
					)}

					{/* 狀態 */}
					<Grid item>
						<Chip label={tickets.status ? "已使用" : "已報名"} sx={ChipStyle} />
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
					<span>{tickets.location}</span>
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
					<span>{parseDate(tickets.startTime, tickets.endTime)}</span>
				</Box>
				<Typography
					variant="h6"
					sx={{
						marginTop: "16px",
						fontWeight: "700",
						lineHeight: "30px",
					}}
				>
					{tickets.title}
				</Typography>
			</Box>
		</Paper>
	);
}

export default CardTicket;
