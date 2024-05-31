import React from "react";

import MainLayout from "@/components/layout/MainLayout/MainLayout";
import HomeOrganizerCarousel from "@/components/ui/carousel/homeOrganizerCarousel";
import HotActivities from "@/components/layout/home/HotActivities";
import NewActivities from "@/components/layout/home/NewActivities";

import { Box, Unstable_Grid2 as Grid } from "@mui/material";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function Home() {
	return (
		<MainLayout>
			<Grid container justifyContent="center">
				<Grid xs={12}>
					首頁Banner幻燈片
				</Grid>
				<Grid xs={12} sx={{ maxWidth: "1536px" }}>
					<HotActivities />
				</Grid>
				<Grid xs={12}>
					<NewActivities />
				</Grid>
				<Grid xs={10} sx={{ maxWidth: "1536px", mb: "200px" }}>
					<Box sx={{ height: "80vh", backgroundColor: "#F8F9FF" }}>
						活動探索
					</Box>
				</Grid>
				<Grid xs={12} sx={{ maxWidth: "1536px", mb: "200px" }}>
					<HomeOrganizerCarousel />
				</Grid>
			</Grid>
		</MainLayout>
	);
}

export default Home;
