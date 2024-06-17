"use client";

import { CheckinTicketInfoProp } from "@/types/TicketType";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";
import { parseDetailDate } from "@/utils/dateHandler";
import NextLink from "next/link";

import { useState, SyntheticEvent } from "react";

import {
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from "@mui/material";

function TicketCheckinDialog(props: {
  info: CheckinTicketInfoProp;
  open: boolean;
  onClose: () => void;
}) {
	const customStyle = useCustomTheme();
	const { onClose, open, info } = props;
	const checkinCommit = () => {
    // setOpen(true);
  };
	
	return (
		<Dialog 
			onClose={() => onClose()} 
			open={open}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>活動驗票</DialogTitle>
			{info?.activity && (
				<DialogContent>
					<Box sx={{
						p: 5,
					}}>
						<Typography variant="h3" sx={customStyle.h3Style}>
							{info.activity.subtitle}
						</Typography>
						<Typography variant="h2" sx={customStyle.h2Style}>
							{info.activity.title}
						</Typography>
						<Typography sx={customStyle.descStyle}>
							{parseDetailDate(
								info.activity.activityStartTime,
								info.activity.activityEndTime,
							)}
						</Typography>
						<Box sx={{
							...customStyle.paperStyle,
							py:2,
							mt:2
						}}>
							<Typography sx={customStyle.descStyle}>票券內容：{info.activity.subtitle || ""}</Typography>
							<Typography sx={customStyle.descStyle}>票卷編號：{info._id}</Typography>
							<Typography sx={customStyle.descStyle}>訂單編號：{info.payment}</Typography>
							<Typography sx={customStyle.descStyle}>已付：NT$ {info.activity.price || 0}</Typography>
							<Typography sx={customStyle.descStyle}>狀態：{info.ticketStatus ? "已使用" : "已報名"}</Typography>
							<Typography sx={customStyle.descStyle}>備註：{info.ticketNote || "無"}</Typography>
						</Box>
					</Box>
				</DialogContent>
			)}
			<DialogActions sx={{
				justifyContent: "center",
				gap:2
			}}>
				<Button
					component={NextLink}
					href="/organizer/activity"
					variant="contained"
					color="primary"
				>
					返回活動管理
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={checkinCommit}
				>
					確認報到
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default TicketCheckinDialog;
