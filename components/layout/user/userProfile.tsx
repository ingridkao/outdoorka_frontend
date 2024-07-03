"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import dayjs from "dayjs";
import axios from "@/plugins/api/axios";
import { NAME_REGEX, TW_PHONE_REGEX } from "@/utils/regexHandler";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
	Alert,
	Avatar,
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	TextField,
} from "@mui/material";

type Props = { userData: any };

const { user } = axios;

export default function UserProfile({ userData }: Props) {
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const [profileForm, setProfileForm] = useState<any>({
		photo: userData?.photo || "",
		name: userData?.name || "",
		mobile: userData?.mobile || "",
		birthday: dayjs(userData?.birthday) || dayjs("2000-01-01"),
	});
	const [gender, setGender] = useState(userData?.gender || "");
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [errorPhotoMsg, setErrorPhotoMsg] = useState("");
	const [validName, setValidName] = useState("");
	const [validMobile, setValidMobile] = useState("");

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.preventDefault();
		const { name, value } = e.target;

		if (name === "name") {
			if (!value || value.length < 2) {
				setValidName("最少輸入兩個字元");
			} else if (!NAME_REGEX.test(value)) {
				setValidName("請確認姓名格式，僅接受中文及英數字");
			} else {
				setValidName("");
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

		setProfileForm((prevForm: any) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleSelectChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target?.files) {
			setErrorPhotoMsg("請重新選擇圖片");
			return;
		}

		if (event.target.files[0]) {
			const getFile = event.target.files[0];
			const maxSize = 1024 * 1024 * 2; // 2 MB

			if (getFile.size > maxSize) {
				// console.error("Image size cannot exceed 2 MB");
				setErrorPhotoMsg("上傳圖片大小不可超過 2 MB");
				return;
			}

			// Validate file type
			const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
			if (!allowedTypes.includes(getFile.type)) {
				// console.error("只允許 JPG, PNG, and GIF images are allowed");
				setErrorPhotoMsg("圖片格式只允許 JPG, PNG, GIF");
				return;
			}

			const formData = new FormData();
			formData.append("image", event.target.files[0]);

			user
				.updateUserPhoto(formData)
				.then((res: any) => {
					if (res.data?.url) {
						setProfileForm((prevForm: any) => ({
							...prevForm,
							photo: res.data.url,
						}));
					}
				})
				.catch((err: any) => {
					console.error("imageUpload", err);
					setErrorPhotoMsg("請重新選擇圖片");
				});
		} else {
			console.error("No file selected");
			setErrorPhotoMsg("請重新選擇圖片");
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setErrorMsg("");
		setSuccessMsg("");

		const data = new FormData(event.currentTarget);
		// https://thispersondoesnotexist.com
		const postData = {
			name: data.get("name") || "",
			photo: profileForm.photo || "",
			mobile: data.get("mobile"),
			gender: gender,
			birthday: data.get("birthday"),
		};

		if (!postData || !postData.mobile || !postData.birthday) {
			setErrorMsg("請輸入完整資料");
			return;
		}

		if (validName || validMobile) {
			setErrorMsg("請輸入完整資料");
			return;
		}

		user
			.updateUser(userData._id, postData)
			.then((result: any) => {
				if (result.data?._id) {
					setSuccessMsg("更新成功");

					setTimeout(() => {
						setErrorMsg("");
						setSuccessMsg("");
					}, 9000);
				} else {
					let errorMessages = "更新失敗，請再確認以上欄位後再次嚐試";
					try {
						const error = JSON.parse(result.error);
						if (Array.isArray(error)) {
							errorMessages = error
								.map((data: any) => Object.values(data)[0])
								.join("\n");
						}
					} catch (error) {
						if (typeof result.error === "string") {
							errorMessages = result.error;
						}
					}

					setErrorMsg(errorMessages);
				}
			})
			.catch((err: any) => {
				console.error(err);
				setErrorMsg("更新失敗");
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
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{}}>
					<Grid container spacing={5} justifyContent={"center"}>
						<Grid item xs={5}>
							<Avatar
								alt="Avatar"
								src={profileForm.photo}
								sx={{
									width: 120,
									height: 120,
									margin: "0 auto",
									cursor: "pointer",
									marginBottom: 2,
								}}
								onClick={() => hiddenFileInput.current!.click()}
							/>
							<input
								type="file"
								hidden
								ref={hiddenFileInput}
								style={{ display: "none" }}
								onChange={handleImageUpload}
							/>

							{errorPhotoMsg && <Alert severity="error">{errorPhotoMsg}</Alert>}
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="name"
								label="名稱"
								name="name"
								error={validName !== ""}
								helperText={validName || ""}
								value={profileForm.name}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="mobile"
								label="手機號碼"
								name="mobile"
								error={validMobile !== ""}
								helperText={validMobile || ""}
								value={profileForm.mobile}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										sx={{ width: "100%" }}
										name="birthday"
										label="生日"
										format="YYYY/MM/DD"
										value={profileForm.birthday}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="gender-label">性別</InputLabel>
								<Select
									labelId="gender-label"
									id="gender"
									value={gender}
									label="gender"
									onChange={handleSelectChange}
								>
									<MenuItem value={""}>不公開</MenuItem>
									<MenuItem value={"male"}>生理男</MenuItem>
									<MenuItem value={"female"}>生理女</MenuItem>
								</Select>
							</FormControl>
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
