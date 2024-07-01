"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
	TicketsState,
	TicketStatus,
	TicketInfoState,
} from "@/types/TicketType";
import axios from "@/plugins/api/axios";

import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Button,
	IconButton,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TicketModifyDialog from "@/components/ui/dialog/TicketModifyDialog";

import Loading from "@/components/ui/loading/loading";

import { parseDetailDate } from "@/utils/dateHandler";
import ExpandMoreIcon from "@/components/icon/ExpandMoreIcon";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import BackBtn from "@/components/ui/shared/BackBtn";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";

function TicketAction({
	active = 0,
	info = null,
	inspect = null,
	tickets = null,
	reload,
}: {
	active: number;
	info: TicketInfoState | null;
	inspect: TicketsState | null;
	tickets: TicketsState[] | null;
	reload: (res: boolean) => void;
}) {
	if (!info) return <Box />;

	const [modifyType, setModifyType] = useState("");
	const [target, setTarget] = useState<TicketsState | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const closeDialog = (res: boolean) => {
		setDialogOpen(false);
		setTarget(null);
		reload(res);
	};
	const handleEvaluate = () => {
		if (!inspect) return;
		setModifyType("evaluate");
		setTarget(inspect);
		setDialogOpen(true);
	};
	const handleNote = (ticket: TicketsState) => {
		if (!tickets) return;
		setModifyType("note");
		setTarget(ticket);
		setDialogOpen(true);
	};
	const handleAssign = (e: { preventDefault: () => void }) => {
		if (!(tickets && tickets[active])) return;
		setModifyType("email");
		setTarget(tickets[active]);
		setDialogOpen(true);
	};

	// 活動已結束並已使用
	if (
		info.activityExpired &&
		inspect &&
		inspect.ticketStatus == TicketStatus.Used
	) {
		return (
			<>
				<Button variant="contained" size="large" onClick={handleEvaluate}>
					填寫評價
				</Button>
				<TicketModifyDialog
					payment={modifyType}
					type={modifyType}
					target={target}
					open={dialogOpen}
					onClose={closeDialog}
				/>
			</>
		);
	}

	// 活動未結束且未使用的票卷
	if (
		tickets &&
		tickets[active] &&
		tickets[active].ticketStatus == TicketStatus.Unused
	) {
		const targetTicket = tickets[active];
		return (
			<>
				<Box>
					{inspect && inspect.ticketId == targetTicket.ticketId ? (
						<Button
							variant="contained"
							size="large"
							onClick={() => handleNote(inspect)}
						>
							填寫備註
						</Button>
					) : (
						<>
							{!targetTicket.assignedAt && (
								<Button
									variant="contained"
									size="large"
									sx={{ mr: 1 }}
									onClick={handleAssign}
								>
									進行分票
								</Button>
							)}
							<Button
								variant="contained"
								size="large"
								onClick={() => handleNote(targetTicket)}
							>
								填寫備註
							</Button>
						</>
					)}
				</Box>
				<TicketModifyDialog
					payment={info._id}
					type={modifyType}
					target={target}
					open={dialogOpen}
					onClose={closeDialog}
				/>
			</>
		);
	} else {
		return <Box />;
	}
}

