"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { MainLayoutProps } from "@/types/index";

function MainLayout({ children }: MainLayoutProps) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				backgroundColor: theme.palette.background.default,
			}}
		>
			<Header />
			<Container
				component="main"
				maxWidth="xl"
				sx={{
					px: { sm: 0, lg: 0 },
					pt: 12,
					pb: 1.5,
					wordWrap: "break-word",
					backgroundColor: "#F8F9FF",
				}}
			>
				{children}
			</Container>
			<Footer />
		</Box>
	);
}

export default MainLayout;
