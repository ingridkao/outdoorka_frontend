"use client";

import {
	useState,
	useEffect,
	SyntheticEvent,
	Suspense,
	ChangeEvent,
	useRef,
} from "react";
import { useSearchParams } from "next/navigation";

import OrganizerLayout from "@/components/layout/OrganizerLayout/OrganizerLayout";

import axios from "@/plugins/api/axios";
import {
	Box,
	Tab,
	Tabs,
	Alert,
	Grid,
	Avatar,
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import Loading from "@/components/ui/loading/loading";
import { NAME_REGEX, TW_PHONE_REGEX } from "@/utils/regexHandler";
import { ActivityTag } from "@/types/enum/activity";
import CircularLoading from "@/components/ui/loading/CircularLoading";

interface CheckboxTypes {
	[key: string]: boolean;
}

function OrganizerProfile() {
	const searchParams = useSearchParams();
	const type = searchParams?.get("type") || 0;
	const { organizer } = axios;

	const hiddenFileInput = useRef<HTMLInputElement>(null);
	const [tagValue, setTagValue] = useState(type ? Number(type) : 0);
	const [profileForm, setProfileForm] = useState<any>({
		photo: "",
		name: "",
		nickName: "",
		mobile: "",
		profileDetail: "",
		socialMediaUrls: {
			fbUrl: "",
			igUrl: "",
		},
	});
	const [checkboxState, setCheckboxState] = useState<CheckboxTypes>({
		Camping: false,
		Climbing: false,
		Hiking: false,
		Sports: false,
		Surfing: false,
		Excursion: false,
		Trip: false,
	});

	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [dataLoad, setDataLoad] = useState(true);
	const [validName, setValidName] = useState("");
	const [validNickName, setValidNickName] = useState("");
	const [validMobile, setValidMobile] = useState("");
	const [errorPhotoMsg, setErrorPhotoMsg] = useState("");
	const [validDetail, setValidDetail] = useState("");

	useEffect(() => {
		async function loadData() {
			try {
				setDataLoad(true);
				const responseBody = await organizer.getOrganizer();
				if (responseBody && responseBody.data) {
					// console.log(responseBody.data);
					const profile = {
						photo: responseBody.data.photo,
						name: responseBody.data.name,
						nickName: responseBody.data.nickName,
						mobile: responseBody.data.mobile,
						profileDetail: responseBody.data.profileDetail,
						socialMediaUrls: {
							fbUrl: responseBody.data.socialMediaUrls?.fbUrl || "",
							igUrl: responseBody.data.socialMediaUrls?.igUrl || "",
						},
					};

					if (Array.isArray(responseBody.data.profileTags)) {
						responseBody.data.profileTags.forEach((tag: string) => {
							setCheckboxState((prev: any) => ({
								...prev,
								[tag]: true,
							}));
						});
					}

					setProfileForm(profile);
				}
			} catch (error: any) {
				if (error?.status == 404) {
					console.log("No data");
				} else {
					setErrorMsg(String(error?.message));
				}
			}
			setDataLoad(false);
		}
		loadData();
	}, []);

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

		if (name === "nickName") {
			if (!value || value.length < 2) {
				setValidNickName("最少輸入兩個字元");
			} else if (!NAME_REGEX.test(value)) {
				setValidNickName("請確認姓名格式，僅接受中文及英數字");
			} else {
				setValidNickName("");
			}
		}

		if (name === "profileDetail") {
			if (value === "") {
				setValidDetail("請輸入簡介");
			} else if (value.length > 10) {
				return;
			} else {
				setValidDetail("");
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

		if (name === "fbUrl" || name === "igUrl") {
			setProfileForm((prevForm: any) => ({
				...prevForm,
				socialMediaUrls: {
					...prevForm.socialMediaUrls,
					[name]: value,
				},
			}));
		} else {
			setProfileForm((prevForm: any) => ({
				...prevForm,
				[name]: value,
			}));
		}
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCheckboxState((pre) => ({
			...pre,
			[event.target.name]: event.target.checked,
		}));
	};

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		event.preventDefault();
		setTagValue(newValue);
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

			organizer
				.imageUpload(formData)
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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { photo, name, nickName, mobile, profileDetail, socialMediaUrls } =
			profileForm;

		if (!name || !nickName || !mobile || !profileDetail || !photo) {
			setErrorMsg("請填寫所有欄位");
			return;
		}

		if (validName || validNickName || validMobile || validDetail) {
			setErrorMsg("請確認欄位格式");
			return;
		}

		const selectedTags = Object.keys(checkboxState).filter(
			(key) => checkboxState[key],
		);

		organizer
			.updateProfile({
				photo,
				name,
				nickName,
				mobile,
				profileDetail,
				socialMediaUrls,
				profileTags: selectedTags,
			})
			.then((res: any) => {
				if (res.data) {
					setSuccessMsg("更新成功");
				} else {
					setErrorMsg("更新失敗");
				}
			})
			.catch((err: any) => {
				console.error("updateProfile", err);
				setErrorMsg("更新失敗");
			});
		setErrorMsg("");
		setSuccessMsg("");
	};

	return (
		<OrganizerLayout>
			<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
				<Tabs value={tagValue} onChange={handleChange} aria-label="資料管理">
					<Tab label="更新資料" value={0} />
					<Tab label="更新密碼" value={1} />
				</Tabs>
			</Box>

			{dataLoad ? (
				<CircularLoading />
			) : (
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
								id="nickName"
								label="暱稱"
								name="nickName"
								error={validNickName !== ""}
								helperText={validNickName || ""}
								value={profileForm.nickName}
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
							<TextField
								required
								fullWidth
								id="profileDetail"
								label="主揪簡介"
								name="profileDetail"
								multiline
								rows={5}
								error={validDetail !== ""}
								helperText={validDetail || ""}
								value={profileForm.profileDetail}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="fb"
								label="FB"
								name="fbUrl"
								value={profileForm.socialMediaUrls.fbUrl}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="ig"
								label="IG"
								name="igUrl"
								value={profileForm.socialMediaUrls.igUrl}
								onChange={handleInputChange}
							/>
						</Grid>

						<Grid item xs={12}>
							{Object.keys(checkboxState).map((key) => (
								<FormControlLabel
									key={key}
									control={
										<Checkbox
											checked={checkboxState[key]}
											onChange={handleCheckboxChange}
											name={key}
										/>
									}
									label={ActivityTag[key as keyof typeof ActivityTag]}
								/>
							))}
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
						儲存變更
					</Button>
				</Box>
			)}
		</OrganizerLayout>
	);
}

function WrappedOrganizerProfilePage() {
	return (
		<Suspense fallback={<Loading />}>
			<OrganizerProfile />
		</Suspense>
	);
}

export default WrappedOrganizerProfilePage;
