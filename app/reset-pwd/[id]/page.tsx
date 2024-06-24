"use client";

import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
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
import axios from "@/plugins/api/axios";
import { PWD_REGEX } from "@/utils/regexHandler";

function ResetPwd({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { auth } = axios;

	const [password, setPassword] = React.useState("");
	const [checkPassword, setCheckPassword] = React.useState("");
	const [validPassword, setValidPassword] = React.useState("");
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [resultMsg, setResultMsg] = React.useState("");
	const [isPending, setIsPending] = React.useState(false);

	const handleSubmit = async () => {
		if (!password || !checkPassword || !PWD_REGEX.test(password)) {
			setValidPassword("請確認正確密碼，規則為大小寫英數字並且至少八碼");
			return;
		}

		if (password !== checkPassword) {
			setValidPassword("兩次密碼輸入不一致");
			return;
		}

		setIsPending(true);
		auth
			.resetPassword({ token: params.id, password: password })
			.then(() => {
				setResultMsg("密碼已重設，請重新登入");
				setIsSuccess(true);
				setTimeout(() => {
					router.push("/login");
				}, 600); // 後跳轉
			})
			.catch((err: any) => {
				console.error(err);
				setResultMsg("重設密碼失敗，請重新操作");
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
								{isSuccess ? "會員重置密碼成功" : "會員重置密碼失敗"}
							</AlertTitle>
							{resultMsg}
						</Alert>
					</Grid>
				) : (
					<>
						<Grid item sx={{ width: "100%" }}>
							<Typography variant="h6">會員重置密碼</Typography>
							<Typography variant="body1">
								請輸入密碼為大小寫英數字並且至少八碼
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
									id="password"
									type="password"
									label="新密碼"
									variant="outlined"
									margin="dense"
									value={password}
									error={validPassword !== ""}
									helperText={validPassword}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<TextField
									required
									id="checkPassword"
									type="password"
									label="再次輸入密碼"
									variant="outlined"
									margin="dense"
									value={checkPassword}
									error={validPassword !== ""}
									helperText={validPassword}
									onChange={(e) => setCheckPassword(e.target.value)}
								/>
								<Button
									variant="contained"
									size="large"
									sx={{ marginTop: 1, marginBottom: 1 }}
									onClick={handleSubmit}
									disabled={isPending}
								>
									重設密碼
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
							href="/login"
							variant="outlined"
							size="large"
						>
							返回登入
						</Button>
						<Typography variant="body1" sx={{ marginTop: 2 }}>
							尚未註冊帳號？
							<MuiLink component={NextLink} href="/register" underline="always">
								立即註冊
							</MuiLink>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ResetPwd;
