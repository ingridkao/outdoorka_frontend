"use client";

import { useState, useEffect, SyntheticEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OrganizerLayout from "@/components/layout/OrganizerLayout/OrganizerLayout";
import axios from "@/plugins/api/axios";
import { OrganizerActivityState } from "@/types/ActivitiesType";
import { Box, Tab, Tabs, Grid, Alert, IconButton } from "@mui/material";
import CircularLoading from "@/components/ui/loading/CircularLoading";
import ListLoading from "@/components/ui/loading/ListLoading";
import NoData from "@/components/ui/shared/NoData";
import CardOrganizerActivity from "@/components/ui/card/CardOrganizerActivity";
import SortIcon from "@/components/icon/SortIcon";

function OrganizerActivityList() {
	const searchParams = useSearchParams();
	const type = searchParams?.get("type") || 1;
	const { organizer } = axios;

	const [activityList, setActivityList] = useState<OrganizerActivityState[]>(
		[],
	);
	const [errorMsg, setErrorMsg] = useState("");
	const [dataLoad, setDataLoad] = useState(true);
	const [tagValue, setTagValue] = useState(type ? Number(type) : 1);
	const [sortValue, setSortValue] = useState(true);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		event.preventDefault();
		setTagValue(newValue);
	};
	const handleSort = (event: SyntheticEvent) => {
		event.preventDefault();
		setSortValue(!sortValue);
	};
	useEffect(() => {
		async function loadData() {
			try {
				setDataLoad(true);
				const responseBody = await organizer.getActivity({
					status: tagValue,
					sort: sortValue ? "asc" : "desc",
				});
				if (responseBody && responseBody.data) {
					setActivityList(responseBody.data);
				}
			} catch (error: any) {
				if (error?.status == 404) {
					setActivityList([]);
				} else {
					setErrorMsg(String(error?.message));
				}
			}
			setDataLoad(false);
		}
		loadData();
	}, [tagValue, sortValue]);

	return (
		<OrganizerLayout>
			<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
				{!(type && Number(type) == 2) ? (
					<Tabs value={tagValue} onChange={handleChange} aria-label="活動類別">
						<Tab label="草稿" value={0} />
						<Tab label="已發布" value={1} />
					</Tabs>
				) : (
					<Tabs
						value={tagValue}
						onChange={handleChange}
						aria-label="過往活動類別"
					>
						<Tab label="已結束" value={2} />
					</Tabs>
				)}
			</Box>

			{errorMsg && <Alert severity="error">{errorMsg}</Alert>}

			{dataLoad ? (
				<ListLoading />
			) : activityList.length === 0 ? (
				<NoData target="活動" sub={true} />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={11}></Grid>
					<Grid item xs={1}>
						<IconButton aria-label="排序" onClick={handleSort}>
							<SortIcon />
						</IconButton>
					</Grid>
					{activityList?.map((value) => (
						<Grid item xs={12} sm={6} md={4} key={value._id}>
							<CardOrganizerActivity
								isFinish={tagValue === 2}
								isPublish={tagValue}
								activity={value}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</OrganizerLayout>
	);
}

function WrappedOrganizerActivityPage() {
	return (
		<Suspense fallback={<CircularLoading />}>
			<OrganizerActivityList />
		</Suspense>
	);
}

export default WrappedOrganizerActivityPage;
