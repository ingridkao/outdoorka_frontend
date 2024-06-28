"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { RootState, LoginForm } from "@/types";
import { loginUser } from "@/features/user/authSlice";
import { EMAIL_REGEX, PWD_REGEX } from "@/utils/regexHandler";
import {
	USER_T0KEN_COOKIE,
	USER_ACCOUNT_COOKIE,
	removeCookie,
	getCookie,
	setCookie,
} from "@/utils/cookieHandler";

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

const baseUrl =
	process.env.NEXT_PUBLIC_BASE_URL_USER || "http://localhost:3006";

export default function Login() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { profile: authUser } = useSelector((state: RootState) => state.auth);
	const [loginField, setLoginField] = useState<LoginForm>({
		account: "",
		password: "",
		remember: true,
	});

	useEffect(() => {
		const getT0ken = getCookie(USER_T0KEN_COOKIE);
		const getAcc = getCookie(USER_ACCOUNT_COOKIE);
		if (getT0ken) {
			// 已登入導轉到首頁
			router.push("/");
		} else if (getAcc) {
			setLoginField({
				account: getAcc,
				password: "",
				remember: true,
			});
		}
	}, [authUser]);

	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const loginLabel: { [key: string]: string } = {
		account: "帳號",
		password: "密碼",
	};
	const [loginValid, setLoginValid] = useState<LoginForm>({
		account: "",
		password: "",
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		const { name, value } = e.target;

		let errorMessage = "";
		if (value === "") {
			const displayStr = loginLabel[name];
			errorMessage = `請輸入${displayStr}`;
		} else if (name === "account" && !EMAIL_REGEX.test(value)) {
			errorMessage = "請輸入Email正確格式";
		} else if (name === "password" && !PWD_REGEX.test(value)) {
			errorMessage = "請確認正確密碼格式，規則為大小寫英數字並且至少八碼";
		}

		setLoginValid((prevValid) => ({
			...prevValid,
			[name]: errorMessage,
		}));

		setLoginField((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "remember") {
			setLoginField((prevForm: any) => ({
				...prevForm,
				remember: e.target.checked,
			}));
		}
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const { account, password, remember } = loginField;

		if (!EMAIL_REGEX.test(account) || !PWD_REGEX.test(password)) return;
		setErrorMsg("");
		setSuccessMsg("");

		dispatch(loginUser(loginField) as any).then((res: any) => {
			if (res.payload?.data) {
				setSuccessMsg(res.payload.message);

				if (remember) {
					setCookie(USER_ACCOUNT_COOKIE, account, 30);
				} else {
					removeCookie(USER_ACCOUNT_COOKIE);
				}

				setTimeout(() => {
					router.replace("/");
				}, 2000); // 2秒後跳轉到首頁
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
								label={loginLabel.account}
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
								label={loginLabel.password}
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
									label="記住我"
									control={
										<Checkbox
											name="remember"
											checked={loginField.remember}
											onChange={handleChecked}
										/>
									}
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
						<Button
							variant="outlined"
							size="large"
							component={NextLink}
							href={`${baseUrl}/api/v1/auth/google`}
						>
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
