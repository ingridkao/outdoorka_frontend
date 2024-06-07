"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import {
	Box,
	Paper,
	Unstable_Grid2 as Grid,
	Typography,
	Button,
	Input,
	Select,
	MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import CardTicket from "@/components/ui/shared/CardTicket";
import NoData from "@/components/ui/shared/NoData";
import { TicketState } from "@/types/TicketType";

const ticketList = [
	{
		_id: "664cb717ae8e74de4ae74872",
		ticketStatus: 1,
		organizer: {
			_id: "664ca866ae10d7e7604c4fe7",
			name: "山旅行",
			photo: "https://static.accupass.com/org/2304041722089876493900.jpg",
			rating: 4,
		},
		subtitle: "新手釣魚團-北海岸淺水灣紅燈防波堤釣點",
		region: "北部",
		city: "新北市",
		activityImageUrls: [
			"https://media.istockphoto.com/id/1367438696/photo/cute-redhead-boy-and-grandfather-fishing-in-the-river-in-quebec.jpg?s=612x612&w=0&k=20&c=34JDzuhY4Nlt5sHonFWh8ZAiUdHyybCCv44BhNtzvEw=",
			"https://media.istockphoto.com/id/841837302/photo/fishing.jpg?s=612x612&w=0&k=20&c=Fge9dv6z5JA6r_dKSdKPQNpgm9geb7O58N8xAs8ZGYo=",
			"https://media.istockphoto.com/id/1322104405/photo/father-and-son-fishing-together-at-the-lake.jpg?s=612x612&w=0&k=20&c=B6z3DZXUzb4R47z0d4Sj5ijICnDXCORU0vJhWh9ci4o=",
		],
		activityStartTime: "2024-07-20T00:00:00.537Z",
		activityEndTime: "2024-07-20T10:00:00.000Z",
		bookedCapacity: 2,
	},
	{
		_id: "664cb717ae8e74de4ae74873",
		ticketStatus: 1,
		organizer: {
			_id: "664ca866ae10d7e7604c4fe7",
			name: "山旅行",
			photo: "https://static.accupass.com/org/2304041722089876493900.jpg",
			rating: 4,
		},
		subtitle: "【台北抹茶山】小觀音山群峰 - 台灣秘境",
		region: "北部",
		city: "新北市",
		activityImageUrls: [
			"https://media.istockphoto.com/id/485047386/photo/rain-forest-destruction-in-thailand.jpg?s=612x612&w=0&k=20&c=odWj17N1BKshrr1As2sHZj8INMlGpNJ01C8oX2_9hg8=",
			"https://media.istockphoto.com/id/1369572597/photo/beautiful-tea-plantations-in-hills-chiang-mai-province-thailand.jpg?s=612x612&w=0&k=20&c=NpuC9mRwy2obTmM9Hqb6pdMr8Xzhwug69IbHo0BfF80=",
			"https://media.istockphoto.com/id/936459540/photo/scenic-landscape-view-of-tea-plantations.jpg?s=612x612&w=0&k=20&c=dTRB6TQ1hg9WFvpKZPpqiTZhui9Kb-ImabOrSuHXHBc=",
		],
		activityStartTime: "2024-07-19T20:00:00.537Z",
		activityEndTime: "2024-07-20T14:00:00.000Z",
		bookedCapacity: 4,
	},
	{
		_id: "664cb717ae8e74de4ae74874",
		ticketStatus: 0,
		organizer: {
			_id: "664caee7ae10d7e7604c4feb",
			name: "拼圖戶外生活",
			photo: "https://static.accupass.com/org/2005260527172844358540.jpg",
			rating: 5,
		},
		subtitle: "野營課程｜合歡越嶺古道 兩天兩夜 十月場",
		region: "中部",
		city: "南投縣",
		activityImageUrls: [
			"https://media.istockphoto.com/id/654798826/photo/rice-terrace-and-hut-on-the-mountain-hill-above-the-clouds-with-sea-of-mist-fog-in-chiangmai.jpg?s=612x612&w=0&k=20&c=SMsEuxPF7WcRjCcmJ4oFnywdHxzUhJRfxvvRFBxmZew=",
			"https://media.istockphoto.com/id/1399922474/photo/sri-lanka-mountains-with-green-tea-fields-and-village-nuwara-eliya-mountain-region.jpg?s=612x612&w=0&k=20&c=GQ-HxjSRY3Da3hDS0LI7GsGD2zKMHwfNWJ9Q7zEtZxo=",
			"https://media.istockphoto.com/id/868389606/photo/soybean-field-ripening-on-mountain-and-stone-agricultural-landscape.jpg?s=612x612&w=0&k=20&c=Q_Bg1bFTjd7ZIbR2iGLp3OXMPFH7AmTO7zR-qeLV3yo=",
		],
		activityStartTime: "2024-07-13T00:00:00.537Z",
		activityEndTime: "2024-07-15T10:00:00.000Z",
		bookedCapacity: 6,
	},
	{
		_id: "664cb717ae8e74de4ae74878",
		ticketStatus: 0,
		organizer: {
			_id: "664ca866ae10d7e7604c4fe7",
			name: "山旅行",
			photo: "https://static.accupass.com/org/2304041722089876493900.jpg",
			rating: 4,
		},
		subtitle: "南橫三星｜初級百岳入門 一覽南橫風光",
		region: "南部",
		city: "台東縣",
		activityImageUrls: [
			"https://media.istockphoto.com/id/488523356/photo/rice-fields-on-terrace-at-sapa-lao-cai-vietnam.jpg?s=612x612&w=0&k=20&c=jColRf2i87WpfL9x-AbbJZrd7dVpiR8wJPzFKtWoFiE=",
			"https://media.istockphoto.com/id/1751697898/photo/mountain-scenery-in-northern-vietnam.jpg?s=612x612&w=0&k=20&c=8AUbFUkifLSn7g52qSOWJ4wnRC315pdkKD3sUsnHx1U=",
			"https://media.istockphoto.com/id/1053280276/photo/top-of-khalid-nabi.jpg?s=612x612&w=0&k=20&c=O1Zl64nHdEQUni9lbiN2INTYkEbPfvs1ta4qQhP89C4=",
		],
		activityStartTime: "2024-06-22T00:00:00.537Z",
		activityEndTime: "2024-06-25T10:00:00.000Z",
		bookedCapacity: 16,
	},
	{
		_id: "664cb717ae8e74de4ae74879",
		ticketStatus: 0,
		organizer: {
			_id: "664caee7ae10d7e7604c4feb",
			name: "拼圖戶外生活",
			photo: "https://static.accupass.com/org/2005260527172844358540.jpg",
			rating: 5,
		},
		subtitle: "玉山主峰｜台灣人必做的事",
		region: "中部",
		city: "南投縣",
		activityImageUrls: [
			"https://media.istockphoto.com/id/697204538/photo/hatton-estate.jpg?s=612x612&w=0&k=20&c=IJO38tUQGppV7cKUuJkWK6NFK9IVcbxbr6HPiN-OQOo=",
			"https://media.istockphoto.com/id/880860764/photo/terraced-green-rice-fields-around-sa-pa-vietnam.jpg?s=612x612&w=0&k=20&c=kotxgMcWvM_2mEIIt7xd1xJUuKvFOMkGtR-GW6rCZQs=",
			"https://media.istockphoto.com/id/936442902/photo/scenic-landscape-view-of-tea-plantations.jpg?s=612x612&w=0&k=20&c=oRoeD4Wchsm8n54jJbk6ICjqS4zc3JBQ2XyWGV9x-vc=",
		],
		activityStartTime: "2024-06-15T00:00:00.537Z",
		activityEndTime: "2024-06-20T10:00:00.000Z",
		bookedCapacity: 15,
	},
];
function Tickets() {
	const theme = useTheme();
	const [displayList, setDisplayList] = useState<TicketState[]>([]);
	const updateDisplayData = (type: number | null = null) => {
		if (type === null) {
			setDisplayList(ticketList);
		} else {
			const filterList = ticketList.filter(
				(item) => item.ticketStatus === type,
			);
			setDisplayList(filterList);
		}
	};
	useEffect(() => {
		setDisplayList(ticketList);
		// updateDisplayData()
	}, []);
	return (
		<PageLayout>
			<Grid container spacing={5}>
				<Grid
					sx={{ 
						display: { xs: "none", lg: "block"},
						minWidth: "320px",
					}}
				>
					<Box
						width="100%"
						display="inline-flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="h6"
							sx={{
								color: theme.palette.text.primary,
							}}
						>
							篩選條件
						</Typography>
						<Button
							variant="contained"
							color="tertiary"
							size="small"
							onClick={() => updateDisplayData()}
						>
							<DeleteOutlineIcon />
							<span>清除篩選</span>
						</Button>
					</Box>
					<Paper
						variant="elevation"
						square={false}
						sx={{
							minWidth: 15,
							mt: 3,
							p: 3,
						}}
					>
						<Typography
							sx={{
								color: theme.palette.text.primary,
								mb: 2,
							}}
						>
							票卷類型
						</Typography>
						<Button
							variant="outlined"
							size="small"
							onClick={() => updateDisplayData(1)}
						>
							已報名
						</Button>
						<Button
							variant="outlined"
							size="small"
							onClick={() => updateDisplayData(0)}
						>
							已使用
						</Button>
					</Paper>
				</Grid>

				<Grid xs sx={{maxWidth: "1440px"}}>
					{/* TODO 拆組件 */}
					<Box
						sx={{
							width: "100%",
							mb: 2,
							color: theme.palette.text.primary,
							background:
								"linear-gradient(270deg, rgba(196, 221, 255, 0.18) 0%, #C4DDFF 100%)",
							borderRadius: "48px",
							p: 5,
						}}
					>
						<Typography
							variant="h4"
							sx={{
								color: theme.palette.text.primary,
							}}
						>
							票卷列表
						</Typography>
						<Typography
							sx={{
								color: theme.palette.text.disabled,
							}}
						>
							你的票卷清單已準備好囉！
						</Typography>
						<Box className="search" sx={{ mt: "24px" }}>
							<Input
								disableUnderline={true}
								placeholder="縱走、浮潛、奇美博物館、陽明山"
								onChange={() => {}}
							/>
							<Button variant="contained">
								<SearchIcon />
							</Button>
						</Box>
					</Box>

					<Box
						width="100%"
						display="inline-flex"
						justifyContent="flex-end"
						alignItems="center"
					>
						<Box>
							排序方法：
							<Select defaultValue={0}>
								<MenuItem value={0}>活動日期</MenuItem>
								<MenuItem value={1}>參與人數</MenuItem>
							</Select>
						</Box>
						<Button>sort</Button>
					</Box>

					<Box sx={{mt: 2,}}>
						<Grid
							container
							rowSpacing={4}
							columnSpacing={{ xs: 0, sm: 1, md: 5 }}
							justifyContent="flex-start"
						>
							{displayList.length === 0 && <NoData target="票卷" />}
							{displayList?.map((value) => (
								<Grid key={value._id} xs={12} sm={6} md={4}>
									<Box component={NextLink} href={`/ticket/${value._id}`}>
										<CardTicket
											type="lg"
											tickets={{
												title: value.subtitle,
												location: `${value.region} ${value.city}`,
												startTime: value.activityStartTime,
												endTime: value.activityEndTime,
												photo: value.activityImageUrls[0],
												avatar: value.organizer.photo,
												name: value.organizer.name,
												rating: value.organizer.rating,
												capacity: value.bookedCapacity,
												status: value.ticketStatus,
											}}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>

				</Grid>
			</Grid>
		</PageLayout>
	);
}

export default Tickets;
