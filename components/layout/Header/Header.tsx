"use client";

import { useState, useEffect, MouseEvent, SyntheticEvent } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCookieObj } from "@/utils/cookieHandler";
import { RootState } from "@/types";
import { logoutUser, setProfile } from "@/features/user/authSlice";
import MenuIcon from "@mui/icons-material/Menu";

import {
	AppBar,
	Box,
	List,
	ListItem,
	Typography,
	Drawer,
	Link,
	Avatar,
	IconButton,
	Badge,
	Button,
	Toolbar,
	Menu,
	MenuItem,
	ClickAwayListener,
	useScrollTrigger,
} from "@mui/material";

import LogoHeader1 from "@/public/images/logoHeader_1.svg";
import LogoHeader2 from "@/public/images/logoHeader_2.svg";
import TicketSvg from "@/public/icons/ticket.svg";
import LikedSvg from "@/public/icons/liked.svg";

const linkTitles = [
	{ title: "關於我們", link: "#" },
	{ title: "活動", link: "/activities" },
	{ title: "優良主揪", link: "#" },
	{ title: "Blog", link: "#" },
	{ title: "短影音", link: "#" },
];

function Header() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { profile } = useSelector((x: RootState) => x.auth);
	const userProfile = getProfileCookieObj();

	const [isClient, setIsClient] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [container, setContainer] = useState<HTMLElement | undefined>(
		undefined,
	);
	const [mobileOpen, setMobileOpen] = useState(false);
	const open = Boolean(anchorEl);

	const drawerWidth = 240;
	const scrollDownFlag = useScrollTrigger();

	useEffect(() => {
		setIsClient(true);
		if (!profile && userProfile) {
			dispatch(setProfile(userProfile));
		}
		setContainer(
			typeof window !== "undefined" ? window.document.body : undefined,
		);
	}, []);

	const handleProfileMenuClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileMenuClose = (event: Event | SyntheticEvent) => {
		if (anchorEl && anchorEl.contains(event.target as HTMLElement)) return;
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleProfileMenuClose(new Event("logout"));
		dispatch(logoutUser());
	};

	const handleProfile = () => {
		handleProfileMenuClose(new Event("navigate"));
		router.push("/user/profile/");
	};

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

	const profileMenu = (
		<Box
			sx={{
				margin: "0 auto 32px auto",
				borderRadius: "4px",
				padding: 2,
				backgroundColor: "#fff",
			}}
		>
			<Box sx={{ display: "inline-flex", marginBottom: 1 }}>
				<Avatar sx={{ width: 40, height: 40, marginRight: 1 }}>
					{profile?.name.charAt(0).toUpperCase()}
				</Avatar>
				<Typography>{profile?.name}</Typography>
			</Box>
			<MenuItem onClick={handleProfile}>管理帳號</MenuItem>
			<MenuItem onClick={handleProfileMenuClose}>我的收藏</MenuItem>
			<MenuItem onClick={handleProfileMenuClose}>我的票卷</MenuItem>
			<MenuItem onClick={handleLogout}>登出</MenuItem>
		</Box>
	);
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
				}}
			>
				<Toolbar
					sx={{
						width: "100vw",
						justifyContent: "space-between",
						flexWrap: "wrap",
						py: 2,
					}}
				>
					{/* Mobile: 漢堡選單按鈕 */}
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{
							display: { lg: "none" },
							justifyContent: "flex-start",
							flex: "0 1 96px",
						}}
					>
						<MenuIcon />
					</IconButton>
					{/* Desktop: Menu*/}
					<Box
						sx={{
							display: { xs: "none", lg: "inline-flex" },
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
							height: { xs: "30px", lg: "48px" },
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

					<Box
						sx={{
							flex: { xs: "0 1 96px", lg: "0 1 500px" },
							justifyContent: "flex-end",
							textAlign: { lg: "right" },
						}}
					>
						{isClient ? (
							!profile ? (
								<Box display="inline-flex" alignItems="center">
									<Button color="inherit" href="/login">
										登入
									</Button>
									|
									<Button color="inherit" href="/register">
										註冊
									</Button>
									｜
									<Button color="inherit" href="/organizer/login">
										主揪登入
									</Button>
								</Box>
							) : (
								<>
									<Box display="inline-flex">
										<IconButton
											onClick={handleProfileMenuClick}
											sx={{
												display: "inline-flex",
												justifyContent: "flex-start",
												mr: 1,
												borderRadius: "5rem",
												bgcolor: "#EFF0F7",
												p: 0,
											}}
										>
											{/*  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
											<Avatar
												sx={{
													width: 40,
													height: 40,
													border: "1px solid #fff",
													m: { xs: 0, lg: 1 },
												}}
											>
												{profile.name.charAt(0).toUpperCase()}
											</Avatar>
											<Typography
												color="#22252A"
												sx={{ display: { xs: "none", lg: "block" }, pr: 2 }}
											>
												CIAO! <b>{profile.name}</b>
											</Typography>
										</IconButton>

										<IconButton color="inherit" sx={{ mr: 1 }}>
											<Badge badgeContent={4} color="secondary">
												<Image
													src={TicketSvg}
													width={24}
													height={24}
													alt="ticket"
												/>
											</Badge>
										</IconButton>

										<IconButton
											color="info"
											sx={{ display: { xs: "none", lg: "block" } }}
										>
											<Badge badgeContent={4} color="secondary">
												<Image
													src={LikedSvg}
													width={24}
													height={24}
													alt="liked"
												/>
											</Badge>
										</IconButton>
									</Box>
									<ClickAwayListener onClickAway={handleProfileMenuClose}>
										<Menu
											id="account-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleProfileMenuClose}
											transformOrigin={{ horizontal: "left", vertical: "top" }}
											anchorOrigin={{ horizontal: "left", vertical: "top" }}
											PaperProps={{
												sx: {
													width: 336,
													px: 1,
													borderRadius: 1,
													backdropFilter: "invert(5%)",
													backgroundColor: "rgba(255, 255, 255, .5)",
												},
											}}
										>
											{profileMenu}
										</Menu>
									</ClickAwayListener>
								</>
							)
						) : (
							<Box></Box>
						)}
					</Box>
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
						display: { xs: "block", lg: "none" },
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
