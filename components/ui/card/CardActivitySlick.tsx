"use client";

import { useSelector } from "react-redux";
import { ActivityState } from "@/types/ActivitiesType";
import {
	Box,
	Typography,
	Avatar,
	Grid,
	Paper,
	CardMedia,
	Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RatingStar from "@/components/ui/shared/RatingStar";
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import useCardTheme from "@/components/ui/card/useCardTheme";

/**
 * 活動卡片for 首頁最新輪播活動
 * @param activity 單一活動資料
 */
function CardActivity({ activity }: { activity: ActivityState }) {
	const cardStyle = useCardTheme();
	const activityImageUrl = activity.activityImageUrls? activity.activityImageUrls[0]: ""	
	const { likesList } = useSelector((state:any) => state.likes);
	const isLike = likesList.some((likeId:string) => likeId == activity._id)

	return (
		<Paper
			sx={{
				...cardStyle.container,
				width: 272,
			}}
		>
			{/* 上方 區塊 */}
			<Box sx={cardStyle.topInfoWrapperSmall}>
				{/* 底圖 */}
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						alt={activity.subtitle}
						height={181}
						image={activityImageUrl}
					/>
				</Box>

				<Grid
					container
					sx={{
						...cardStyle.topInfoTopRow,
						...cardStyle.topInfoTopMainRow,
					}}
				>
					{/* 主揪資訊 */}
					<Grid item>
						<Box
							display="inline-flex"
							alignItems="center"
							sx={{
								...cardStyle.chip,
								height: "2.5rem",
								width: { xs: 155, xl: 150},
								py: 0.5,
							}}
						>
							<Avatar
								alt={activity.organizer?.name || ""}
								src={activity.organizer?.photo || ""}
								sx={{
									width: 32,
									height: 32,
									mr: 1,
								}}
							/>
							<Box
								sx={{
									width: 103,
								}}
							>
								{/* 星星評分 */}
								<RatingStar rating={activity.organizer?.rating || 0} />

								{/* 主揪名稱 */}
								<Typography sx={cardStyle.chipOrganizerName}>
								{activity.organizer?.name}
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
									{isLike
										?<FavoriteIcon sx={cardStyle.chipIcon} />
										:<FavoriteBorderIcon sx={cardStyle.chipIcon} />
									}
									<Typography
										sx={{
											...cardStyle.chipText,
											width: 30,
										}}
									>
										{activity.likeCount || activity.likers || 0}
									</Typography>
								</Box>
							}
						/>
					</Grid>
				</Grid>
			</Box>

			<CardBottomInfo row={3} info={activity} />
		</Paper>
	);
}

export default CardActivity;
