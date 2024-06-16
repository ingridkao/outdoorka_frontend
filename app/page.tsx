import React from "react";

import { Box, Unstable_Grid2 as Grid, Link } from "@mui/material";
import HomeOrganizerCarousel from "@/components/ui/carousel/homeOrganizerCarousel";
import HotActivities from "@/components/layout/home/HotActivities";
import NewActivities from "@/components/layout/home/NewActivities";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import TitleSection from "@/components/layout/home/TitleSection";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function Home() {
	return (
		<MainLayout>
			<Grid container justifyContent="center">
				<Grid xs={12}>
					<Box sx={{ height: "1010px" }}></Box>
				</Grid>
				<Grid sx={{ maxWidth: { sm: "850px", md: "1280px", lg: "1536px" } }}>
					<HotActivities />
				</Grid>
				<Grid xs={12}>
					<NewActivities />
				</Grid>
				<Grid xs={10}>
					<Box py={10}>
						<TitleSection title="活動探索" />
						<Box
							my={6}
							maxWidth={1280}
							mx={"auto"}
							display="flex"
							flexDirection="column"
						>
							<Box
								mb={3}
								textAlign="center"
								sx={{
									py: "60px",
									backgroundImage: "url('/images/Freediving.jpeg')",
									backgroundPosition: "center",
									backgroundSize: "cover",
									borderRadius: "25px",
								}}
							>
								<Link href="/">
									<Box mb={1} color="#FFFFFF" fontSize="28px">
										自由潛水
									</Box>
									<Box color="#FFFFFF" fontSize="20px">
										Freediving
									</Box>
								</Link>
							</Box>
							<Box
								mb={3}
								textAlign="center"
								sx={{
									py: "60px",
									backgroundImage: "url('/images/Hiking.jpeg')",
									backgroundPosition: "center",
									backgroundSize: "cover",
									borderRadius: "25px",
								}}
							>
								<Link href="/">
									<Box mb={1} color="#FFFFFF" fontSize="28px">
										健行
									</Box>
									<Box color="#FFFFFF" fontSize="20px">
										Hiking
									</Box>
								</Link>
							</Box>
							<Box
								mb={3}
								textAlign="center"
								sx={{
									py: "60px",
									backgroundImage: "url('/images/Badminton.jpeg')",
									backgroundPosition: "center",
									backgroundSize: "cover",
									borderRadius: "25px",
								}}
							>
								<Link href="/">
									<Box mb={1} color="#FFFFFF" fontSize="28px">
										羽球
									</Box>
									<Box color="#FFFFFF" fontSize="20px">
										Badminton
									</Box>
								</Link>
							</Box>
							<Box
								mb={3}
								textAlign="center"
								sx={{
									py: "60px",
									backgroundImage: "url('/images/Sup.jpeg')",
									backgroundPosition: "center",
									backgroundSize: "cover",
									borderRadius: "25px",
								}}
							>
								<Link href="/">
									<Box mb={1} color="#FFFFFF" fontSize="28px">
										立獎
									</Box>
									<Box color="#FFFFFF" fontSize="20px">
										SUP
									</Box>
								</Link>
							</Box>
						</Box>
					</Box>
				</Grid>
				<Grid
					xs={12}
					sx={{
						maxWidth: {
							xl: "1536px",
							lg: "1160px",
							md: "1160px",
							sm: "800px",
							xs: "280px",
						},
						mb: "200px",
					}}
				>
					<HomeOrganizerCarousel />
				</Grid>
			</Grid>
		</MainLayout>
	);
}

export default Home;
