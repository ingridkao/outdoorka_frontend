import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { MainLayoutProps } from "@/types/index";

function MainLayout({ children }: MainLayoutProps) {	
	return (
		<Box>
			<Header />
			<Box 
				component="main"
				sx={{ 
					paddingTop: 10,
					wordWrap: "break-word"
				}}
			>
				{children}
			</Box>
			<Footer />
		</Box>
	);
}

export default MainLayout;
