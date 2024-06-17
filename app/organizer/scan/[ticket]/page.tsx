"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { Html5QrcodeScanner} from "html5-qrcode";

import axios from "@/plugins/api/axios";

import { Grid, Box, Typography, TextField, Button, Alert } from "@mui/material";
import BackBtn from "@/components/ui/shared/BackBtn";
import TicketCheckinDialog from "@/components/ui/dialog/TicketCheckinDialog";

export default function Scan() {
	const params = useParams<{ ticket: string }>();
	const { organizerTicket } = axios;

	const [ticketId, setTicketId] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [scanResult, setScanResult] = useState(null);
	const [resSucesee, setResSucesee] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	let isRes = false
	useEffect(()=>{
		const scanner = new Html5QrcodeScanner(
			"reader",
			{ fps: 10 },
			false
		);
		const onScanSuccess = (result:any) => {
			setScanResult(result);
			// 阻止scanner一直讀取進入無限循環
			if(isRes) return
			fetchTicket(result)
		};
		scanner.render(onScanSuccess);
	},[]);

	const fetchTicket = async (id: string) => {
		if(resSucesee) return
		if (id === "") {
			setErrorMsg("請填寫票卷編號");
		} else {
			setErrorMsg("");
			try {
				const responseBody = await organizerTicket.getTicketInfo(id);
				if(responseBody.data && responseBody.data){
					setResSucesee(responseBody.data)
					setDialogOpen(true)
					isRes = true
				}
			} catch (error: any) {
				setResSucesee(null)
				setDialogOpen(false)
				if (error?.status == 400) {
					setErrorMsg("輸入的票卷編號錯誤");
				} else {
					setErrorMsg(String(error?.message));
				}
			}
		}
	};

	const sendTicket = () => {
		if (ticketId === "") {
			setErrorMsg("請填寫票卷編號");
		} else {
			setErrorMsg("");
			fetchTicket(ticketId);
		}
	};

	///api/v1/tickets/{ticket-id}/confirm
	const paperStyle = {
		width: "100%",
		backgroundColor: "#EDF1F9",
		borderRadius: 1,
		py: 2,
	};

	return (
		<Box sx={{ width: 400, my: 2, mx: "auto" }}>
			<BackBtn href="/organizer/activity" name="活動列表" />
			<Grid
				container
				direction="column"
				alignItems="center"
				rowSpacing={2}
				sx={{
					...paperStyle,
					textAlign: "center",
					mt: 0.5,
				}}
			>
				<Grid item>
					<Typography variant="h6">活動驗票</Typography>
					<Typography variant="body2">請掃描跟團仔出示的 QR code</Typography>
				</Grid>
				<Grid item>
					<Box sx={{
						display: "flex",
						alignItems:"center",
						justifyContent:"center",
						width: 250,
						height: 250,
						backgroundColor: "#fff"
					}}>
						{scanResult
							? <>{scanResult}</>
							: <div id="reader" style={{width: "250px",height: "250px"}}></div>}
					</Box>
				</Grid>
				<Grid item>
					<Typography variant="body2">無法掃描QRcoda進行驗票嗎?</Typography>
					<Box
						component="form"
						noValidate
						autoComplete="off"
						sx={{
							display: "flex",
							my: 2,
						}}
					>
						<TextField
							label="輸入票卷編號"
							variant="outlined"
							size="small"
							margin="dense"
							value={ticketId}
							onChange={async (event: ChangeEvent<HTMLInputElement>) => {
								setTicketId(event.target.value);
							}}
						/>
						<Button
							variant="contained"
							size="small"
							sx={{ m: 1 }}
							onClick={() => sendTicket()}
						>
							送出
						</Button>
					</Box>
				</Grid>
				{/* TODO 之後刪掉 */}
				<Grid item>活動uuid：{params?.ticket}</Grid>
				<Grid item>
					{errorMsg !== "" && <Alert severity="warning">{errorMsg}</Alert>}
				</Grid>
			</Grid>
			<TicketCheckinDialog
				info={resSucesee}
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			/>
		</Box>
	);
}
