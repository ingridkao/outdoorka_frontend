"use client";

import { useState, useEffect, SyntheticEvent } from "react";
import NextLink from "next/link";
import { TicketState } from "@/types/TicketType";
import axios from "@/plugins/api/axios";
import { parstTicketStatus, sortTimeData } from "@/utils/dateHandler";

import {
	Box,
	Paper,
	Unstable_Grid2 as Grid,
	Typography,
	Button,
	IconButton,
	Select,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import CardActivity from "@/components/ui/card/CardActivity";
import Loading from "@/components/ui/loading/loading";
import NoData from "@/components/ui/shared/NoData";
import SortIcon from "@/components/icon/SortIcon";
import ListSearchHeader from "@/components/ui/shared/ListSearchHeader";

import { ActivityState } from "@/types/ActivitiesType";

function Favorites() {
	const { favorite } = axios;
	const theme = useTheme();
	const [load, setLoad] = useState(true);
	const [source, setSource] = useState<ActivityState[]>([]);
	const [displayList, setDisplayList] = useState<ActivityState[]>([]);
	const [sortValue, setSortValue] = useState("");
	const [ascValue, setAscValue] = useState(true);
	const [searchValue, setSearchValue] = useState("");

	const [displayActivityTags, setDisplayActivityTags] = useState<[]>([]);
	const [displayRegion, setDisplayRegion] = useState<[]>([]);

	// const updateDisplayStatus = (type: number | null = null) => {
	// 	if (type === null) {
	// 		setDisplayList(source);
	// 	} else {
	// 		const filterList = source.filter((favoriteItem:ActivityState) => favoriteItem.status === type);
	// 		setDisplayList(filterList);
	// 	}
	// };

	const handleSelectChange = (event: SelectChangeEvent) => {
		setSortValue(event.target.value as string);
	};

	const handleSort = (event: SyntheticEvent) => {
		event.preventDefault();
		setAscValue(!ascValue);
		let filterList = [];
		if (sortValue === "activityStartTime" || sortValue === "activityEndTime") {
			filterList = sortTimeData(source, sortValue, ascValue);
		} else {
			filterList = source.sort((a: any, b: any) => {
				return ascValue
					? a[sortValue] - b[sortValue]
					: b[sortValue] - a[sortValue];
			});
		}
		setDisplayList(filterList);
	};

	const handleSearchChange = (searchInput: string) => {
		setSearchValue(searchInput);
		if (searchInput === "") {
			setDisplayList(source);
		} else {
			const filterList = source.filter((favoriteItem: ActivityState) => {
				return favoriteItem.subtitle.includes(searchInput);
			});
			setDisplayList(filterList);
		}
	};

	useEffect(() => {
		async function loadData() {
			setLoad(true);
			try {
				const responseBody = await favorite.getFavoritesList();
				if (responseBody && responseBody.data) {
					const parseData = responseBody.data.likedList.map(
						(favoriteItem: ActivityState) => {
							return {
								...favoriteItem,
								isLike: true,
							};
						},
					);
					setSource(parseData);
					setDisplayList(parseData);

					const parseActivityTags = responseBody.data.activityTags;
					setDisplayActivityTags(parseActivityTags);

					const parseRegion = responseBody.data.region;
					setDisplayRegion(parseRegion);
				}
			} catch (error: any) {
				if (error?.status == 404) {
					setSource([]);
				} else {
					console.error(String(error?.message));
				}
			}
			setLoad(false);
		}
		loadData();
	}, []);

	if (load) return <Loading />;

	return (
		<PageLayout>
			<Grid container sx={{ width: "100%", m: "auto", gap: 5 }}>
				<Grid
					sx={{
						display: { xs: "none", lg: "block" },
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
							onClick={() => updateDisplayStatus()}
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
							類別標籤
						</Typography>

						{displayActivityTags?.map((value, index) => (
							<Button
								key={index}
								variant="outlined"
								size="small"
								onClick={() => updateDisplayStatus(1)}
							>
								{value}
							</Button>
						))}
						{/* <Button
							variant="outlined"
							size="small"
							onClick={() => updateDisplayStatus(1)}
						>
							已報名
						</Button>
						<Button
							variant="outlined"
							size="small"
							onClick={() => updateDisplayStatus(0)}
						>
							已使用
						</Button> */}
					</Paper>

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
							地區
						</Typography>

						{displayRegion?.map((value, index) => (
							<Button
								key={index}
								variant="outlined"
								size="small"
								onClick={() => updateDisplayStatus(1)}
							>
								{value}
							</Button>
						))}
					</Paper>
				</Grid>

				<Grid xs sx={{ maxWidth: "1440px" }}>
					<ListSearchHeader
						title={"追蹤活動清單"}
						subTitle={"來看看你的活動清單！"}
						search={searchValue}
						onSearch={handleSearchChange}
					/>

					<Box
						width="100%"
						display="inline-flex"
						justifyContent="flex-end"
						alignItems="center"
					>
						<Box>
							排序方法：
							<Select
								defaultValue={"activityStartTime"}
								onChange={handleSelectChange}
							>
								<MenuItem value={"activityStartTime"}>活動開始日期</MenuItem>
								<MenuItem value={"activityEndTime"}>活動結束日期</MenuItem>
								<MenuItem value={"bookedCapacity"}>參與人數</MenuItem>
							</Select>
						</Box>
						<IconButton aria-label="排序" onClick={handleSort}>
							<SortIcon />
						</IconButton>
					</Box>

					<Box sx={{ mt: 2 }}>
						{displayList.length === 0 && <NoData target="活動" />}

						<Grid
							container
							rowSpacing={4}
							columnSpacing={{ xs: 0, sm: 1, md: 5 }}
							justifyContent="flex-start"
						>
							{displayList?.map((value) => (
								<Grid key={value._id} xs={12} sm={6} md={4}>
									<Box component={NextLink} href={`/activity/${value._id}`}>
										<CardActivity
											home={false}
											activity={{
												title: value.subtitle,
												location: `${value.region} ${value.city}`,
												startTime: value.activityStartTime,
												endTime: value.activityEndTime,
												photo: value.activityImageUrls[0],
												avatar: value.organizer?.photo,
												name: value.organizer?.name,
												rating: value.organizer?.rating,
												capacity: value.bookedCapacity,
												likers: value.likers,
												isLike: value.isLike,
												_id: value._id,
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

export default Favorites;
