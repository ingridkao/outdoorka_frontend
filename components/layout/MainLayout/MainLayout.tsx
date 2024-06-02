import React from "react";
import {
	Box,
	Container,
	// Typography
} from "@mui/material";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { MainLayoutProps } from "@/types/index";

function MainLayout({ children }: MainLayoutProps) {
	return (
		<Box>
			<Header />
			<Container
				component="main"
				maxWidth="xl"
				sx={{
					px: 0,
					py: 1.5,
					wordWrap: "break-word",
				}}
			>
				{children}
			</Container>
			<Footer />
		</Box>
	);
}

export default MainLayout;
