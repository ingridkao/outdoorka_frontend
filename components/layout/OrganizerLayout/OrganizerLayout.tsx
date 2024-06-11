"use client";

import React from "react";
import { Box, Container, Grid } from "@mui/material";
import OgHeader from "@/components/layout/Header/OgHeader";
import Footer from "@/components/layout/Footer/Footer";
import { MainLayoutProps } from "@/types/index";
import LeftMenu from "./LeftMenu";

function OrganizerLayout({ children }: MainLayoutProps) {
	return (
		<Box>
			<OgHeader />
			<Container
				component="main"
				maxWidth="lg"
				sx={{
					paddingTop: 16,
					wordWrap: "break-word",
				}}
			>
				<Grid container spacing={6}>
					<Grid item xs={12} sm={3} md={2}>
						<LeftMenu />
					</Grid>
					<Grid item xs={12} sm={9} md={10} sx={{mb:18}}>
						{children}
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</Box>
	);
}

export default OrganizerLayout;
