"use client";

// import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import { parseDetailDate } from "@/utils/dateHandler";
import ExpandMoreIcon from "@/components/icon/ExpandMoreIcon";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import BackBtn from "@/components/ui/shared/BackBtn";
import useCustomTheme from "@/components/ui/shared/useCustomTheme";

const ticketData = {
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
};

function Ticket() {
	const customStyle = useCustomTheme();
	// const params = useParams<{ id: string }>();

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
					margin: "auto",
				}}
			>
				<BackBtn href="/ticket" name="票卷清單" />

				<Box sx={{ ...customStyle.paperStyle, my: 3 }}>
					<Typography variant="h2" sx={customStyle.h2Style}>
						{ticketData.subtitle}
					</Typography>
					<Typography sx={customStyle.descStyle}>
						{parseDetailDate(
							ticketData.activityStartTime,
							ticketData.activityEndTime,
						)}
					</Typography>
					<Typography sx={customStyle.descStyle}>
						{ticketData.region} {ticketData.city}
					</Typography>
				</Box>

				<Accordion className="customAccordion" sx={customStyle.paperStyle}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="票卷明細"
						sx={customStyle.accordionStyle}
					>
						票卷明細
					</AccordionSummary>
					<AccordionDetails sx={{ ...customStyle.paperStyle, p: 0 }}>
						<Typography sx={customStyle.descStyle}>
							票券內容：XXX
						</Typography>
						<Typography sx={customStyle.descStyle}>
							票券狀態：{ticketData.ticketStatus ? "已使用" : "已報名"}
						</Typography>
						<Typography sx={customStyle.descStyle}>
							票價：NT$ XXX
						</Typography>
						<Typography sx={customStyle.descStyle}>
							備註：無
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Box
					sx={{
						...customStyle.paperStyle,
						backgroundColor: "#FFF",
						my: 3,
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						justifyContent: "space-between",
						border: "2px solid #DFE2EB",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							margin: { xs: "0 auto 8px auto", sm: "auto" },
							p: 1,
						}}
					>
						<QRCodeSVG value={ticketData._id} size={270} />
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: { xs: "flex-start", sm: "flex-end" },
							width: { xs: "350px", sm: "calc(100% - 286px)" },
							margin: { xs: "8px auto 0 auto", sm: "auto auto 0 auto" },
						}}
					>
						<Box
							sx={{
								fontSize: "24px",
								fontWeight: 700,
								px: 3,
								py: 1,
								mb: 5,
								backgroundColor: "#FFDAD9",
							}}
						>
							已使用
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", sm: "row" },
								width: "96%",
								mb: 1,
								justifyContent: { xs: "flex-start", sm: "space-between" },
							}}
						>
							<Typography
								sx={{
									fontSize: { xs: "16px", sm: "22px" },
									mb: { xs: 0.5, sm: 0 },
									color: "#74777D",
								}}
							>
								參加人
							</Typography>
							<Typography
								sx={{
									fontSize: "28px",
									fontWeight: 700,
								}}
							>
								XXX
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", sm: "row" },
								width: "96%",
								mb: 1,
								justifyContent: { xs: "flex-start", sm: "space-between" },
							}}
						>
							<Typography
								sx={{
									fontSize: { xs: "16px", sm: "22px" },
									mb: { xs: 0.5, sm: 0 },
									color: "#74777D",
								}}
							>
								訂單編號
							</Typography>
							<Typography
								sx={{
									fontSize: "18px",
								}}
							>
								xxx
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", sm: "row" },
								width: "96%",
								justifyContent: { xs: "flex-start", sm: "space-between" },
							}}
						>
							<Typography
								sx={{
									fontSize: { xs: "16px", sm: "22px" },
									mb: { xs: 0.5, sm: 0 },
									color: "#74777D",
								}}
							>
								票卷編號
							</Typography>
							<Typography
								sx={{
									fontSize: "18px",
								}}
							>
								xxx
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</PageLayout>
	);
}

export default Ticket;