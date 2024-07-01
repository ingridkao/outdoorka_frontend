"use client";

import { useState, useEffect } from "react";
import { TicketsState } from "@/types/TicketType";
import axios from "@/plugins/api/axios";

import {
	Box,
	Alert,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from "@mui/material";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";

function TicketModifyDialog(props: {
	payment: string;
	type: string;
	target: TicketsState | null;
	open: boolean;
	onClose: (res: boolean) => void;
}) {
	const { ticket } = axios;
	const { onClose, open, type, target, payment } = props;
	const displayTitle: any = {
		note: "編輯備註",
		email: "分票",
		evaluate: "撰寫評價",
	};
	const displaySuccessMsg: any = {
		note: "編輯備註成功",
		email: "分票成功！",
		evaluate: "評價撰寫成功",
	};
	const displayErrorMsg: any = {
		note: "編輯備註失敗!",
		email: "分票失敗！",
		evaluate: "評價撰寫失敗!",
	};

	const customStyle = useCustomTheme();
	const [ticketEmail, setTicketEmail] = useState("");
	const [ticketNote, setTicketNote] = useState("");
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
			const responseBody = await ticket.updateTicketInfo(
				target.ticketId,
				ticketEmail,
				ticketNote,
			);
			if (responseBody.data) {
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
		<Dialog onClose={() => onClose(false)} open={open} maxWidth="sm">
			<DialogTitle>{displayTitle[type] || ""}</DialogTitle>
			<DialogContent>
				<Box sx={{ px: 5, py: 3 }}>
					{type === "note" && (
						<>
							<TextField
								required
								label="備註"
								variant="outlined"
								margin="dense"
								inputProps={{ maxLength: 50 }}
								value={ticketNote}
								onChange={(e) => setTicketNote(e.target.value)}
							/>
						</>
					)}
					{type === "email" && (
						<>
							<Typography sx={customStyle.descStyle}>
								票卷編號：{payment}
							</Typography>
							<Typography sx={customStyle.descStyle}>
								訂單編號：{target?.ticketId}
							</Typography>
							<TextField
								required
								type="email"
								value={ticketEmail}
								label="Email"
								margin="normal"
								InputLabelProps={{ shrink: true }}
								onChange={(e) => setTicketEmail(e.target.value)}
							/>
							<Typography sx={customStyle.descStyle}>
								此步驟無法還原!請確認取票人email是否正確，
								<br />
								一旦分票後，票券即消失於票券夾
							</Typography>
						</>
					)}
					{type === "evaluate" && <>3</>}
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
					送出
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default TicketModifyDialog;
