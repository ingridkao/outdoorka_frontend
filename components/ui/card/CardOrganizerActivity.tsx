"use client";

import { useState } from "react";
import NextLink from "next/link";

import {
	Button,
	Fab,
	Chip,
	Box,
	Typography,
	Grid,
	Paper,
	CardMedia,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleIcon from "@/components/icon/peopleIcon";
import ParticipantDialog from "@/components/ui/dialog/ParticipantDialog";
import { OrganizerActivityState } from "@/types/ActivitiesType";
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import useCardTheme from "@/components/ui/card/useCardTheme";

/**
 * 主揪活動卡片
 * @param isFinish  是否為過往活動
 * @param isPublish 活動發布：0草稿1已發佈
 * @param activity  單一活動資料
 */
function CardOrganizerActivity({
	isFinish,
	isPublish,
	activity,
}: {
	isFinish: boolean;
	isPublish: number;
	activity: OrganizerActivityState;
}) {
	const cardStyle = useCardTheme();
	const [dialogOpen, setDialogOpen] = useState(false);
	const canceActivity = () => {}

	return (
		<Paper sx={cardStyle.container}>
			{/* 上方 區塊 */}
			<Box sx={{ position: "relative" }}>
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						height={244}
						alt={activity.title}
						image={activity.activityImageUrls[0]}
					/>
				</Box>

				{!isFinish && (
					<Grid container sx={{
						...cardStyle.topInfoTopRow,
						...cardStyle.topInfoTopRightBtn
					}}>
						<Grid item>
							<Fab
								size="small"
								color="primary"
								aria-label={isPublish === 0 ? "刪除活動" : "取消活動"}
								onClick={canceActivity}
							>
								<ClearIcon />
							</Fab>
						</Grid>
					</Grid>
				)}

				<Grid container sx={{
					...cardStyle.topInfoTopRow,
					...cardStyle.topInfoTopMainRow
				}}>
					{/* 參加人數_活動上限人數 */}
					<Grid item>
						<Chip
							sx={cardStyle.chip}
							label={
								<Box display="inline-flex" alignItems="center">
									<PeopleIcon sx={cardStyle.chipIcon} />
									<Typography sx={cardStyle.chipText}>
										{activity.bookedCapacity || 0} / {activity.totalCapacity || 0}
									</Typography>
								</Box>
							}
						/>
					</Grid>

					{/* 分票狀態 */}
					{!isFinish && isPublish === 1 && (
						<Grid item>
							<Button
								sx={{...cardStyle.chip, px:2}}
								onClick={() => setDialogOpen(true)}
							>
								<Typography sx={cardStyle.chipText}>
									報名清單
								</Typography>
							</Button>
							<ParticipantDialog
								open={dialogOpen}
								onClose={() => setDialogOpen(false)}
							/>
						</Grid>
					)}
				</Grid>
			</Box>

			<CardBottomInfo info={{
				location: `${activity?.region} ${activity?.city} ${activity?.address}`,
				title: activity.title,
				startTime:activity.activityStartTime,
				endTime:activity.activityEndTime,
			}} />

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
							component={NextLink}
							href="/organizer/scan"
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
