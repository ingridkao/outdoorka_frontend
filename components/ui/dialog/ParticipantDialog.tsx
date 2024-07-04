"use client";
import NextLink from "next/link";
import axios from "@/plugins/api/axios";
import { useState, SyntheticEvent, useEffect } from "react";
import { SimpleDialogProps } from "@/types";
import { parseStartTime } from "@/utils/dateHandler";
import {
	Box,
	Tab,
	Tabs,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	Button,
	Card,
	CardContent,
	CardMedia,
} from "@mui/material";

function ParticipantDialog(props: SimpleDialogProps) {
	const { organizer } = axios;
	const { data, onClose, open } = props;
	const [tagValue, setTagValue] = useState(0);
	const [participantList, setParticipantList] = useState([]);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setTagValue(newValue);
	};

	useEffect(() => {
		if (data?._id) {
			organizer.getActivityParticipant(data._id).then((res: any) => {
				if (res.data) {
					console.log("res.data", res.data);
					setParticipantList(res.data);
				}
			});
		}
	}, []);
	return (
		<Dialog onClose={() => onClose()} open={open} fullWidth maxWidth="sm">
			<DialogTitle>報名會員</DialogTitle>
			<DialogContent sx={{ textAlign: "center" }}>
				<Typography variant="h6">活動標題: {data?.title || ""}</Typography>
				<Typography variant="body1">
					時間: {parseStartTime(data?.activityStartTime || "")}
				</Typography>
				<Typography variant="body1">
					當前報名者人數： {participantList.length || 0}
				</Typography>
				<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
					<Tabs value={tagValue} onChange={handleChange} aria-label="報導狀況">
						<Tab label="未報到" value={0} />
						<Tab label="已報到" value={1} />
					</Tabs>
				</Box>
				<Box>
					<Grid container spacing={1.5}>
						{participantList
							.filter((item: any) => item.ticketStatus === tagValue)
							.map((item: any) => (
								<Grid key={item._id} item xs={6}>
									<Card sx={{ display: "flex" }}>
										<Box
											sx={{
												display: "flex",
											}}
										>
											<CardMedia
												component="img"
												sx={{ width: 105 }}
												image={item.owner.photo}
												alt="user photo"
											/>
											<CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
												<Box
													className="singleline-ellipsis"
													sx={{ textAlign: "left", margin: "12px 0" }}
												>
													<span
														style={{ display: "inline-block", width: "86px" }}
													>
														姓名：
													</span>
													<span>{item.owner.name}</span>
												</Box>
												<Box
													className="singleline-ellipsis"
													sx={{ textAlign: "left", margin: "12px 0" }}
												>
													<span
														style={{ display: "inline-block", width: "86px" }}
													>
														電話：
													</span>
													<span>{item.owner.mobile}</span>
												</Box>
												<Box
													className="singleline-ellipsis"
													sx={{ textAlign: "left", margin: "12px 0" }}
												>
													<span
														style={{ display: "inline-block", width: "86px" }}
													>
														報名日期：
													</span>
													<span>{parseStartTime(item.ticketCreatedAt)}</span>
												</Box>

												<Button
													component={NextLink}
													variant="contained"
													size="small"
													sx={{ mt: 2, float: "right", marginBottom: "-8px" }}
													href={`/organizer/scan/?id=${item._id}`}
													target="_blank"
												>
													查看/驗票
												</Button>
											</CardContent>
										</Box>
									</Card>
								</Grid>
							))}
					</Grid>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default ParticipantDialog;
