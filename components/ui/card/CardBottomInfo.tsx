"use client";

import { parseDate } from "@/utils/dateHandler";
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@/components/icon/locationIcon";
import useCardTheme from "./useCardTheme";

/**
 * 卡片:標題地點時間資訊
 * @param info 資料
 */
function CardBottomInfo({ 
	info
}: {
	info: {
		location: string,
		startTime: string,
		endTime: string,
		title: string,
	};
}) {
	const cardStyle = useCardTheme();
	return (
		<Box sx={{ py: 3, px:4}}>
			<Box sx={cardStyle.infoRow}>
				<LocationIcon sx={{ mr: 1.5 }}/>
				<span className="singleline-ellipsis">{info.location}</span>
			</Box>
			<Box sx={cardStyle.infoRow}>
				<CalendarTodayIcon sx={{ mr: 1.5 }}/>
				<span className="singleline-ellipsis">{parseDate(info.startTime, info.endTime)}</span>
			</Box>
			<Typography variant="h6" sx={cardStyle.infoTitle} className="multiline-ellipsis">
				{info.title}
			</Typography>
		</Box>
	);
}

export default CardBottomInfo;
