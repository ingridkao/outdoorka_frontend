"use client";

import React from "react";
import NextLink from "next/link";
import axios from "@/plugins/api/axios";
import { EMAIL_REGEX } from "@/utils/regexHandler";
import {
	Grid,
	Box,
	Typography,
	TextField,
	Button,
	Link as MuiLink,
	Alert,
	AlertTitle,
} from "@mui/material";

function Forget() {
	const { auth } = axios;

	const [email, setEmail] = React.useState("");
	const [validEmail, setValidEmail] = React.useState("");
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [resultMsg, setResultMsg] = React.useState("");
	const [isPending, setIsPending] = React.useState(false);

	const handleSubmit = async () => {
		if (email === "" || !EMAIL_REGEX.test(email)) {
			setValidEmail("請輸入正確 Email 帳號");
			return;
		}

		setIsPending(true);
		auth
			.organizerForgotPassword({ email })
			.then(() => {
				setResultMsg("已寄送重設密碼連結至您的 Email，請查收!");
				setIsSuccess(true);
			})
			.catch((err: any) => {
				console.error(err);
				setResultMsg("寄送重設密碼連結失敗，請重新操作");
				setIsSuccess(false);
			})
			.finally(() => {
				setIsPending(false);
			});
	};

	return (
		<Box
			sx={{
				maxWidth: 400,
				margin: "auto",
				flexGrow: 1,
			}}
		>
			<Grid
				container
				height="100dvh"
				direction="column"
				alignItems="center"
				justifyContent="center"
				spacing={2}
			>
				{resultMsg ? (
					<Grid item sx={{ width: "100%" }}>
						<Alert severity={isSuccess ? "success" : "error"}>
							<AlertTitle>
								{isSuccess ? "重置密碼成功" : "重置密碼失敗"}
							</AlertTitle>
							{resultMsg}
						</Alert>
					</Grid>
				) : (
					<>
						<Grid item sx={{ width: "100%" }}>
							<Typography variant="h6">主揪重設密碼</Typography>
							<Typography variant="body1">
								請輸入您註冊時所使用的 Email 帳號
							</Typography>
						</Grid>
						<Grid item sx={{ width: "100%", textAlign: "center" }}>
							<Box
								component="form"
								noValidate
								autoComplete="off"
								sx={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<TextField
									required
									id="email"
									label="Email"
									variant="outlined"
									margin="dense"
									value={email}
									error={validEmail !== ""}
									helperText={validEmail}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Button
									variant="contained"
									size="large"
									sx={{ marginTop: 1, marginBottom: 1 }}
									onClick={handleSubmit}
									disabled={isPending}
								>
									寄送重設密碼連結
								</Button>
							</Box>
						</Grid>
					</>
				)}

				<Grid item sx={{ width: "100%", textAlign: "center" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography variant="body1" sx={{ fontSize: 20, marginBottom: 1 }}>
							或
						</Typography>
						<Button
							component={NextLink}
							href="/organizer/login"
							variant="outlined"
							size="large"
						>
							返回登入
						</Button>
						<Typography variant="body1" sx={{ marginTop: 2 }}>
							尚未註冊帳號？
							<MuiLink
								component={NextLink}
								href="/organizer/register"
								underline="always"
							>
								立即註冊
							</MuiLink>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Forget;
