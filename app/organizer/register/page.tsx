"use client";

import { useState, ChangeEvent } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
	EMAIL_REGEX,
	NAME_REGEX,
	PWD_REGEX,
	TW_PHONE_REGEX,
} from "@/utils/regexHandler";
import axios from "@/plugins/api/axios";
import {
	Grid,
	Box,
	Typography,
	Fade,
	FormControl,
	TextField,
	Button,
	Link as MuiLink,
	Alert,
} from "@mui/material";

export default function Register() {
	const router = useRouter();
	const { auth } = axios;
	// const dispatch = useDispatch();

	const [registerForm, setRegisterForm] = useState<any>({
		name: "",
		nickName: "",
		mobile: "",
		email: "",
		password: "",
		confirm: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [validName, setValidName] = useState("");
	const [validNickName, setValidNickName] = useState("");
	const [validEmail, setValidEmail] = useState("");
	const [validMobile, setValidMobile] = useState("");
	const [validPwd, setValidPwd] = useState("");
	const [validMatch, setValidMatch] = useState("");

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		const { name, value } = e.target;

		if (name === "name") {
			if (value === "") {
				setValidName("請輸入姓名");
			} else if (!NAME_REGEX.test(value)) {
				setValidName("請確認姓名格式，僅接受中文及英數字");
			} else {
				setValidName("");
			}
		}

		if (name === "nickName") {
			if (value === "") {
				setValidNickName("請輸入暱稱");
			} else if (!NAME_REGEX.test(value)) {
				setValidNickName("請確認暱稱格式，僅接受中文及英數字");
			} else {
				setValidNickName("");
			}
		}

		if (name === "mobile") {
			if (value === "") {
				setValidMobile("請輸入手機");
			} else if (!TW_PHONE_REGEX.test(value)) {
				setValidMobile("請確認手機格式，格式為0900000000");
			} else {
				setValidMobile("");
			}
		}

		if (name === "email") {
			if (value === "") {
				setValidEmail("請輸入帳號");
			} else if (!EMAIL_REGEX.test(value)) {
				setValidEmail("請輸入Email格式");
			} else {
				setValidEmail("");
			}
		}
		if (name === "password") {
			if (value === "") {
				setValidPwd("請輸入密碼");
			} else if (!PWD_REGEX.test(value)) {
				setValidPwd("請確認正確密碼格式，規則為大小寫英數字並且至少八碼");
			} else {
				setValidPwd("");
			}
		}
		if (name === "confirm") {
			if (registerForm.password !== value) {
				setValidMatch("請輸入確認密碼一致");
			} else if (value !== "") {
				setValidMatch("");
			}
		}

		setRegisterForm((prevForm: any) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const { email, nickName, password, mobile, name } = registerForm;

		if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(password)) return;
		setErrorMsg("");
		setSuccessMsg("");
		try {
			const result = await auth.registerOrganizer({
				email,
				name,
				nickName,
				mobile,
				password,
			});

			if (result.data) {
				// setSuccessMsg(result.message);
				setSuccessMsg("註冊成功");

				setTimeout(() => {
					router.push("/organizer/login");
				}, 300);
			} else {
				setErrorMsg("註冊失敗");
			}
		} catch (err: any) {
			console.error(err.status, err.message);
			if (err.status === "409") {
				setErrorMsg("此帳號已被註冊過");
			} else {
				setErrorMsg("註冊失敗");
			}
		}
	};

	const step1 = (
		<Box
			sx={{
				width: "80%",
				margin: "auto",
			}}
		>
			<Typography variant="h6">加入揪好咖</Typography>

			<Box
				component="form"
				noValidate
				autoComplete="off"
				sx={{
					width: "100%",
				}}
			>
				{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
				{successMsg && <Alert severity="success">{successMsg}</Alert>}
				<FormControl>
					<TextField
						required
						name="name"
						value={registerForm.name}
						label="主揪名稱"
						variant="outlined"
						margin="normal"
						error={validName !== ""}
						helperText={validName}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => handleInputChange(event)}
					/>
					<TextField
						required
						name="nickName"
						value={registerForm.nickName}
						label="主揪暱稱"
						variant="outlined"
						margin="normal"
						error={validNickName !== ""}
						helperText={validNickName}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => handleInputChange(event)}
					/>
					<TextField
						required
						name="mobile"
						value={registerForm.mobile}
						label="手機"
						variant="outlined"
						margin="normal"
						error={validMobile !== ""}
						helperText={validMobile}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => handleInputChange(event)}
					/>
					<TextField
						required
						name="email"
						type="email"
						value={registerForm.email}
						label="帳號 (Email)"
						variant="outlined"
						margin="normal"
						error={validEmail !== ""}
						helperText={validEmail}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => handleInputChange(event)}
					/>

					<TextField
						required
						name="password"
						type="password"
						value={registerForm.password}
						label="密碼"
						variant="outlined"
						margin="normal"
						inputProps={{ maxLength: 20 }}
						error={validPwd !== ""}
						helperText={validPwd}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => handleInputChange(event)}
					/>
					<TextField
						required
						name="confirm"
						type="password"
						value={registerForm.confirm}
						label="確認密碼"
						variant="outlined"
						margin="normal"
						inputProps={{ maxLength: 20 }}
						error={validMatch !== ""}
						helperText={validMatch}
						InputLabelProps={{ shrink: true }}
						onChange={(event) => handleInputChange(event)}
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
						disabled={
							validName !== "" ||
							validEmail !== "" ||
							validMobile !== "" ||
							validPwd !== "" ||
							validMatch !== ""
						}
						onClick={handleSubmit}
					>
						註冊
					</Button>
				</FormControl>
			</Box>

			<Typography variant="body1">
				已經有揪好咖帳號？
				<MuiLink
					component={NextLink}
					href="/organizer/login"
					underline="always"
				>
					立即登入
				</MuiLink>
			</Typography>
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
				item
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
					src="https://fastly.picsum.photos/id/572/1000/700.jpg?hmac=4wtTOriqhtIkQQpz6N9PLCmvzXwMvkGpSE235Mu_P9Q"
				/>
			</Grid>

			<Grid
				item
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
					<Fade in={true}>{step1}</Fade>
				</Box>
			</Grid>
		</Grid>
	);
}
