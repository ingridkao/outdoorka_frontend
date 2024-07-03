"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { RootState } from "@/types";
import { RegisterForm } from "@/types/AuthType";
import axios from "@/plugins/api/axios";
import {
	EMAIL_REGEX,
	PWD_REGEX,
	NAME_REGEX,
	TW_PHONE_REGEX,
} from "@/utils/regexHandler";

import {
	Unstable_Grid2 as Grid,
	Box,
	Typography,
	Fade,
	FormControl,
	TextField,
	Button,
	Link as MuiLink,
	Alert,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Register() {
	const router = useRouter();
	const { profile: authUser } = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		if (authUser) {
			// 已登入導轉到首頁
			router.push("/");
		}
	}, [authUser, router]);

	const [checked, setChecked] = useState(true);
	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const displayName: Record<keyof RegisterForm, string> = {
		name: "姓名",
		mobile: "手機",
		email: "帳號",
		password: "密碼",
		confirm: "確認密碼",
	};
	const [registerForm, setRegisterForm] = useState<RegisterForm>({
		name: "",
		mobile: "",
		email: "",
		password: "",
		confirm: "",
	});
	const [registerValid, setRegisterValid] = useState<RegisterForm>({
		name: "",
		mobile: "",
		email: "",
		password: "",
		confirm: "",
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		const { name, value } = e.target;

		if (name in displayName) {
			const fieldName = name as keyof RegisterForm;
			const displayStr = displayName[fieldName];
			let errorMessage = "";
			if (value === "") {
				errorMessage = `請輸入${displayStr}`;
			} else if (fieldName === "name" && !NAME_REGEX.test(value)) {
				errorMessage = "請確認姓名格式，僅接受中文及英數字";
			} else if (fieldName === "mobile" && !TW_PHONE_REGEX.test(value)) {
				errorMessage = "請確認手機格式，格式為0912345678";
			} else if (fieldName === "email" && !EMAIL_REGEX.test(value)) {
				errorMessage = "請輸入Email格式";
			} else if (fieldName === "password" && !PWD_REGEX.test(value)) {
				errorMessage = "請輸入正確密碼格式，8-20碼至少包含一個大小寫英數字";
			} else if (fieldName === "confirm" && registerForm.password !== value) {
				errorMessage = "請確認密碼輸入一致";
			}

			setRegisterValid((prevValid) => ({
				...prevValid,
				[fieldName]: errorMessage,
			}));
		}

		setRegisterForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const { auth } = axios;
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const { email, password, mobile, name } = registerForm;

		if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(password)) return;
		setErrorMsg("");
		setSuccessMsg("");
		try {
			const result = await auth.registerEndUser({
				name,
				mobile,
				password,
				email: email,
			});
			if (result.error && result.status == 409) {
				setErrorMsg("此帳號已被註冊過");
			} else if (result.data) {
				setSuccessMsg("註冊成功");
				// 2秒後跳轉到首頁
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const step1 = (
		<Box
			sx={{
				width: "80%",
				margin: "auto",
			}}
		>
			<Box
				component="img"
				sx={{
					objectFit: "cover",
					marginBottom: 3,
				}}
				alt="logi"
				src="https://i.imgur.com/qokckjQ.png"
			/>
			<Typography variant="h6">加入揪好咖</Typography>
			<Typography variant="body1">
				你可以在這邊找到充滿趣味的活動，Join us！
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					my: 4,
				}}
			>
				<Button variant="contained" size="large" onClick={handleChange}>
					使用 Email 註冊
				</Button>
				<Typography variant="body1" sx={{ fontSize: 20 }}>
					或
				</Typography>
				<Button variant="outlined" size="large">
					使用 Google 帳號登入
				</Button>
				<Button variant="outlined" size="large">
					使用 LINE 帳號登入
				</Button>
			</Box>
			<Typography variant="body1">
				已經有揪好咖帳號？
				<MuiLink component={NextLink} href="/login" underline="always">
					立即登入
				</MuiLink>
			</Typography>
		</Box>
	);

	const step2 = (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			sx={{
				position: "absolute",
				width: "80%",
				left: "10%",
				top: 0,
			}}
		>
			<Box
				sx={{
					position: "absolute",
					top: "-15%",
					left: 0,
				}}
			>
				<Button
					variant="outlined"
					aria-label="返回"
					sx={{
						width: "64px",
						height: "64px",
						padding: 0,
						borderRadius: 10,
					}}
					onClick={handleChange}
				>
					<ChevronLeftIcon />
				</Button>
			</Box>
			{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
			{successMsg && <Alert severity="success">{successMsg}</Alert>}
			<FormControl>
				<TextField
					required
					name="name"
					value={registerForm.name}
					label="姓名"
					variant="outlined"
					margin="normal"
					error={registerValid.name !== ""}
					helperText={registerValid.name}
					InputLabelProps={{ shrink: true }}
					onChange={(
						event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => handleInputChange(event)}
				/>
				<TextField
					required
					name="email"
					type="email"
					value={registerForm.email}
					label="帳號"
					variant="outlined"
					margin="normal"
					error={registerValid.email !== ""}
					helperText={registerValid.email}
					InputLabelProps={{ shrink: true }}
					onChange={(
						event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => handleInputChange(event)}
				/>
				<TextField
					required
					name="mobile"
					value={registerForm.mobile}
					label="手機"
					variant="outlined"
					margin="normal"
					error={registerValid.mobile !== ""}
					helperText={registerValid.mobile}
					InputLabelProps={{ shrink: true }}
					onChange={(
						event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => handleInputChange(event)}
				/>
				<TextField
					required
					name="password"
					type="password"
					value={registerForm.password}
					label="輸入密碼"
					variant="outlined"
					margin="normal"
					error={registerValid.password !== ""}
					helperText={registerValid.password}
					InputLabelProps={{ shrink: true }}
					onChange={(
						event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => handleInputChange(event)}
				/>
				<TextField
					required
					name="confirm"
					type="password"
					value={registerForm.confirm}
					label="確認密碼"
					variant="outlined"
					margin="normal"
					error={registerValid.confirm !== ""}
					helperText={registerValid.confirm}
					InputLabelProps={{ shrink: true }}
					onChange={(
						event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => handleInputChange(event)}
				/>
				<Typography
					variant="body1"
					sx={{
						my: 3,
					}}
				>
					註冊即表示您已閱讀並同意
					<span>服務條款</span>及<span>隱私權政策</span>
				</Typography>
				<Button
					type="submit"
					variant="contained"
					size="large"
					disabled={Object.values(registerValid).some((value) => value !== "")}
					onClick={handleSubmit}
				>
					註冊
				</Button>
			</FormControl>
		</Box>
	);

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
					}}
					style={{
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
						position: "relative",
					}}
				>
					<Fade in={checked}>{step1}</Fade>
					<Fade in={!checked}>{step2}</Fade>
				</Box>
			</Grid>
		</Grid>
	);
}
