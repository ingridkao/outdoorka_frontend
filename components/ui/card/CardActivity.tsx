"use client";

import { SyntheticEvent } from "react";
import { ActivityProp } from "@/types/ActivitiesType";

import { Box, Typography, Avatar, Grid, Paper, CardMedia, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@/components/icon/peopleIcon";
import RatingStar from "@/components/ui/shared/RatingStar"
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import useCardTheme from "@/components/ui/card/useCardTheme";

/**
 * 活動卡片
 * @param activity 單一活動資料
 */
function CardActivity({ 
	home = false,
	activity
}: {
	home: boolean,
	activity: ActivityProp;
}) {
	const cardStyle = useCardTheme();

	// 加入收藏
	const likeAction = (event: SyntheticEvent) => {
		event.preventDefault();
	};

	return (
		<Paper sx={{
			...cardStyle.container,
			maxWidth: (home? 380: 464),
		}}>
			{/* 上方 區塊 */}
			<Box sx={cardStyle.topInfoWrapper }>
				{/* 底圖 */}
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						alt={activity.title}
						sx={{
							height:(home? 244: 310)
						}}
						image={activity.photo}
					/>
				</Box>

				<Grid container sx={{
					...cardStyle.topInfoTopRow,
					...cardStyle.topInfoTopMainRow,
					justifyContent:(home? "flex-start": "space-between")
				}}>
					{/* 主揪資訊 */}
					<Grid item>
						<Box
							display="inline-flex"
							alignItems="center"
							sx={{
								...cardStyle.chip,
								width: home? 150: {xs: 230, sm:140,md:180,xl:230},
								height: 40,
								py: 0.5,
							}}
						>
							<Avatar
								alt={activity.name || ''}
								src={activity.avatar || ''}
								sx={{
									width: 32,
									height: 32,
									mr: 1,
								}}
							/>
							<Box>
								{/* 星星評分 */}
								<RatingStar rating={activity.rating || 0} />

								{/* 主揪名稱 */}
								<Typography sx={cardStyle.chipOrganizerName}>
									{activity.name}
								</Typography>
							</Box>
						</Box>
					</Grid>

					{/* 參加人數 */}
					<Grid item>
						<Chip
							sx={cardStyle.chip}
							label={
								<Box display="inline-flex" alignItems="center">
									<PeopleIcon sx={cardStyle.chipIcon} />
									<Typography sx={{
										...cardStyle.chipText,
										minWidth: home? "1.25rem": {xs:"1rem", sm:"0.75rem",md:"1.5rem"}
									}}>
										{activity.capacity || 0}
									</Typography>
								</Box>
							}
						/>
					</Grid>

					{/* 愛心數 */}
					<Grid item>
						<Chip
							sx={cardStyle.chip}
							label={
								<Box display="inline-flex" alignItems="center">
									<IconButton aria-label="排序" onClick={likeAction}>
										<FavoriteIcon sx={cardStyle.chipIcon} />
									</IconButton>
									<Typography sx={{
										...cardStyle.chipText,
										minWidth: home? "1.25rem": {xs:"1rem", sm:"0.75rem",md:"1.5rem"}
									}}>
										{activity.likers || 0}
									</Typography>
								</Box>
							}
						/>
					</Grid>
				</Grid>
			</Box>

			<CardBottomInfo info={activity} />
		</Paper>
	);
}

export default CardActivity;
