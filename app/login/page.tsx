"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { RootState } from "@/types";
import { LoginForm } from "@/types/AuthType";
import { loginUser } from "@/features/user/authSlice";
import { EMAIL_REGEX, PWD_REGEX } from "@/utils/regexHandler";

import {
	Unstable_Grid2 as Grid,
	Box,
	Typography,
	FormGroup,
	FormControlLabel,
	Checkbox,
	TextField,
	Button,
	Link as MuiLink,
	Alert,
} from "@mui/material";

export default function Login() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { profile: authUser } = useSelector((x: RootState) => x.auth);
	useEffect(() => {
		if (authUser) {
			router.push("/");
		}
	}, [authUser, router]);

	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const displayName: Record<keyof LoginForm, string> = {
		account: "帳號",
		password: "密碼",
	};
	const [loginField, setLoginField] = useState<LoginForm>({
		account: "",
		password: "",
	});
	const [loginValid, setLoginValid] = useState<LoginForm>({
		account: "",
		password: "",
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		const { name, value } = e.target;

		if (name in displayName) {
			const fieldName = name as keyof LoginForm;
			const displayStr = displayName[fieldName];
			let errorMessage = "";
			if (value === "") {
				errorMessage = `請輸入${displayStr}`;
			} else if (fieldName === "account" && !EMAIL_REGEX.test(value)) {
				errorMessage = "請輸入Email格式";
			} else if (fieldName === "password" && !PWD_REGEX.test(value)) {
				errorMessage = "請確認正確密碼格式，規則為大小寫英數字並且至少八碼";
			}

			setLoginValid((prevValid) => ({
				...prevValid,
				[fieldName]: errorMessage,
			}));
		}

		setLoginField((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const { account, password } = loginField;
		if (!EMAIL_REGEX.test(account) || !PWD_REGEX.test(password)) return;

		setErrorMsg("");
		setSuccessMsg("");
		dispatch(loginUser(loginField)).then((res: any) => {
			if (res.payload?.data) {
				setSuccessMsg(res.payload.message);
				// 2秒後跳轉到首頁
				setTimeout(() => {
					router.replace("/");
				}, 2000);
			} else if (res.error.message) {
				setErrorMsg(res.error.message);
			}
		});
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			spacing={2}
		>
			<Grid
				xs={12}
				md={6}
				sx={{
					overflow: "hidden",
				}}
			>
				<Box
					component="img"
					sx={{
						objectFit: "cover",
						height: "100dvh",
					}}
					display={{ xs: "none", md: "block" }}
					alt="cover"
					src="https://i.imgur.com/UTYmBjM.jpg"
				/>
			</Grid>

			<Grid
				xs={12}
				md={6}
				sx={{
					textAlign: "center",
				}}
			>
				<Box
					sx={{
						width: "75%",
						margin: "auto",
					}}
				>
					<Box component="form" noValidate autoComplete="off">
						<Box
							component="img"
							sx={{
								objectFit: "cover",
								marginBottom: 3,
							}}
							alt="login"
							src="https://i.imgur.com/qokckjQ.png"
						/>
						{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
						{successMsg && <Alert severity="success">{successMsg}</Alert>}
						<FormGroup>
							<TextField
								required
								name="account"
								type="email"
								value={loginField.account}
								label="帳號"
								margin="normal"
								error={loginValid.account !== ""}
								helperText={loginValid.account}
								InputLabelProps={{ shrink: true }}
								onChange={(
									event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
								) => handleInputChange(event)}
							/>
							<TextField
								required
								name="password"
								value={loginField.password}
								label="密碼"
								margin="normal"
								type="password"
								error={loginValid.password !== ""}
								helperText={loginValid.password}
								InputLabelProps={{ shrink: true }}
								onChange={(
									event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
								) => handleInputChange(event)}
							/>
							<Button
								variant="contained"
								size="large"
								sx={{
									marginTop: 1,
									marginBottom: 1,
								}}
								onClick={handleSubmit}
								disabled={
									loginValid.account !== "" || loginValid.password !== ""
								}
							>
								登入
							</Button>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									my: 2,
								}}
							>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label="記住我"
								/>
								<MuiLink component={NextLink} href="/forget" underline="always">
									忘記密碼
								</MuiLink>
							</Box>
						</FormGroup>
					</Box>
					<Typography variant="body1" sx={{ fontSize: 20 }}>
						或
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1,
							my: 2,
						}}
					>
						<Button variant="outlined" size="large">
							使用 Google 帳號登入
						</Button>
						<Button variant="outlined" size="large">
							使用 LINE 帳號登入
						</Button>
					</Box>

					<Typography variant="body1">
						尚未註冊帳號？
						<MuiLink component={NextLink} href="/register" underline="always">
							立即註冊
						</MuiLink>
					</Typography>
				</Box>
			</Grid>
		</Grid>
	);
}
