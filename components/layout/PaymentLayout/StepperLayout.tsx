"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import PageLayout from "@/components/layout/MainLayout/PageLayout";

function StepperLayout({ children }) {
	const pathname = usePathname();
	const params = useParams();
	const id = params?.id;

	console.log(id);

	const steps = [
		{ index: 0, label: "確認金額", path: `/check/amount/${id}/` },
		{ index: 1, label: "填寫資料", path: `/check/details/${id}/` },
		{ index: 2, label: "付款", path: `/check/payment/${id}/` },
		{ index: 3, label: "訂單完成", path: `/check/success/` },
	];

	const getActiveStep = (pathname) => {
		const step = steps.find((step) => step.path === pathname);
		return step ? step.index : 0;
	};

	const activeStep = getActiveStep(pathname);

	return (
		<PageLayout>
			<Box>
				<Box maxWidth={756} margin="24px auto">
					<Stepper nonLinear activeStep={activeStep} sx={{ mb: 3 }}>
						{steps.map((element) => (
							<Step key={element.label}>
								<StepLabel>{element.label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<Box>{children}</Box>
				</Box>
			</Box>
		</PageLayout>
	);
}

export default StepperLayout;
