"use client";

import { Box, Typography, Grid, Paper, CardMedia, Chip } from "@mui/material";

import PeopleIcon from "@/components/icon/peopleIcon";
import { PaymentState } from "@/types/TicketType";
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import useCardTheme from "@/components/ui/card/useCardTheme";

/**
 * 票卷卡片
 * @param ticketItem 單一票卷資料
 */
function CardTicket({ ticketItem }: { ticketItem: PaymentState }) {
	const cardStyle = useCardTheme();

	const ticketCountInfo = () => {
		if (ticketItem.ticketAssign === ticketItem.ticketTotal) {
			return "分票完畢";
		} else {
			return `待分票 ${ticketItem.ticketAssign}/${ticketItem.ticketTotal}`;
		}
	};

	const ticketStatus = () => {
		if (ticketItem.activityExpired) return "已逾期";
		return ticketItem.status ? "已使用" : "已報名";
	};

	return (
		<Paper sx={cardStyle.container}>
			{/* 上方 區塊 */}
			<Box sx={{ position: "relative" }}>
				<Box sx={cardStyle.topBg}>
					<CardMedia
						component="img"
						height="244"
						alt={ticketItem.title}
						image={ticketItem.activityImageUrl}
					/>
				</Box>

				<Grid
					container
					sx={{
						...cardStyle.topInfoTopRow,
						...cardStyle.topInfoTopMainRow,
					}}
				>
					{/* 分票狀態 */}
					<Grid item>
						<Chip sx={cardStyle.chip} label={ticketCountInfo()} />
					</Grid>

					{/* 參加人數 */}
					<Grid item>
						<Chip
							sx={cardStyle.chip}
							label={
								<Box display="inline-flex" alignItems="center">
									<PeopleIcon sx={cardStyle.chipIcon} />
									<Typography sx={cardStyle.chipText}>
										{ticketItem.bookedCapacity || 0}
									</Typography>
								</Box>
							}
						/>
					</Grid>

					{/* 狀態 */}
					<Grid item>
						<Chip sx={cardStyle.chip} label={ticketStatus()} />
					</Grid>
				</Grid>
			</Box>

			{/* 下方 區塊 */}
			<CardBottomInfo row={2} info={ticketItem} />
		</Paper>
	);
}

export default CardTicket;
