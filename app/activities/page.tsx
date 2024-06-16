"use client";

import PageLayout from "@/components/layout/MainLayout/PageLayout";
import Loading from "@/components/ui/loading/loading";
import CardActivity from "@/components/ui/card/CardActivity";
import axios from "@/plugins/api/axios";
import { ActivityState } from "@/types";
import {
	faMagnifyingGlass,
	faStar,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Box,
	Button,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FilteredBox = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(3),
	borderRadius: "8px",
	boxShadow: "none",
}));
const FilteredTitle = styled(Typography)(() => ({
	color: "#44474C",
	marginBottom: "16px",
}));
const CustomSelect = styled(Select)(() => ({
	fontSize: 16,
	borderRadius: "4px",
	color: "#22262C",
	letterSpacing: 0.5,
	"& .MuiOutlinedInput-root": {
		borderRadius: "4px",
	},
}));

function Activities() {
	const theme = useTheme();
	const { activity } = axios;

	const [activityList, setActivityList] = useState<ActivityState[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadData() {
			try {
				const responseBody = await activity.getActivitiesList();
				if (responseBody && responseBody.data) {
					setActivityList(responseBody.data);
				}
			} catch (error) {
				setError("Failed to fetch data: " + String(error));
			}
		}
		loadData();
	}, []);

	return (
		<PageLayout>
			<Grid container spacing={5}>
				<Grid item lg={2} xs={3} columnSpacing={2}>
					<Typography
						variant="h6"
						sx={{ color: theme.palette.text.primary, fontWeight: 700, mb: 3 }}
					>
						篩選條件
					</Typography>

					<Stack spacing={1}>
						<FilteredBox>
							<FilteredTitle variant="body1">活動時間</FilteredTitle>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
									<DatePicker
										name="startTime"
										label="開始日期"
										format="YYYY/MM/DD"
										sx={{ fontSize: 2, borderRadius: "4px !important" }}
									/>
									<DatePicker
										name="endTime"
										label="結束日期"
										format="YYYY/MM/DD"
										sx={{ fontSize: 2, borderRadius: "4px" }}
									/>
								</Box>
							</LocalizationProvider>
						</FilteredBox>

						<Tag />

						<FilteredBox>
							<FilteredTitle variant="body1">地區</FilteredTitle>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<FormControl fullWidth>
										<FormControlLabel control={<Checkbox />} label="北部" />
										<FormControlLabel control={<Checkbox />} label="中部" />
										<FormControlLabel control={<Checkbox />} label="南部" />
									</FormControl>
								</Grid>
								<Grid item xs={6}>
									<FormControl fullWidth>
										<FormControlLabel control={<Checkbox />} label="東部" />
										<FormControlLabel control={<Checkbox />} label="離島" />
									</FormControl>
								</Grid>
							</Grid>
						</FilteredBox>

						<FilteredBox
							sx={{ display: "flex", flexDirection: "column", gap: 4 }}
						>
							<Box>
								<FilteredTitle variant="body1">主揪評價</FilteredTitle>
								<FormControl fullWidth>
									<InputLabel id="rating-select-label" sx={{ fontSize: 16 }}>
										選擇星等
									</InputLabel>
									<CustomSelect
										labelId="rating-select-label"
										id="rating-select"
										label="選擇星等"
										// value={age}
										name="rating"
										// onChange={handleChange}
										MenuProps={{
											PaperProps: {
												sx: {
													borderRadius: "4px",
												},
											},
										}}
									>
										{starOptions.map((_, i) => (
											<MenuItem key={i} value={i} sx={{ gap: 0.5 }}>
												{Array(i + 1)
													.fill(null)
													.map((_, i) => (
														<FontAwesomeIcon
															key={`star-${i}`}
															icon={faStar}
															size="sm"
															color={theme.palette.secondary.main}
														/>
													))}
											</MenuItem>
										))}
									</CustomSelect>
								</FormControl>
							</Box>

							<Box>
								<FilteredTitle variant="body1">活動人數</FilteredTitle>
								<FormControl fullWidth>
									<InputLabel id="capacity-select-label" sx={{ fontSize: 16 }}>
										選擇人數
									</InputLabel>
									<CustomSelect
										labelId="capacity-select-label"
										id="capacity-select"
										name="capacity"
										// value={age}
										label="選擇人數"
										// onChange={handleChange}
										MenuProps={{
											PaperProps: {
												sx: {
													borderRadius: "4px",
												},
											},
										}}
									>
										{capacityOptions.map(({ value, label }, i) => (
											<MenuItem key={i} value={value} sx={{ fontSize: 16 }}>
												{label}
											</MenuItem>
										))}
									</CustomSelect>
								</FormControl>
							</Box>
						</FilteredBox>
					</Stack>
				</Grid>

				<Grid item lg={10} xs={9} columnSpacing={2}>
					<Paper
						sx={{
							borderRadius: "44px",
							background:
								"linear-gradient(90deg, rgba(196, 221, 255, 1), rgba(196, 221, 255, 0.18))",
							height: "272px",
							boxShadow: "none",
							p: 5,
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<Box>
							<Typography
								variant="h3"
								sx={{
									fontSize: "44px",
									fontWeight: 700,
									color: "#22252A",
									mb: 2,
								}}
							>
								探索活動
							</Typography>
							<Typography
								variant="body1"
								sx={{ color: "#44474C", fontWeight: 400 }}
							>
								找到屬於你最Chill的團！
							</Typography>
						</Box>

						<Box className="search">
							<Input
								disableUnderline={true}
								placeholder="縱走、浮潛、奇美博物館、陽明山"
								endAdornment={
									<InputAdornment position="end">
										<Button
											variant="text"
											sx={{
												backgroundColor: "#22252A",
												height: "56px",
												width: "56px",
												borderRadius: "100%",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												mr: "-8px",
												minWidth: 0,
												border: "none",
											}}
										>
											<FontAwesomeIcon
												icon={faMagnifyingGlass}
												color="#fff"
												size="sm"
											/>
										</Button>
									</InputAdornment>
								}
								sx={{ height: "72px" }}
								onChange={() => {}}
							/>
						</Box>
					</Paper>

					{/* <Box
						sx={{
							height: "48px",
							width: "100%",
							display: "flex",
							direction: "row",
							alignItems: "center",
							justifyContent: "end",
						}}
					>
						<Typography>排序方式：</Typography>
						<Select
							// value={age}
							// onChange={handleChange}
							displayEmpty
							inputProps={{ "aria-label": "Without label" }}
							sx={{
								fontSize: 16,
								borderRadius: "4px",
								color: "#22262C",
								letterSpacing: 0.5,
								"& .MuiOutlinedInput-root": {
									borderRadius: "4px",
								},
							}}
						>
							{sortOptions.map(({ value, label }, i) => (
								<MenuItem key={i} value={value}>
									{label}
								</MenuItem>
							))}
						</Select>
						<FontAwesomeIcon icon={faArrowDownShortWide} />
					</Box> */}

					<Grid container spacing={3} sx={{ mt: 3, width: "100%" }}>
						{activityList.length === 0 && <Loading />}
						{error && <div>Failed to load</div>}
						{activityList?.map((value: any) => (
							<Grid item xs={12} sm={6} md={4} key={value._id}>
								<CardActivity
									key={value._id}
									activity={{
										title: value.subtitle,
										location: `${value.region} ${value.city}`,
										date: value.activityEndTime,
										photo: value.activityImageUrls[0],
										avatar: "", // TODO: API response data 未回傳
										name: value.organzierName,
										rating: value.organizerRating,
										capacity: value.bookedCapacity,
										likers: value.likers,
									}}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</PageLayout>
	);
}

const Tag = () => {
	const theme = useTheme();
	const [tags, setTags] = useState<string[]>([]);

	const handleChange = (e: any) => {
		const { value } = e.target;
		setTags(typeof value === "string" ? value.split(",") : value);
	};

	const handleDelete = (tag: any) => () => {
		setTags((el) => el.filter((el: string) => el !== tag));
	};

	return (
		<FilteredBox>
			<FilteredTitle variant="body1">類別標籤</FilteredTitle>
			<Typography
				variant="body2"
				sx={{
					color: theme.palette.text.secondary,
					fontSize: 14,
					mb: tags.length > 0 ? 1 : 3,
					textAlign: tags.length > 0 ? "left" : "center",
				}}
			>
				{tags.length > 0 && "已選擇 "}
				{tags.length} 個標籤
			</Typography>
			{tags.length > 0 && (
				<Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
					{tags.map((el, i) => (
						<Chip
							key={i}
							label={el}
							sx={{ backgroundColor: "#D1E4FF", borderRadius: "4px" }}
							onDelete={handleDelete(el)}
							deleteIcon={
								<FontAwesomeIcon icon={faXmark} size="xs" color="#001D36" />
							}
						/>
					))}
				</Box>
			)}

			<FormControl fullWidth>
				<InputLabel id="tag-select-label">選擇標籤</InputLabel>
				<CustomSelect
					labelId="tag-select-label"
					id="tag-select"
					name="capacity"
					value={tags}
					label="選擇標籤"
					onChange={handleChange}
					MenuProps={{
						PaperProps: {
							sx: {
								borderRadius: "4px",
							},
						},
					}}
					multiple
				>
					{tagOptions.map((value, i) => (
						<MenuItem key={i} value={value} sx={{ fontSize: 16 }}>
							{value}
						</MenuItem>
					))}
				</CustomSelect>
			</FormControl>
		</FilteredBox>
	);
};

const starOptions = Array(5).fill(null);
const capacityOptions = [
	{
		value: "10",
		label: "1 - 10 人",
	},
	{
		value: "30",
		label: "11 - 30 人",
	},
	{
		value: "50",
		label: "31 - 50 人",
	},
	{
		value: "100",
		label: "51 - 100 人",
	},
	{
		value: "101",
		label: ">100 人",
	},
];
const sortOptions = [
	{
		value: "1",
		label: "日期",
	},
	{
		value: "2",
		label: "價格",
	},
	{
		value: "3",
		label: "人數",
	},
];
const tagOptions = ["登山", "路跑", "夏令營", "自由浮淺"];

export default Activities;
