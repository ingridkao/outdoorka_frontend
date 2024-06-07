"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	Button,
	Toolbar,
	useScrollTrigger,
	Input,
	InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoHorizontal from "@/components/icon/LogoHorizontal";
import LoginAction from "./LoginAction";

function PageHeader() {
	const [container, setContainer] = useState<HTMLElement | undefined>(
		undefined,
	);
	const [mobileOpen, setMobileOpen] = useState(false);
	const scrollDownFlag = useScrollTrigger();
	const drawerWidth = 240;

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	// mobile: 側拉
	const asideDrawer = (
		<Box>
			<IconButton onClick={handleDrawerToggle}>
				<MenuIcon />
			</IconButton>
		</Box>
	);

	useEffect(() => {
		setContainer(
			typeof window !== "undefined" ? window.document.body : undefined,
		);
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				maxWidth: "1848px",
			}}
		>
			<AppBar
				component="nav"
				elevation={scrollDownFlag ? 9 : 0}
				sx={{
					backgroundColor: scrollDownFlag ? "#D9D9D9" : "#FFF",
					color: "#4A4642",
					boxShadow: "none",
					py: 1,
				}}
			>
				<Toolbar
					sx={{
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					<Box display="inline-flex" alignItems="center">
						{/* Mobile: 漢堡選單按鈕 */}
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{
								display: { md: "none" },
								justifyContent: "flex-start",
							}}
						>
							<MenuIcon />
						</IconButton>

						<Button
							component={NextLink}
							href="/"
							sx={{ height: { xs: "30px", md: "48px" } }}
						>
							<LogoHorizontal color="#4A4642" />
						</Button>

						<Box
							className="search"
							sx={{
								ml: 5,
								display: { xs: "none", sm: "block" },
							}}
						>
							<Input
								disableUnderline={true}
								placeholder="探索活動"
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								sx={{ height: "44px", border: "1px solid #DFE2EB" }}
								onChange={() => {}}
							/>
						</Box>
					</Box>
					<LoginAction />
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{asideDrawer}
				</Drawer>
			</nav>
		</Box>
	);
}

export default PageHeader;
