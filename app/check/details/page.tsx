"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
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
import { format, parseISO } from "date-fns";
import StepperLayout from "@/components/layout/PaymentLayout/StepperLayout";
import { paymentRegistration } from "@/features/payments/paymentsSlice";
import { USER_T0KEN_COOKIE, getCookie } from "@/utils/cookieHandler";

const mockData = {
	data: {
		_id: "xxxx64563801ba8f24d555c45",
		title: "跑山幫越野跑訓練營",
		subtitle: "象山夜跑",
		address: "台灣台北市臺北市信義區信義路5段152號",
		location: "象山捷運站2號出口",
		region: "北部",
		activityLinks: [
			{
				name: "活動詳情",
				url: "https://example.com/event-details",
			},
			{
				name: "相關介紹",
				url: "https://example.com/info",
			},
		],
		activityDetail:
			"<p>為什麼說是攀爬吃到飽呢？因為只有從玉里商店起登的頭5分鐘是樓梯步道，之後到稜線上全程都是各種攀爬路段！/n五寮尖，考驗你的體力耐力肌力，攀登當下就是四肢並用的即興創作阿~加上五寮尖只有稜線比較曬，其他路段樹蔭遮蔽居多，對於追求刺激、訓練體能、五寮尖是一個很值得一刷再刷的好點！里程｜約6公里</p><p>海拔｜639公尺高</p><p>行徑時間｜08:45-15:45，費時約7小時（含休息），共走了13809步。</p>",
		activityNote:
			"1.至少準備2000ml的水。/n2.建議戴手套。/n3.穿登山鞋或紋路較深的運動鞋。/n4.正餐零食，依個人喜好決定。/n5.鹽糖或是運動飲料，可預防抽筋。/n6.防曬用品／衛生紙／毛巾",
		activityTags: ["運動", "登山", "越野跑"],
		activityImageUrls: ["xxx", "xxx"],
		price: 500,
		activitySignupStartTime: "2024-03-09T10:00:00.000Z",
		activitySignupEndTime: "2024-03-30T10:02:00.000Z",
		activityStartTime: "2024-04-09T10:00:00.000Z",
		activityEndTime: "2024-04-09T10:02:00.000Z",
		bookedCapacity: 12,
		remainingCapacity: 10,
		organizer: {
			organizerId: "abb4563801ba8f24d555c45",
			name: "跑山幫",
			imageUrl: "",
			rating: 4.5,
			socialMediaUrls: {
				fbUrl: "https://www.facebook.com/KailasTaiwan/",
				igUrl: "https://www.instrgram.com/KailasTaiwan/",
			},
		},
		isLiked: true,
	},
};

const dayOfWeekMap = {
	Monday: "週一",
	Tuesday: "週二",
	Wednesday: "週三",
	Thursday: "週四",
	Friday: "週五",
	Saturday: "週六",
	Sunday: "週日",
};

function Details() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState({
		name: "",
		email: "",
		mobile: "",
	});
	const searchParams = useSearchParams();
  const id = searchParams?.get('id');

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValue({
			...formValue,
			[name]: value,
		});
	};

	const formatTime = (startTime: string, endTime = "") => {
		const startDateTime = parseISO(startTime);
		const endDateTime = endTime ? parseISO(endTime) : null;

		// 生成英文格式的日期時間字串
		const formattedStartTime = format(startDateTime, "yyyy/MM/dd iiii HH:mm");
		const formattedEndTime = endDateTime ? format(endDateTime, "HH:mm") : null;

		// 分割日期和星期，轉換星期至中文
		const [date, dayOfWeek, startTimeOnly] = formattedStartTime.split(" ");
		const dayOfWeekChinese = dayOfWeekMap[dayOfWeek];

		const timezoneOffset = new Date().getTimezoneOffset() / -60;
		const timezoneFormat =
			timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;

		return formattedEndTime
			? `${date} ${dayOfWeekChinese} ${startTimeOnly} - ${formattedEndTime} (GMT${timezoneFormat})`
			: `${date} ${dayOfWeekChinese} ${startTimeOnly}`;
	};

	const listItemData = [
		{
			value: formatTime(
				mockData.data.activityStartTime,
				mockData.data.activityEndTime,
			),
		},
		{ value: mockData.data.address },
	];

	const backPage = () => {
		router.back();
	};

	const goPayment = () => {
		const { name, email, mobile } = formValue;
		const paymentForm = {
			activityId: id,
			name,
			email,
			mobile,
		};
		dispatch(paymentRegistration(paymentForm));
	};

	return (
		<StepperLayout>
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
					<Typography variant="h6" component="div" sx={{ mb: 5, fontSize: 28 }}>
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
							跑山幫越野跑訓練營
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
							NT$ 500
						</Typography>
					</Box>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mb={3}
					>
						<Typography
							sx={{ fontSize: 24, color: "#74777D", mb: 1, fontWeight: 700 }}
						>
							數量
						</Typography>
						<Box display="flex" alignItems="center">
							<Box sx={{ width: 68, fontSize: 28, textAlign: "center" }}>2</Box>
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
							NT$ 1000
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
					>
						確定付款
					</Button>
				</Box>
			</Card>
		</StepperLayout>
	);
}

export default Details;
