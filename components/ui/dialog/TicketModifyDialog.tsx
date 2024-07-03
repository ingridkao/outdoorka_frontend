"use client";

import { useState, useEffect } from "react";
import { TicketsState, TicketInfoState } from "@/types/TicketType";
import axios from "@/plugins/api/axios";
import { parseDetailDate } from "@/utils/dateHandler";
import {
	Box,
	Alert,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	TextField,
	Rating
} from "@mui/material";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";

function TicketModifyDialog(props: {
	payment: TicketInfoState | null;
	type: string;
	target: TicketsState | null;
	open: boolean;
	onClose: (res: boolean) => void;
}) {
	const { ticket } = axios;
	const { onClose, open, type, target, payment } = props;
	const displayTitle: any = {
		note: "編輯備註",
		evaluate: "活動評價",
		email: "分票",
	};
	const displayBtn: any = {
		note: "送出",
		evaluate: "送出評價",
		email: "確定分票",
	};
	const displaySuccessMsg: any = {
		note: "編輯備註成功",
		evaluate: "評價成功",
		email: "分票成功！",
	};
	const displayErrorMsg: any = {
		note: "編輯備註失敗!",
		evaluate: "評價失敗!",
		email: "分票失敗！",
	};

	const customStyle = useCustomTheme();
	const [ticketEmail, setTicketEmail] = useState("");
	const [ticketNote, setTicketNote] = useState("");
	const [ratingValue, setRatingValue] = useState(5);
	const [eventEvaluate, setEventEvaluate] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (type === "note") {
			setTicketNote(target?.ticketNote || "");
		}
	}, [target]);

	const checkinCommit = async () => {
		if (!target) return;
		try {
			setLoad(true);
			let responseBody = null
			if (type === "evaluate") {
				responseBody = await ticket.userReview(
					target.ticketId,
					ratingValue,
					eventEvaluate
				);
			}else{
				responseBody = await ticket.updateTicketInfo(
					target.ticketId,
					ticketEmail,
					ticketNote,
				);
			}
			if (responseBody && responseBody.data) {
				setErrorMsg("");
				setSuccessMsg(displaySuccessMsg[type]);
				setTimeout(() => {
					onClose(true);
				}, 2000);
			}
		} catch (error: any) {
			setErrorMsg(String(error?.message));
			resetForm();
		}
	};

	const resetForm = () => {
		setLoad(false);
		setTicketEmail("");
		setTicketNote("");
		setSuccessMsg("");
	};

	return (
		<Dialog 
			onClose={() => onClose(false)} 
			open={open} 
			fullWidth={type !== "email"} 
			maxWidth="sm"
		>
			<DialogTitle>{displayTitle[type] || ""}</DialogTitle>
			<DialogContent>
				<Box sx={{ 
					px: 5, 
					py: 3, 
					textAlign: type === "evaluate"?"left":"center"
				}}>
					{type === "note" && 
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField
								required
								label="備註"
								variant="outlined"
								margin="dense"
								inputProps={{ maxLength: 50 }}
								value={ticketNote}
								onChange={(e) => setTicketNote(e.target.value)}
							/>
						</FormControl>
					}

					{type === "email" && <>
						<Typography sx={customStyle.descStyle}>
							票卷編號：{payment?._id}
						</Typography>
						<Typography sx={customStyle.descStyle}>
							訂單編號：{target?.ticketId}
						</Typography>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField
								required
								type="email"
								value={ticketEmail}
								label="Email"
								margin="normal"
								InputLabelProps={{ shrink: true }}
								onChange={(e) => setTicketEmail(e.target.value)}
							/>
						</FormControl>
						<Typography sx={customStyle.descStyle}>
							此步驟無法還原!請確認取票人email是否正確，
							<br />
							一旦分票後，票券即消失於票券夾
						</Typography>
					</>}

					{type === "evaluate" && <>
						{ payment && <>
							<Typography variant="h3" sx={customStyle.h3TitleStyle}>
								{payment.title}
							</Typography>
							<Typography variant="h2" sx={customStyle.h2Style}>
								{payment.subtitle}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								{parseDetailDate(
									payment.activityStartTime,
									payment.activityEndTime,
								)}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								{payment.organizer?.name}
							</Typography>
						</>}
						<FormControl fullWidth sx={{ mx:1 }}>
							<Box sx={{ my: 3,textAlign: "center"}}>
								<Rating
									size="large"
									value={ratingValue}
									onChange={(event:any, newValue:number | null) => {
										setRatingValue(newValue? newValue: 5);
									}}
								/>
							</Box>
							<TextField
								required
								label="評論內容(限200字)"
								variant="outlined"
								margin="dense"
								multiline
								rows={4}
								inputProps={{ maxLength: 200 }}
								value={eventEvaluate}
								onChange={(e) => setEventEvaluate(e.target.value)}
							/>
						</FormControl>

					</>}
				</Box>

				<Box sx={{ px: 5, mb: 0.5 }}>
					{errorMsg !== "" && (
						<Alert severity="warning">
							{errorMsg}，{displayErrorMsg[type]} <br />
							請再次嘗試，若仍無法操作請聯繫平台管理員
						</Alert>
					)}
					{successMsg !== "" && <Alert severity="success">{successMsg}</Alert>}
				</Box>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: "center",
					gap: 2,
				}}
			>
				<Button
					variant="contained"
					size="large"
					disabled={load}
					onClick={checkinCommit}
				>
					{displayBtn[type]}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default TicketModifyDialog;
