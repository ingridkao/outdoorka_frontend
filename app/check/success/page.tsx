import React from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Button,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import StepperLayout from "@/components/layout/PaymentLayout/StepperLayout";
import SuccessIcon from "@/components/icon/successIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const mockData = {
	data: {
		paymentId: "SUP202403220001",
		ticketCount: 2,
		tickePrice: 500,
		activity: {
			title: "跑山幫越野跑訓練營(象山夜跑)",
			activityStartTime: "2024-04-15T16:50:46.637Z",
			activityEndTime: "2024-04-14T17:11:30.952Z",
			city: "臺北市",
			address: "信義區信義路5段152號",
			location: "集合地點",
			tickets: [
				"1f704bc5-5055-43eb-a851-c87b6b0bf7b9",
				"1f704bc5-5055-43eb-a851-c87b6b0bf7b9",
			],
		},
	},
};

function Success() {
	const totalPrice = () => {
		return mockData.data.ticketCount * mockData.data.tickePrice;
	};

	return (
		<StepperLayout>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="296px"
			>
				<Box display="flex" flexDirection="column" justifyContent="center">
					<Box mb={2} textAlign="center">
						<SuccessIcon />
					</Box>
					<Typography sx={{ fontSize: 28, color: "#70AFF5", fontWeight: 700 }}>
						訂單完成
					</Typography>
				</Box>
			</Box>
			<Card
				sx={{
					margin: "auto",
					bgcolor: "#FFFFFF",
					borderRadius: "12px",
					mt: 3,
					boxShadow: "none",
				}}
			>
				<CardContent sx={{ px: 5, py: 4 }}>
					<Box display="flex" justifyContent="space-between" mb={3}>
						<Typography
							sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
						>
							訂單編號
						</Typography>
						<Typography
							variant="body2"
							component="div"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								fontSize: 28,
							}}
						>
							{mockData.data.paymentId}
						</Typography>
					</Box>
					<Box display="flex" justifyContent="space-between">
						<Typography
							sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
						>
							總金額
						</Typography>
						<Typography
							variant="body2"
							component="div"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								fontSize: 28,
							}}
						>
							NT$ {totalPrice()}
						</Typography>
					</Box>
				</CardContent>
				<Box px={5} pb={4} pt={1} display="flex" justifyContent="flex-end">
					<Button
						variant="contained"
						color="primary"
						sx={{ boxShadow: "none", py: 0.6 }}
					>
						快速取票
					</Button>
				</Box>
			</Card>
			<Accordion
				elevation={0}
				sx={{
					borderRadius: 1.5,
					border: 0,
					mt: 3,
					p: "42px 40px",
					backgroundColor: "#EDF1F9",
					boxShadow: "none",
					"&::before": { display: "none" },
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2-content"
					id="panel2-header"
					sx={{
						fontSize: 24,
						fontWeight: 700,
					}}
				>
					票券資訊
				</AccordionSummary>
				<AccordionDetails></AccordionDetails>
			</Accordion>
		</StepperLayout>
	);
}

export default Success;
