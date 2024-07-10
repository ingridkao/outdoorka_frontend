"use client";

import { useState } from "react";
import { OwnerState } from "@/types/TicketType";

import axios from "@/plugins/api/axios";
import {
	Box,
	Alert,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	TextField,
	Rating,
} from "@mui/material";
import { ParticipantInfo } from "./ParticipantDialog";

function ReviewUserDialog(props: {
	owner: OwnerState | null;
	ticketCreatedAt: string;
	ticketId?: string;
	open: boolean;
	onClose: (reload: boolean) => void;
}) {
	const { organizer } = axios;
	const { onClose, open, ticketId } = props;
	const [ratingValue, setRatingValue] = useState(5);
	const [eventEvaluate, setEventEvaluate] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState(false);

	const checkinCommit = async () => {
		if (!ticketId) return;
		try {
			const responseBody = await organizer.userReview(
				ticketId,
				ratingValue,
				eventEvaluate,
			);
			if (responseBody && responseBody.data) {
				setErrorMsg("");
				setSuccessMsg(true);
				setTimeout(() => {
					onClose(true);
				}, 2000);
			}
		} catch (error: any) {
			setErrorMsg(String(error?.message));
			setSuccessMsg(false);
		}
	};

	return (
		<Dialog onClose={() => onClose(false)} open={open} fullWidth maxWidth="sm">
			<DialogTitle>評價會員</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						px: 5,
						py: 3,
						textAlign: "left",
					}}
				>
					{props.owner && (
						<>
							<ParticipantInfo
								owner={props.owner}
								ticketCreatedAt={props.ticketCreatedAt}
							/>
						</>
					)}
					<FormControl fullWidth sx={{ mx: 1 }}>
						<Box sx={{ my: 3, textAlign: "center" }}>
							<Rating
								size="large"
								value={ratingValue}
								onChange={(event: any, newValue: number | null) => {
									setRatingValue(newValue ? newValue : 5);
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
				</Box>

				<Box sx={{ px: 5, mb: 0.5 }}>
					{errorMsg !== "" && (
						<Alert severity="warning">
							評價失敗，{errorMsg} <br />
							請再次嘗試，若仍無法操作請聯繫平台管理員
						</Alert>
					)}
					{successMsg && <Alert severity="success">評價成功</Alert>}
				</Box>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: "center",
					gap: 2,
				}}
			>
				<Button variant="contained" size="large" onClick={checkinCommit}>
					送出評價
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ReviewUserDialog;
