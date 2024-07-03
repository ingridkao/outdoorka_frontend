"use client";

import { MainLayoutProps } from "@/types/index";

import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PageHeader from "@/components/layout/Header/PageHeader";
import Footer from "@/components/layout/Footer/Footer";

function PageLayout({ children }: MainLayoutProps) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				backgroundColor: theme.palette.background.default,
			}}
		>
			<PageHeader />
			<Container
				component="main"
				maxWidth="xl"
				sx={{
					px: 0,
					py: { xs: 12, sm: 15 },
					wordWrap: "break-word",
				}}
			>
				{children}
			</Container>
			<Footer />
		</Box>
	);
}

export default PageLayout;
