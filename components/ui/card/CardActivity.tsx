"use client";

import { useRouter } from "next/navigation";
import { ActivityState } from "@/types/ActivitiesType";
import {
	Box,
	Typography,
	Avatar,
	Grid,
	Paper,
	CardMedia,
	Chip
} from "@mui/material";
import PeopleIcon from "@/components/icon/peopleIcon";
import RatingStar from "@/components/ui/shared/RatingStar";
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import FavoriteAction from "@/components/ui/button/FavoriteAction";
import useCardTheme from "@/components/ui/card/useCardTheme";

/**
 * 活動卡片
 * @param home     呈現於首頁
 * @param activity 單一活動資料
 */
function CardActivity(props: {
	home: boolean,
	activity: ActivityState,
	onLoad: (res:boolean) => void;
}){
	const cardStyle = useCardTheme();
	const router = useRouter();

	const { home, activity, onLoad } = props;
	const activityImageUrl = activity.activityImageUrls? activity.activityImageUrls[0]: ""	

	const linkToInfo = (
		e: { preventDefault: () => void }
	) => {
		e.preventDefault();
		router.push(`/activity/${activity._id}`);
	}
	const reload = (res:boolean) => {
		onLoad(res)
	}

	return (
		<Paper
			sx={{
				...cardStyle.container,
				maxWidth: home ? 380 : 464,
				cursor: "pointer"
			}}
			onClick={linkToInfo}
		>
			{/* 上方 區塊 */}
			<Box sx={{
				position: "relative",
				height: home ? 244 : 310,
			}}>
				{/* 底圖 */}
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						alt={activity.subtitle}
						sx={{
							height: home ? 244 : 310,
						}}
						image={activityImageUrl}
					/>
				</Box>

				<Grid
					container
					sx={{
						...cardStyle.topInfoTopRow,
						...cardStyle.topInfoTopMainRow,
						justifyContent: home ? "flex-start" : "space-between",
					}}
				>
					{/* 主揪資訊 */}
					<Grid item
						sx={{
							flex: home? {}:{ xs: "0 1 calc(100% - 11rem)", sm: "0 1 calc(100% - 12rem)" }
						}}
					>
						<Box
							display="inline-flex"
							alignItems="center"
							sx={{
								...cardStyle.chip,
								width: home ? { xs: 158, sm: 144, xl: 140} : "100%",
								height: 40,
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
							<Box>
								{/* 星星評分 */}
								<RatingStar rating={activity.organizer?.rating || 0} />

								{/* 主揪名稱 */}
								<Typography sx={{
									...cardStyle.chipOrganizerName,
									maxWidth: home? "6rem":{ sm: "10rem" }
								}}>
									{activity.organizer?.name}
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
									<Typography
										sx={{
											...cardStyle.chipText,
											minWidth: home
												? "2rem"
												: { xs: "1rem", sm: "0.75rem", md: "1.5rem" },
										}}
									>
										{activity.bookedCapacity || 0}
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
								<FavoriteAction 
									home={home} 
									activity={activity}
									onLoad={reload}
								/>
							}
						/>
					</Grid>
				</Grid>
			</Box>

			<CardBottomInfo row={2} info={activity} />
		</Paper>
	);
}

export default CardActivity;
