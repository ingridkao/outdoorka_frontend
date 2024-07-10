"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import StepperLayout from "@/components/layout/PaymentLayout/StepperLayout";
import SuccessIcon from "@/components/icon/successIcon";

function Success() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const paymentId = searchParams.get("paymentId");
	const totalPrice = searchParams.get("totalPrice");

	const redirectToTicket = () => {
		router.push("/ticket");
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
							{paymentId}
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
							NT$ {totalPrice}
						</Typography>
					</Box>
				</CardContent>
				<Box px={5} pb={4} pt={1} display="flex" justifyContent="flex-end">
					<Button
						variant="contained"
						color="primary"
						sx={{ boxShadow: "none", py: 0.6 }}
						onClick={redirectToTicket}
					>
						快速取票
					</Button>
				</Box>
			</Card>
		</StepperLayout>
	);
}

export default Success;
