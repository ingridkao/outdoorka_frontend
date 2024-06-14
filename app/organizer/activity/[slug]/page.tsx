"use client";

import { useParams } from "next/navigation";
import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { parseDetailDate } from "@/utils/dateHandler";
import ExpandMoreIcon from "@/components/icon/ExpandMoreIcon";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import BackBtn from "@/components/ui/shared/BackBtn";

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

function OrganizerActivityDetail() {
	const theme = useTheme();
	const params = useParams<{ slug: string }>();
	console.log(params);
	const paperStyle = {
		width: "100%",
		backgroundColor: "#EDF1F9",
		p: 5,
		borderRadius: 1,
	};
	const accordionStyle = {
		backgroundColor: "#EDF1F9",
		px: 0,
		borderRadius: 5,
		width: "100%",
		maxWidth: "1016px",
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
					margin: "auto",
				}}
			>
				<BackBtn href="/organizer/activity" name="活動清單" />

				<Box sx={{ ...paperStyle, my: 3 }}>
					<Typography
						variant="h2"
						sx={{
							fontSize: "44px",
							fontWeight: "700",
							color: theme.palette.text.primary,
							mb: 3,
						}}
					>
						{ticketData.subtitle}
					</Typography>
					<Typography sx={{ color: "#74777D", mb: 1 }}>
						{parseDetailDate(
							ticketData.activityStartTime,
							ticketData.activityEndTime,
						)}
					</Typography>
					<Typography sx={{ color: "#74777D" }}>
						{ticketData.region} {ticketData.city}
					</Typography>
				</Box>

				<Accordion className="customAccordion" sx={paperStyle}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="票卷明細"
						sx={accordionStyle}
					>
						票卷明細
					</AccordionSummary>
					<AccordionDetails sx={{ ...paperStyle, p: 0 }}>
						<p>票券內容：XXX</p>
						<p>票券狀態：{ticketData.ticketStatus ? "已使用" : "已報名"}</p>
						<p>票價：NT$ XXX</p>
						<p>備註：無</p>
					</AccordionDetails>
				</Accordion>

				<Box
					sx={{
						...paperStyle,
						backgroundColor: "#FFF",
						my: 3,
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						justifyContent: "space-between",
						border: "2px solid #DFE2EB",
					}}
				/>
			</Box>
		</PageLayout>
	);
}

export default OrganizerActivityDetail;
