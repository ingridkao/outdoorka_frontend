"use client";

import { useRouter } from "next/navigation";
import { HomeActivityState } from "@/types/ActivitiesType";
import { Box, Typography, Avatar, Grid, Paper, CardMedia } from "@mui/material";
import RatingStar from "@/components/ui/shared/RatingStar";
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import FavoriteAction from "@/components/ui/button/FavoriteAction";
import useCardTheme from "@/components/ui/card/useCardTheme";
/**
 * 活動卡片for 首頁最新輪播活動
 * @param activity 單一活動資料
 */
function CardActivitySlick(props: {
	activity: HomeActivityState;
	onLoad: () => void;
}) {
	const cardStyle = useCardTheme();
	const router = useRouter();

	const { activity, onLoad } = props;
	const activityImageUrl = activity.activityImageUrls
		? activity.activityImageUrls[0]
		: "";
	const linkToInfo = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		router.push(`/activity/${activity._id}`);
	};
	const reload = () => {
		onLoad();
	};

	return (
		<Paper
			sx={{
				...cardStyle.container,
				width: 272,
			}}
			onClick={linkToInfo}
		>
			{/* 上方 區塊 */}
			<Box sx={cardStyle.topInfoWrapperSmall}>
				{/* 底圖 */}
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						alt={activity.title || activity.subtitle}
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
								width: { xs: 155, xl: 150 },
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
						<FavoriteAction home={false} activity={activity} onLoad={reload} />
					</Grid>
				</Grid>
			</Box>

			<CardBottomInfo row={1} info={activity} />
		</Paper>
	);
}

export default CardActivitySlick;
