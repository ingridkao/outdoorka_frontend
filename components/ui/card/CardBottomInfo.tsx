"use client";

import { parseStartTime, parseDate } from "@/utils/dateHandler";
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@/components/icon/locationIcon";
import useCardTheme from "./useCardTheme";
import { ActivityState } from "@/types/ActivitiesType";

/**
 * 卡片:標題地點時間資訊
 * @param info 資料
 */
function CardBottomInfo({
	row,
	info,
}: {
	row: number;
	info: ActivityState;
}) {
	const cardStyle = useCardTheme();
	return (
		<Box sx={{ py: 3, px: 4 }}>
			<Box sx={cardStyle.infoRow}>
				<LocationIcon sx={{ mr: 1.5 }} />
				<span className="singleline-ellipsis">{info.region} {info.city}</span>
			</Box>
			<Box sx={cardStyle.infoRow}>
				<CalendarTodayIcon sx={{ mr: 1.5 }} />
				<span className="singleline-ellipsis">
					{row === 3
						? parseStartTime(info.activityStartTime)
						: parseDate(info.activityStartTime, info.activityEndTime)}
				</span>
			</Box>
			<Typography
				variant="h6"
				sx={cardStyle.infoTitle}
				className={row === 3 ? "triplex-ellipsis" : "multiline-ellipsis"}
			>
				{info.subtitle}
			</Typography>
		</Box>
	);
}

export default CardBottomInfo;
