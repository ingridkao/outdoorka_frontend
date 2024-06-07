"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCookieObj } from "@/utils/cookieHandler";
import { RootState } from "@/types";
import { setProfile } from "@/features/user/authSlice";
import LoginAction from "./LoginAction";

import {
	AppBar,
	Box,
	List,
	ListItem,
	Drawer,
	Link,
	IconButton,
	Button,
	Toolbar,
	useScrollTrigger,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoHeader1 from "@/public/images/logoHeader_1.svg";
import LogoHeader2 from "@/public/images/logoHeader_2.svg";

const linkTitles = [
	{ title: "關於我們", link: "#" },
	{ title: "活動", link: "/activities" },
	{ title: "優良主揪", link: "#" },
	{ title: "Blog", link: "#" },
	{ title: "短影音", link: "#" },
];

function Header() {
	const [container, setContainer] = useState<HTMLElement | undefined>(
		undefined,
	);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { profile } = useSelector((x: RootState) => x.auth);
	const dispatch = useDispatch();
	const userProfile = getProfileCookieObj();
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
			<List sx={{ px: 2, py: 5 }}>
				{linkTitles.map((item) => (
					<ListItem
						key={item.title}
						sx={{
							py: 1,
							px: 3,
							mb: 1,
							justifyContent: "center",
						}}
					>
						<Link
							key={item.title}
							href={item.link}
							underline="hover"
							sx={{ fontSize: "18px" }}
						>
							{item.title}
						</Link>
					</ListItem>
				))}
			</List>
		</Box>
	);
	
	useEffect(() => {
		if (!profile && userProfile) {
			dispatch(setProfile(userProfile));
		}
		setContainer(
			typeof window !== "undefined" ? window.document.body : undefined,
		);
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				component="nav"
				elevation={scrollDownFlag ? 6 : 0}
				sx={{
					backgroundColor: scrollDownFlag ? "#D9D9D9" : "transparent",
					color: "#4A4642",
					transition: scrollDownFlag ? "0.3s" : "0.5s",
					boxShadow: "none",
					py: 2,
				}}
			>
				<Toolbar
					sx={{
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					{/* Mobile: 漢堡選單按鈕 */}
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{
							display: { md: "none" },
							justifyContent: "flex-start",
							flex: "0 1 96px",
						}}
					>
						<MenuIcon />
					</IconButton>
					{/* Desktop: Menu*/}
					<Box
						sx={{
							display: { xs: "none", md: "inline-flex" },
							flex: "0 1 500px",
						}}
					>
						{linkTitles.map((item) => (
							<Link
								color="inherit"
								fontSize="inherit"
								underline="hover"
								noWrap
								key={item.title}
								href={item.link}
								sx={{
									py: 1,
									px: 3,
								}}
							>
								{item.title}
							</Link>
						))}
					</Box>

					<Button
						component={NextLink}
						href="/"
						sx={{
							height: { xs: "30px", md: "48px" },
							flex: "1 1 auto",
							justifyContent: "center",
						}}
					>
						<Image
							src={scrollDownFlag ? LogoHeader2 : LogoHeader1}
							fill={true}
							alt="揪好咖"
							style={{
								transition: scrollDownFlag ? "0.3s" : "0.5s",
							}}
							priority={true}
						/>
					</Button>

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

export default Header;
