"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
	Box,
	Divider,
	Button,
	Card,
	CardContent,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import axios from "@/plugins/api/axios";
import { formatTime } from "@/utils/formatTime";
import StepperLayout from "@/components/layout/PaymentLayout/StepperLayout";
import { paymentRegistration } from "@/features/payments/paymentsSlice";
import CircularLoading from "@/components/ui/loading/CircularLoading";
import { EMAIL_REGEX, NAME_REGEX, TW_PHONE_REGEX } from "@/utils/regexHandler";

function Details() {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const quantity = searchParams.get("quantity");
	const dispatch = useDispatch();
	const { data, success } = useSelector((state) => state.payments);
	const [formValue, setFormValue] = useState({
		name: "",
		email: "",
		mobile: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		mobile: "",
	});

	const [isDisabled, setIsDisabled] = useState(true);
	const [activityData, setActivityData] = useState({});
	const [mounted, setMounted] = useState(false);
	const id = params?.id;
	const { activity } = axios;

	const validateField = (name: string, value: string) => {
		let error = "";
		switch (name) {
			case "name":
				if (!NAME_REGEX.test(value)) {
					error = "姓名格式錯誤。";
				}
				break;
			case "email":
				if (!EMAIL_REGEX.test(value)) {
					error = "電子郵件格式錯誤。";
				}
				break;
			case "mobile":
				if (!TW_PHONE_REGEX.test(value)) {
					error = "行動電話格式錯誤。";
				}
				break;
			default:
				break;
		}
		return error;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		const error = validateField(name, value);

		setFormValue({
			...formValue,
			[name]: value,
		});
		setErrors({
			...errors,
			[name]: error,
		});
	};

	const listItemData = activityData
		? [
				{
					value: formatTime(
						activityData.activityStartTime,
						activityData.activityEndTime,
					),
				},
				{ value: activityData.address },
				{ value: activityData.location },
			]
		: [];

	const backPage = () => {
		router.back();
	};

	const goPayment = () => {
		const { name, email, mobile } = formValue;
		const paymentForm = {
			activityId: id,
			count: quantity,
			name,
			email,
			mobile,
		};
		dispatch(paymentRegistration(paymentForm));
	};

	useEffect(() => {
		const { name, email, mobile } = formValue;
		const allFieldsFilled = name && email && mobile;
		const noErrors = !errors.name && !errors.email && !errors.mobile;
		setIsDisabled(!(allFieldsFilled && noErrors));
	}, [formValue, errors]);

	useEffect(() => {
		if (id) {
			activity.getActivityDetail(id).then((res: any) => {
				setActivityData(res.data);
				setMounted(true);
			});
		}
	}, []);

	useEffect(() => {
		if (data && data.html && success) {
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = data.html;
			document.body.appendChild(tempDiv);

			const form = tempDiv.querySelector("form");
			if (form) {
				form.submit();
			}
		}
	}, [data, success]);

	return (
		<StepperLayout>
			{mounted && (
				<Box>
					<Card
						sx={{
							margin: "auto",
							bgcolor: "#ffffff",
							borderRadius: "12px",
							mt: 3,
							boxShadow: "none",
						}}
					>
						<CardContent sx={{ px: 5, py: 4 }}>
							<Typography
								variant="h6"
								component="div"
								sx={{ mb: 5, fontSize: 28 }}
							>
								請填寫付款人資訊
							</Typography>
							<Box display="flex" flexDirection="column">
								<Box mb={5}>
									<TextField
										required
										id="outlined-required"
										label="姓名"
										name="name"
										value={formValue.name}
										placeholder="必填項目"
										fullWidth
										InputProps={{
											style: {
												borderRadius: "10px",
											},
										}}
										onChange={handleChange}
										error={!!errors.name}
										helperText={errors.name}
									/>
								</Box>
								<Box mb={5}>
									<TextField
										required
										id="outlined-required"
										label="電子郵件"
										name="email"
										value={formValue.email}
										placeholder="必填項目"
										fullWidth
										InputProps={{
											style: {
												borderRadius: "10px",
											},
										}}
										onChange={handleChange}
										error={!!errors.email}
										helperText={errors.email}
									/>
								</Box>
								<Box mb={5}>
									<TextField
										required
										id="outlined-required"
										label="行動電話"
										name="mobile"
										value={formValue.mobile}
										placeholder="必填項目"
										fullWidth
										InputProps={{
											style: {
												borderRadius: "10px",
											},
										}}
										onChange={handleChange}
										error={!!errors.mobile}
										helperText={errors.mobile}
									/>
								</Box>
							</Box>
						</CardContent>
					</Card>
					<Card
						sx={{
							margin: "auto",
							bgcolor: "#FFFFFF",
							borderRadius: "12px",
							mt: 3,
							boxShadow: "none",
						}}
					>
						<CardContent sx={{ px: 5, py: 4 }}>
							<Typography variant="h6" component="div" sx={{ mb: 5 }}>
								活動明細
							</Typography>
							<Box>
								<Typography
									sx={{ fontSize: 24, color: "#24282D", fontWeight: 700 }}
								>
									{activityData.title}
								</Typography>
								<Box sx={{ my: 3 }}>
									{listItemData.map((item, index) => (
										<ListItem
											key={index}
											sx={{
												color: "#74777D",
												marginBottom: 1,
												p: 0,
												lineHeight: 1,
												display: "flex",
												alignItems: "center",
											}}
										>
											{typeof item.value === "string" ? (
												<ListItemText
													primary={item.value}
													primaryTypographyProps={{ fontSize: 16 }}
													sx={{ m: 0 }}
												/>
											) : (
												item.value
											)}
										</ListItem>
									))}
								</Box>
							</Box>
							<Box display="flex" justifyContent="space-between" mb={3}>
								<Typography
									sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
								>
									單價
								</Typography>
								<Typography
									variant="body2"
									component="div"
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										fontSize: 28,
									}}
								>
									NT$ {activityData.price}
								</Typography>
							</Box>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								mb={3}
							>
								<Typography
									sx={{
										fontSize: 24,
										color: "#74777D",
										mb: 1,
										fontWeight: 700,
									}}
								>
									數量
								</Typography>
								<Box display="flex" alignItems="center">
									<Box sx={{ width: 68, fontSize: 28, textAlign: "center" }}>
										{quantity}
									</Box>
								</Box>
							</Box>
							<Divider />
							<Box
								display="flex"
								alignItems="center"
								justifyContent="space-between"
								mt={3}
							>
								<Typography
									sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
								>
									總金額
								</Typography>
								<Typography
									variant="h6"
									component="div"
									sx={{ mt: 1, fontSize: 28 }}
								>
									NT$ {activityData.price * quantity}
								</Typography>
							</Box>
						</CardContent>
						<Box px={5} pb={4} pt={1} display="flex" justifyContent="flex-end">
							<Button
								variant="contained"
								sx={{
									bgcolor: "#E1E2E9",
									color: "#22252A",
									mr: 3,
									boxShadow: "none",
									py: 0.6,
								}}
								onClick={backPage}
							>
								上一步
							</Button>
							<Button
								variant="contained"
								color="primary"
								sx={{ boxShadow: "none", py: 0.6 }}
								onClick={goPayment}
								disabled={isDisabled}
							>
								確定付款
							</Button>
						</Box>
					</Card>
				</Box>
			)}
		</StepperLayout>
	);
}

function WrappedDetailsPage() {
	return (
		<Suspense fallback={<CircularLoading />}>
			<Details />
		</Suspense>
	);
}

export default WrappedDetailsPage;
