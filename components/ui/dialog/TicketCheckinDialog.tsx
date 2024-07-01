"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckinTicketInfoProp } from "@/types/TicketType";
import axios from "@/plugins/api/axios";
import { parseDetailDate } from "@/utils/dateHandler";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";

import {
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Alert,
} from "@mui/material";

function TicketCheckinDialog(props: {
	info: CheckinTicketInfoProp | null;
	open: boolean;
	onClose: () => void;
}) {
	const customStyle = useCustomTheme();
	const router = useRouter();

	const { onClose, open, info } = props;
	const { organizerTicket } = axios;
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const checkinCommit = async () => {
		if (!(info && info._id)) return;

		try {
			const responseBody = await organizerTicket.patchTicketInfo(info._id);
			if (
				responseBody.data &&
				responseBody.data &&
				responseBody.data.ticketStatus == 1
			) {
				setErrorMsg("");
				setSuccessMsg("驗票成功");
				setTimeout(() => {
					router.push("/organizer/activity");
				}, 1000); // 1秒後跳轉
			}
		} catch (error: any) {
			setErrorMsg(String(error?.message));
			setSuccessMsg("");
		}
	};

	return (
		<Dialog onClose={() => onClose()} open={open} fullWidth maxWidth="sm">
			<DialogTitle>活動驗票</DialogTitle>
			{info?.activity && (
				<DialogContent>
					<Box sx={{ px: 5, py: 3 }}>
						<Typography variant="h3" sx={customStyle.h3TitleStyle}>
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
						<Box
							sx={{
								...customStyle.paperStyle,
								py: 2,
								mt: 2,
							}}
						>
							<Typography sx={customStyle.descStyle}>
								票券內容：{info.activity.subtitle || ""}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								票卷編號：{info._id}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								訂單編號：{info.payment}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								已付：NT$ {info.activity.price || 0}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								狀態：{info.ticketStatus ? "已使用" : "已報名"}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								備註：{info.ticketNote || "無"}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ px: 5, mb: 0.5 }}>
						{errorMsg !== "" && <Alert severity="warning">{errorMsg}</Alert>}
						{successMsg !== "" && (
							<Alert severity="success">{successMsg}</Alert>
						)}
					</Box>
				</DialogContent>
			)}
			<DialogActions
				sx={{
					justifyContent: "center",
					gap: 2,
				}}
			>
				<Button variant="contained" color="tertiary" onClick={onClose}>
					返回
				</Button>
				<Button variant="contained" color="secondary" onClick={checkinCommit}>
					確認報到
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default TicketCheckinDialog;
