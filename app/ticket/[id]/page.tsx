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

import CircularLoading from "@/components/ui/loading/CircularLoading";

import { parseDetailDate } from "@/utils/dateHandler";
import ExpandMoreIcon from "@/components/icon/ExpandMoreIcon";
import TicketIcon from "@/components/icon/TicketIcon";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import BackBtn from "@/components/ui/shared/BackBtn";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";

function TicketAction({
	active = 0,
	info = null,
	tickets = null,
	reload,
}: {
	active: number;
	info: TicketInfoState | null;
	tickets: TicketsState[] | null;
	reload: (res: boolean) => void;
}) {
	if (!info) return <Box />;

	const [modifyType, setModifyType] = useState<string>("");
	const [target, setTarget] = useState<TicketsState | null>(null);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const closeDialog = (res: boolean) => {
		setDialogOpen(false);
		setTarget(null);
		reload(res);
	};

	const handleAction = (type: string) => {
		if (!type) return;
		if (type === "evaluate" && info.rating === 1) return;
		if (!(tickets && tickets[active])) return;
		setModifyType(type);
		setTarget(tickets[active]);
		setDialogOpen(true);
	};

	if (!tickets) return <Box />;

	const targetTicket: TicketsState | null = tickets[active];
	if (!targetTicket) return <Box />;

	const checkEvaluate =
		info.ratingList &&
		info.ratingList.find(
			(item: any) => item.ticketId === targetTicket.ticketId,
		);

	return (
		<>
			<Box>
				{/* 超過一張票卷，未使用及未分票的票卷 */}
				{tickets.length > 1 &&
					targetTicket.ticketStatus == TicketStatus.Unused && (
					<Button
						variant="contained"
						size="large"
						sx={{ wordBreak: "keep-all" }}
						onClick={() => handleAction("email")}
					>
						進行分票
					</Button>
				)}
				{tickets.length === 1 &&
					targetTicket.ticketStatus == TicketStatus.Unused && (
					<Button
						variant="contained"
						size="large"
						sx={{ wordBreak: "keep-all" }}
						onClick={() => handleAction("note")}
					>
						填寫備註
					</Button>
				)}
				{targetTicket.ticketStatus == TicketStatus.Used && (
					<Button
						variant="contained"
						size="large"
						sx={{ wordBreak: "keep-all" }}
						disabled={checkEvaluate}
						onClick={() => handleAction("evaluate")}
					>
						{checkEvaluate ? "已評價" : "填寫評價"}
					</Button>
				)}
			</Box>
			<TicketModifyDialog
				payment={info}
				type={modifyType}
				target={target}
				open={dialogOpen}
				onClose={closeDialog}
			/>
		</>
	);
}

function TicketInfo() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	if (!params.id) {
		router.push("/ticket");
		return <CircularLoading />;
	}

	const { ticket } = axios;
	const customStyle = useCustomTheme();
	const [load, setLoad] = useState(true);
	const [paymentData, setPaymentData] = useState<TicketInfoState | null>(null);
	const [assignActive, setAssignActive] = useState(0);

	async function loadData() {
		setLoad(true);
		setAssignActive(0)
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

	if (load) return <CircularLoading />;

	if (paymentData === null) {
		router.push("/ticket");
		return <CircularLoading />;
	}

	const ticketTotal = paymentData.tickets.length;
	const ticketsData = ticketTotal > 0 ? paymentData.tickets : null;
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
									<Box display="flex" justifyContent="center" alignItems="center"
										sx={{
											width: { xs: 0, sm: 270 },
											height: { xs: 0, sm: 270 },
											backgroundColor: "#edf1f9"
										}}
									>
										<TicketIcon sx={{width: 100, height: 100}} fillcolor="#70AFF5"/>
									</Box>
								) : (
									<QRCodeSVG
										size={270}
										value={ticketsData[assignActive].ticketId}
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
									{ticketsData[assignActive].ticketStatus ? "已使用" : "已報名"}
								</Box>
								<Box sx={rowContainer}>
									<Typography sx={columnDesc}>
										{ticketsData.length === 0 ||
										ticketsData[assignActive].ticketStatus
											? "參加人"
											: "購買人"}
									</Typography>
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
						</Box>
					</>
				)}
				{ticketTotal > 1 && (
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
				)}

				{paymentData && (
					<>
						<Accordion
							className="customAccordion"
							sx={{ ...customStyle.paperStyle, my: 3 }}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="注意事項"
								sx={customStyle.accordionStyle}
							>
								注意事項
							</AccordionSummary>
							<AccordionDetails sx={{ ...customStyle.paperStyle, p: 0 }}>
								<Typography sx={customStyle.descStyle}>
									{paymentData.activityNotice}
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Accordion className="customAccordion" sx={customStyle.paperStyle}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="聯絡主揪"
								sx={customStyle.accordionStyle}
							>
								聯絡主揪
							</AccordionSummary>
							<AccordionDetails sx={{ ...customStyle.paperStyle, p: 0 }}>
								<Typography sx={customStyle.descStyle}>
									主揪： {paymentData.organizer?.name}
								</Typography>
								<Typography sx={customStyle.descStyle}>
									手機： {paymentData.organizer?.mobile}
								</Typography>
								<Typography sx={customStyle.descStyle}>
									Email： {paymentData.organizer?.email}
								</Typography>
								<Typography sx={customStyle.descStyle}>
									如果對於活動有任何問題,請聯繫主辦單位。
								</Typography>
							</AccordionDetails>
						</Accordion>
					</>
				)}
			</Box>
		</PageLayout>
	);
}

export default TicketInfo;
