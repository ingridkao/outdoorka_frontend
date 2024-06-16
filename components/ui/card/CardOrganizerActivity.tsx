"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";

import {
	Button,
	Fab,
	Box,
	Typography,
	Grid,
	Paper,
	CardMedia,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClearIcon from "@mui/icons-material/Clear";
import LocationIcon from "@/components/icon/locationIcon";
import PeopleIcon from "@/components/icon/peopleIcon";
import ParticipantDialog from "@/components/ui/dialog/ParticipantDialog";

import { OrganizerActivityState } from "@/types/ActivitiesType";
import { parseDate } from "@/utils/dateHandler";

interface CardActivityProps {
	isFinish: boolean;
	isPublish: number;
	activity: OrganizerActivityState;
}

function CardOrganizerActivity({
	isFinish,
	isPublish,
	activity,
}: CardActivityProps) {
	const theme = useTheme();
	const [dialogOpen, setDialogOpen] = useState(false);

	const cardTopGridContainerStyle = {
		display: "inlineFlex",
		justifyContent: "flex-end",
		flexWrap: "wrap",
		alignItems: "center",
		position: "absolute",
		width: "100%",
		padding: "8px",
		gap: 1,
	};
	const cardMiddleContextStyle = {
		display: "flex",
		alignItems: "center",
		color: theme.palette.text.secondary,
		mb: 1,
	};
	const cardRoundInfoBoxStyle = {
		display: "inline-flex",
		alignItems: "center",
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
				backgroundColor: theme.palette.primary.light,
				borderRadius: "24px",
				m: "auto",
			}}
		>
			<Box sx={{ position: "relative" }}>
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
						height="244px"
						image={activity.activityImageUrls[0]}
					/>
				</Box>

				{!isFinish && (
					<Grid
						container
						sx={{
							...cardTopGridContainerStyle,
							top: 0,
						}}
					>
						<Grid item>
							<Fab
								size="small"
								color="primary"
								aria-label={isPublish === 0 ? "刪除活動" : "取消活動"}
							>
								<ClearIcon />
							</Fab>
						</Grid>
					</Grid>
				)}

				<Grid
					container
					sx={{
						...cardTopGridContainerStyle,
						bottom: 0,
					}}
				>
					<Grid item>
						<Box sx={cardRoundInfoBoxStyle}>
							<PeopleIcon sx={infoIconStyle} />
							<Typography sx={infoIconTextStyle}>
								{activity.bookedCapacity || 0} / {activity.totalCapacity || 0}
							</Typography>
						</Box>
					</Grid>
					{!isFinish && isPublish === 1 && (
						<Grid item>
							<Button
								sx={cardRoundInfoBoxStyle}
								onClick={() => setDialogOpen(true)}
							>
								<Typography sx={infoIconTextStyle}>報名清單</Typography>
							</Button>
							<ParticipantDialog
								open={dialogOpen}
								onClose={() => setDialogOpen(false)}
							/>
						</Grid>
					)}
				</Grid>
			</Box>
			<Box sx={{ px: 4, py: 3 }}>
				<Box sx={cardMiddleContextStyle}>
					<LocationIcon sx={{ mr: 1 }} color="action" />
					<span>
						{activity?.region} {activity?.city} {activity?.address}
					</span>
				</Box>
				<Box sx={cardMiddleContextStyle}>
					<CalendarTodayIcon sx={{ mr: 1 }} color="action" />
					<span>
						{parseDate(activity?.activityStartTime, activity?.activityEndTime)}
					</span>
				</Box>
				<Typography
					variant="h6"
					sx={{ mt: 2, fontWeight: "700" }}
					className="multiline-ellipsis"
				>
					{activity.title}
				</Typography>
			</Box>
			{!isFinish && (
				<Grid container spacing={1.5} sx={{ pl: 2, pr: 4, pb: 3 }}>
					<Grid item xs={6}>
						<Button
							variant="contained"
							size="small"
							sx={{ width: "100%" }}
							disabled={isPublish === 0}
							component={NextLink}
							href={`/activity/${activity._id}`}
							target="_black"
						>
							活動預覽
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							variant="contained"
							size="small"
							sx={{ width: "100%" }}
							disabled={isPublish === 1}
							component={NextLink}
							href={`/organizer/activity-edit/${activity._id}`}
						>
							編輯
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							size="small"
							sx={{ width: "100%" }}
							disabled={isPublish === 0}
						>
							驗票
						</Button>
					</Grid>
				</Grid>
			)}
		</Paper>
	);
}

export default CardOrganizerActivity;
