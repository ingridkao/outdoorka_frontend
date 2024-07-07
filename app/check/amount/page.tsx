"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Divider,
	Button,
	Card,
	CardContent,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HikingIcon from "@/components/icon/hikingIcon";
import PlusIcon from "@/components/icon/plusIcon";
import MinusIcon from "@/components/icon/minusIcon";
import StepperLayout from "@/components/layout/PaymentLayout/StepperLayout";
import CircularLoading from "@/components/ui/loading/CircularLoading";

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
		activitySignupStartTime: "2024-05-01T10:00:00.000Z",
		activitySignupEndTime: "2024-06-30T10:02:00.000Z",
		activityStartTime: "2024-06-30T10:00:00.000Z",
		activityEndTime: "2024-06-30T10:02:00.000Z",
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
	{ value: mockData.data.location },
];

function Amount() {
	const [quantity, setQuantity] = useState(2);
	const router = useRouter();
	const unitPrice = 500;
	const totalPrice = unitPrice * quantity;
	const searchParams = useSearchParams();
  const id = searchParams?.get('id');

	// 增加商品数量
	const handleIncrease = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	// 減少商品数量
	const handleDecrease = () => {
		setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
	};

	const paragraphs = (activityNote: string) =>
		activityNote.split("/n").map((line: string, index: number) => (
			<ListItem
				key={index}
				sx={{
					color: "#74777D",
					marginBottom: 1,
					p: 0,
					lineHeight: 1,
					fontSize: 16,
				}}
			>
				<ListItemText primary={line} sx={{ m: 0 }} />
			</ListItem>
		));

	const paragraphsNote = (activityDetail: string) => {
		// 將<p>標籤內容提取出來，並將/n替換為<br />
		const paragraphs = activityDetail
			.split(/<\/?p>/)
			.filter((text: string) => text.trim() !== "");
		return paragraphs.map((paragraph, index) => {
			const lines = paragraph.split("/n").map((line, lineIndex) => (
				<React.Fragment key={lineIndex}>
					{line}
					{lineIndex < paragraph.split("/n").length - 1 && <br />}
				</React.Fragment>
			));

			return (
				<Typography
					key={index}
					variant="body1"
					paragraph
					sx={{ color: "#74777D" }}
				>
					{lines}
				</Typography>
			);
		});
	};

	const backPage = () => {
		router.back();
	};

	const nextPage = () => {
		router.push(`/check/details?id=${id}`);
	};

	return (
		<StepperLayout>
			<Paper
				elevation={0}
				sx={{
					backgroundColor: "#EDF1F9",
					borderRadius: "25px",
					padding: 5,
					mb: 3,
				}}
			>
				<Box
					mb="24px"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
				>
					<List sx={{ padding: 0, display: "flex", alignItems: "center" }}>
						{mockData.data.activityTags.map((detail, index) => (
							<ListItem
								key={index}
								sx={{
									mr: 2,
									backgroundColor: "#D1E4FF",
									borderRadius: "8px",
									color: "#001D36",
									px: "12px",
									py: "6px",
									textAlign: "center",
									width: "auto",
								}}
							>
								<ListItemText
									primary={detail}
									sx={{ m: 0, fontSize: 14, lineHeight: 1 }}
								/>
							</ListItem>
						))}
					</List>
					<Box display="flex" alignItems="center">
						<Box display="flex" alignItems="center">
							<HikingIcon />
							<Box ml="8px" mr="24px" fontWeight="500" color="#74777D">
								{mockData.data.bookedCapacity}人已參加
							</Box>
						</Box>
					</Box>
				</Box>
				<Typography
					variant="h3"
					component="h3"
					sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
				>
					{mockData.data.subtitle}
				</Typography>
				<Typography
					variant="h2"
					component="h2"
					sx={{ fontSize: 44, color: "#22262C", mb: 3, fontWeight: 700 }}
				>
					{mockData.data.title}
				</Typography>
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
			</Paper>
			<Paper
				elevation={0}
				sx={{ p: 5, backgroundColor: "#EDF1F9", mb: 3, color: "#24282D" }}
			>
				<Typography variant="h6" sx={{ marginBottom: 2, fontSize: 24 }}>
					聯絡須知
				</Typography>
				<Typography variant="body1" sx={{ lineHeight: 1.5 }}>
					謝謝您，你應該先報名完成一堂打包課再報名下一堂。為保障消費者權益及社群活動品質，同一場合同時只能報名一堂課，透過多層驗證系統確保，購買屬於專打，系統將保留您一堂課單，取消其餘未報名完成之課單，敬請理解配合。
				</Typography>
			</Paper>
			<Accordion
				elevation={0}
				sx={{
					borderRadius: 1.5,
					border: 0,
					p: "42px 40px",
					backgroundColor: "#EDF1F9",
					boxShadow: "none",
					"&::before": { display: "none" },
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2-content"
					id="panel2-header"
					sx={{
						fontSize: 24,
						fontWeight: 700,
					}}
				>
					活動簡介
				</AccordionSummary>
				<AccordionDetails>
					{paragraphsNote(mockData.data.activityDetail)}
					<List sx={{ padding: 0 }}>
						{paragraphs(mockData.data.activityNote)}
					</List>
				</AccordionDetails>
			</Accordion>
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
						請填寫報名數量
					</Typography>
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
							NT$ {unitPrice}
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
							<IconButton
								onClick={handleDecrease}
								sx={{
									mb: 0,
								}}
							>
								<MinusIcon />
							</IconButton>
							<Box sx={{ width: 68, fontSize: 28, textAlign: "center" }}>
								{quantity}
							</Box>
							<IconButton
								disabled={quantity >= 10}
								onClick={handleIncrease}
								sx={{
									mb: 0,
								}}
							>
								<PlusIcon />
							</IconButton>
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
							NT$ {totalPrice}
						</Typography>
					</Box>
				</CardContent>
				<Box px={5} pb={4} pt={1} display="flex" justifyContent="flex-end">
					<Button
						variant="contained"
						size="medium"
						sx={{
							bgcolor: "#E1E2E9",
							color: "#22252A",
							mr: 3,
							boxShadow: "none",
						}}
						onClick={backPage}
					>
						返回
					</Button>
					<Button
						variant="contained"
						size="medium"
						color="primary"
						sx={{ boxShadow: "none" }}
						onClick={nextPage}
					>
						下一步: 付款資料
					</Button>
				</Box>
			</Card>
		</StepperLayout>
	);
}

function WrappedAmountPage() {
	return (
		<Suspense fallback={<CircularLoading />}>
			<Amount />
		</Suspense>
	);
}

export default WrappedAmountPage;