function TicketInfo() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	if (!params.id) {
		router.push("/ticket");
		return <Loading />;
	}

	const { ticket } = axios;
	const customStyle = useCustomTheme();
	const [load, setLoad] = useState(true);
	const [paymentData, setPaymentData] = useState<TicketInfoState | null>(null);
	const [assignActive, setAssignActive] = useState(0);

	async function loadData() {
		setLoad(true);
		try {
			const responseBody = await ticket.getPaymentInfo(params.id);
			setLoad(false);
			if (responseBody && responseBody.data) {
				setPaymentData(responseBody.data[0]);
			}
		} catch (error) {
			setLoad(false);
			setPaymentData(null);
		}
	}
	useEffect(() => {
		loadData();
	}, []);
	const actionHandle = (res: boolean) => {
		console.log(res);
		if (res) {
			loadData();
		}
	};

	if (load) return <Loading />;

	if (paymentData === null) {
		router.push("/ticket");
		return <Loading />;
	}

	const inspectData =
		paymentData.ticketInspect.length > 0 ? paymentData.ticketInspect[0] : null;
	const ticketsData =
		paymentData.tickets.length > 0 ? paymentData.tickets : null;
	const ticketTotal = paymentData.ticketTotal || 0;
	const prevAssignActive = () => {
		if (assignActive === 0) return;
		setAssignActive(assignActive - 1);
	};
	const nextAssignActive = () => {
		if (assignActive + 1 === ticketTotal) return;
		setAssignActive(assignActive + 1);
	};

	const rowContainer = {
		display: "flex",
		flexDirection: { xs: "column", sm: "row" },
		width: "96%",
		mb: 1,
		justifyContent: { xs: "flex-start", sm: "space-between" },
	};
	const columnDesc = {
		fontSize: { xs: "16px", sm: "22px" },
		mb: { xs: 0.5, sm: 0 },
		color: "#74777D",
	};
	return (
		<PageLayout>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "flex-start",
					maxWidth: "1016px",
					width: "90%",
					m: "auto",
				}}
			>
				<BackBtn href="/ticket" name="票卷清單" />

				<Box
					sx={{
						...customStyle.paperStyle,
						my: 3,
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ mb: 2 }}>
						<Typography variant="h3" sx={customStyle.h3TitleStyle}>
							{paymentData.title}
						</Typography>
						<Typography variant="h2" sx={customStyle.h2Style}>
							{paymentData.subtitle}
						</Typography>
						<Typography sx={customStyle.descStyle}>
							{parseDetailDate(
								paymentData.activityStartTime,
								paymentData.activityEndTime,
							)}
						</Typography>
						<Typography sx={customStyle.descStyle}>
							{paymentData.region} {paymentData.city}
						</Typography>
					</Box>
					<TicketAction
						active={assignActive}
						info={paymentData}
						inspect={inspectData}
						tickets={ticketsData}
						reload={actionHandle}
					/>
				</Box>

				{ticketsData && ticketsData[assignActive] && (
					<>
						<Accordion className="customAccordion" sx={customStyle.paperStyle}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="票卷明細"
								sx={customStyle.accordionStyle}
							>
								票卷明細
							</AccordionSummary>
							<AccordionDetails sx={{ ...customStyle.paperStyle, p: 0 }}>
								{/* <Typography sx={customStyle.descStyle}>
									票券內容：XXX
								</Typography> */}
								<Typography sx={customStyle.descStyle}>
									票券狀態：
									{ticketsData[assignActive].ticketStatus ? "已使用" : "已報名"}
								</Typography>
								<Typography sx={customStyle.descStyle}>
									票價：NT$ {paymentData.price || 0}
								</Typography>
								<Typography sx={customStyle.descStyle}>
									備註：
									{ticketsData[assignActive].ticketNote
										? ticketsData[assignActive].ticketNote
										: "無"}
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Box sx={customStyle.paperStyle2}>
							{ticketsData[assignActive].assignedAt ? (
								<>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										sx={{
											margin: { xs: "0 auto 8px auto", sm: "auto" },
											p: 1,
										}}
									>
										{ticketsData[assignActive].ticketStatus ? (
											<></>
										) : (
											<QRCodeSVG
												value={ticketsData[assignActive].ticketId}
												size={270}
											/>
										)}
									</Box>
									<Box
										display="flex"
										sx={{
											flexDirection: "column",
											justifyContent: "space-between",
											alignItems: { xs: "flex-start", sm: "flex-end" },
											width: { xs: "350px", sm: "calc(100% - 286px)" },
											margin: { xs: "8px auto 0 auto", sm: "auto auto 0 auto" },
										}}
									>
										<Box sx={customStyle.labelStyle}>
											{inspectData?.ticketId !=
											ticketsData[assignActive].ticketId
												? "已分票"
												: ticketsData[assignActive].ticketStatus
													? "已使用"
													: "已報名"}
										</Box>
										<Box sx={rowContainer}>
											<Typography sx={columnDesc}>參加人</Typography>
											<Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
												{ticketsData[assignActive].ownerName || ""}
											</Typography>
										</Box>
										<Box sx={rowContainer}>
											<Typography sx={columnDesc}>訂單編號</Typography>
											<Typography sx={{ fontSize: "18px" }}>
												{paymentData._id}
											</Typography>
										</Box>
										<Box sx={rowContainer}>
											<Typography sx={columnDesc}>票卷編號</Typography>
											<Typography sx={{ fontSize: "18px" }}>
												{ticketsData[assignActive].ticketId
													? ticketsData[assignActive].ticketId
													: ""}
											</Typography>
										</Box>
									</Box>
								</>
							) : (
								<Typography sx={customStyle.h3BodyStyle}>未分票</Typography>
							)}
						</Box>
					</>
				)}
				<Box
					width={"100%"}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<IconButton onClick={prevAssignActive}>
						<KeyboardArrowLeftIcon />
					</IconButton>
					<Typography sx={{ ...customStyle.h3BodyStyle, px: 3 }}>
						{assignActive + 1} / 共 {ticketTotal} 張
					</Typography>
					<IconButton onClick={nextAssignActive}>
						<KeyboardArrowRightIcon />
					</IconButton>
				</Box>
			</Box>
		</PageLayout>
	);
}

export default TicketInfo;
