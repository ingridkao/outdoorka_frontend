"use client";

import { ActivityProp } from "@/types/ActivitiesType";

import { Box, Typography, Avatar, Grid, Paper, CardMedia, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RatingStar from "@/components/ui/shared/RatingStar"
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import useCardTheme from "@/components/ui/card/useCardTheme";

/**
 * 活動卡片for 首頁最新輪播活動
 * @param activity 單一活動資料
 */
function CardActivity({ 
	activity
}: {
	activity: ActivityProp;
}) {
	const cardStyle = useCardTheme();
	return (
		<Paper
			sx={{
				...cardStyle.container,
				width: 296,
			}}
		>
			{/* 上方 區塊 */}
			<Box sx={cardStyle.topInfoWrapper }>
				{/* 底圖 */}
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						alt={activity.title}
						height={197}
						image={activity.photo}
					/>
				</Box>

				<Grid container sx={{
					...cardStyle.topInfoTopRow,
					...cardStyle.topInfoTopMainRow
				}}>
					{/* 主揪資訊 */}
					<Grid item>
						<Box
							display="inline-flex"
							alignItems="center"
							sx={{
								...cardStyle.chip,
								width: 155,
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
							<Box
								sx={{
									width: 103
								}}
							>
								{/* 星星評分 */}
								<RatingStar rating={activity.rating || 0} />

								{/* 主揪名稱 */}
								<Typography sx={cardStyle.chipOrganizerName}>
									{activity.name}
								</Typography>
							</Box>
						</Box>
					</Grid>

					{/* 愛心數 */}
					<Grid item>
						<Chip
							sx={cardStyle.chip}
							label={
								<Box display="inline-flex" alignItems="center">
									<FavoriteIcon sx={cardStyle.chipIcon} />
									<Typography sx={cardStyle.chipText}>
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
