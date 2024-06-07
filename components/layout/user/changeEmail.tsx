"use client";
import React, { useState } from "react";
import axios from "@/plugins/api/axios";
import { EMAIL_REGEX } from "@/utils/regexHandler";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";

type Props = { userData: any; onEdit?: any };

const { user } = axios;

export default function ChangeEmail({ userData }: Props) {
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSuccessMsg("");
		setErrorMsg("");

		const data = new FormData(event.currentTarget);
		const postData = {
			email: (data.get("newEmail") as string) || "",
			password: data.get("password"),
		};

		if (!postData || !postData.email || !postData.password) {
			setErrorMsg("請輸入完整資料");
			return;
		}

		if (!EMAIL_REGEX.test(postData.email)) {
			setErrorMsg("請輸入正確的Email格式");
			return;
		}

		user
			.updateUserEmail(userData._id, postData)
			.then((result: any) => {
				if (result.data && result.data._id) {
					setSuccessMsg("Email 變更成功");
				} else {
					setErrorMsg("Email 變更失敗");
				}
			})
			.catch((err: any) => {
				console.error(err);
				setErrorMsg("Email 變更失敗");
			});
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{userData && userData.email && (
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={5}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="oldEmail"
								label="原有的 Email"
								name="oldEmail"
								disabled
								defaultValue={userData.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="newEmail"
								label="新的 Email"
								name="newEmail"
								autoComplete="email"
								defaultValue=""
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="password"
								required
								fullWidth
								label="密碼"
								name="password"
								type="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>

					<Grid item xs={12} sx={{ mt: 5 }}>
						{errorMsg && (
							<Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
								{errorMsg}
							</Alert>
						)}
						{successMsg && <Alert severity="success">{successMsg}</Alert>}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						變更
					</Button>
				</Box>
			)}
		</Box>
	);
}
