"use client";

import { useState, useEffect, SyntheticEvent } from "react";
import axios from "@/plugins/api/axios";
import { sortTimeData } from "@/utils/dateHandler";

import {
	Box,
	Paper,
	Unstable_Grid2 as Grid,
	Typography,
	Button,
	IconButton,
	Select,
	MenuItem,
	SelectChangeEvent
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import CardActivity from "@/components/ui/card/CardActivity";
import ListLoading from "@/components/ui/loading/ListLoading";
import NoData from "@/components/ui/shared/NoData";
import SortIcon from "@/components/icon/SortIcon";
import ListSearchHeader from "@/components/ui/shared/ListSearchHeader";

import { FavoritesActivityState } from "@/types/ActivitiesType";

function Favorites() {
	const { favorite } = axios;
	const theme = useTheme();
	const [load, setLoad] = useState(true);
	const [source, setSource] = useState([]);
	const [displayList, setDisplayList] = useState([]);
	const [sortValue, setSortValue] = useState("");
	const [ascValue, setAscValue] = useState(true);
	const [searchValue, setSearchValue] = useState("");

	const [displayActivityTags, setDisplayActivityTags] = useState<[]>([]);
	const [displayRegion, setDisplayRegion] = useState<[]>([]);

	const clear = () => {
		setDisplayList(source);
	};
	const updateDisplayTag = (tag: string = "") => {
		if (tag) {
			const filterList = source.filter((ticketItem:FavoritesActivityState) => ticketItem.activityTags && ticketItem.activityTags.includes(tag));
			setDisplayList(filterList);
		} else {
			clear()
		}
	};

	const updateDisplayRegion = (region: string = "") => {
		if (region) {
			const filterList = source.filter((ticketItem: FavoritesActivityState) => ticketItem.region === region);
			setDisplayList(filterList);
		} else {
			clear()
		}
	};

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
			const filterList = source.filter((favoriteItem: FavoritesActivityState) => {
				return (
					favoriteItem.subtitle && favoriteItem.subtitle.includes(searchInput) ||
					favoriteItem.title && favoriteItem.title.includes(searchInput)
				);
			});
			setDisplayList(filterList);
		}
	};

	async function loadData(init:boolean) {		
		try {
			if(init) setLoad(true)
			const responseBody = await favorite.getFavoritesList();
			if (responseBody && responseBody.data) {
				const parseData = responseBody.data.likedList.map(
					(favoriteItem: FavoritesActivityState) => {
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

				setLoad(false);
			}
		} catch (error: any) {
			if (error?.status == 404) {
				setSource([]);
			} else {
				console.error(String(error?.message));
			}
		}
	}
	useEffect(() => {
		loadData(true);
	}, []);

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
							onClick={() => clear()}
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

						{displayActivityTags?.map((value: string, index: number) => (
							<Button
								key={index}
								variant="outlined"
								size="small"
								onClick={() => updateDisplayTag(value)}
							>
								{value}
							</Button>
						))}
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

						{displayRegion?.map((value: string, index: number) => (
							<Button
								key={index}
								variant="outlined"
								size="small"
								onClick={() => updateDisplayRegion(value)}
							>
								{value}
							</Button>
						))}
					</Paper>
				</Grid>

				<Grid xs>
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
					
					
					{load ? 
						<ListLoading />:
						displayList.length === 0
							? <NoData target="活動" sub={true} />
							:	<Box sx={{ mt: 2 }}>
								<Grid container
									spacing={3}
									columnSpacing={{ xs: 0, sm: 3 }}
									justifyContent="flex-start"
									sx={{ width: "100%" }}
								>
									{displayList.map((value: FavoritesActivityState) => (
										<Grid key={value._id} xs={12} sm={6} md={4}>
											<CardActivity
												home={false}
												activity={value}
												onLoad={()=>loadData(false)}
											/>
										</Grid>
									))}
								</Grid>
							</Box>
						}
					
				</Grid>
			</Grid>
		</PageLayout>
	);
}

export default Favorites;
