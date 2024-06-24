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
	SelectChangeEvent
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import CardTicket from "@/components/ui/card/CardTicket";
import Loading from "@/components/ui/loading/loading";
import NoData from "@/components/ui/shared/NoData";
import SortIcon from "@/components/icon/SortIcon";
import ListSearchHeader from "@/components/ui/shared/ListSearchHeader";

function Tickets() {
	const theme = useTheme();
	const { ticket } = axios;
	const [load, setLoad] = useState(true);
	const [source, setSource] = useState<TicketState[]>([]);
	const [displayList, setDisplayList] = useState<TicketState[]>([]);
	const [sortValue, setSortValue] = useState("");
	const [ascValue, setAscValue] = useState(true);
	const [searchValue, setSearchValue] = useState("");

	const updateDisplayStatus = (type: number | null = null) => {
		if (type === null) {
			setDisplayList(source);
		} else {
			const filterList = source.filter((ticketItem:TicketState) => ticketItem.status === type);
			setDisplayList(filterList);
		}
	};

	const handleSelectChange = (event: SelectChangeEvent) => {
		setSortValue(event.target.value as string);
	};

	const handleSort = (event: SyntheticEvent) => {
		event.preventDefault();
		setAscValue(!ascValue);
		let filterList = []
		if(sortValue === "activityStartTime" || sortValue === "activityEndTime"){
			filterList = sortTimeData(source, sortValue, ascValue)
		}else{
			filterList = source.sort((a:any, b:any) => {
				return ascValue? (a[sortValue]- b[sortValue]): (b[sortValue] - a[sortValue])
			});
		}
		setDisplayList(filterList);
	};

	const handleSearchChange = (searchInput: string) => {		
		setSearchValue(searchInput);
		if(searchInput === ""){
			setDisplayList(source);
		}else{
			const filterList = source.filter((ticketItem:TicketState) => {
				return ticketItem.title.includes(searchInput)
			});
			setDisplayList(filterList);
		}
	};

	useEffect(() => {
		async function loadData() {
			setLoad(true);
			try {
				const responseBody = await ticket.getTicketList();
				if (responseBody && responseBody.data) {
					const parseData = responseBody.data.map((ticketItem:TicketState)=>{
						return {
							...ticketItem,
							ticketStatus: parstTicketStatus(ticketItem.activityStartTime, ticketItem.activityEndTime, ticketItem.tickets)
						}
					})
					setSource(parseData);
					setDisplayList(parseData)
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
			<Grid container sx={{width:"100%",m:"auto", gap:5}}>
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
							票卷類型
						</Typography>
						<Button
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
						</Button>
					</Paper>
				</Grid>

				<Grid xs sx={{ maxWidth: "1440px" }}>
					<ListSearchHeader 
						title={"票卷列表"}
						subTitle={"你的票卷清單已準備好囉！"}
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
						{displayList.length === 0 && <NoData target="票卷" />}

						<Grid
							container
							rowSpacing={4}
							columnSpacing={{ xs: 0, sm: 1, md: 5 }}
							justifyContent="flex-start"
						>
							{displayList?.map((value) => (
								<Grid key={value._id} xs={12} sm={6} md={4}>
									<Box component={NextLink} href={`/ticket/${value.paymentId}`}>
										<CardTicket
											ticketItem={{
												title: value.title,
												location: `${value.region} ${value.city}`,
												startTime: value.activityStartTime,
												endTime: value.activityEndTime,
												photo: value.activityImageUrl,
												capacity: value.bookedCapacity,
												ticketCount: value.ticketCount,
												ticketStatus: value.ticketStatus,
												tickets: value.tickets,
												status: value.status,
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
