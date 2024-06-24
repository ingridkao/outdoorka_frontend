"use client";

import { useState, useEffect, MouseEvent, SyntheticEvent } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/user/authSlice";
import {
	getProfileCookieObj,
	getCookie,
	OG_TOK0N_COOKIE
} from "@/utils/cookieHandler";

import {
	Box,
	Avatar,
	Badge,
	Button,
	Typography,
	Menu,
	MenuItem,
	ClickAwayListener,
	Chip,
} from "@mui/material";
import TicketSvg from "@/public/icons/ticket.svg";
import LikedSvg from "@/public/icons/liked.svg";
import LoginDialog from "./LoginDialog";

function LoginAction() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [authUser, setAuthUser] = useState(null);
	const [isClient, setIsClient] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const open = Boolean(anchorEl);


	useEffect(() => {
		setIsClient(true);
		if(isClient) return
		const ogT0ken = getCookie(OG_TOK0N_COOKIE);
		if(ogT0ken){
			router.push("/organizer/activity-create");
		}
		const userObj = getProfileCookieObj();
		if(userObj){
			setAuthUser(userObj);
		}
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
		router.push("/");
	};

	const handleProfile = () => {
		handleProfileMenuClose(new Event("navigate"));
		router.push("/user/profile/");
	};

	const goToTicket = () => {
		handleProfileMenuClose(new Event("ticket"));
		router.push("/ticket");
	};

	const goToFavorites = () => {
		handleProfileMenuClose(new Event("favorites"));
		router.push("/favorites");
	};

	const profileMenu = (
		<Box
			sx={{
				margin: "0 auto 32px auto",
				borderRadius: "4px",
				padding: 2,
				backgroundColor: "#fff",
			}}
		>
			<Box sx={{ 
				display: "inline-flex", 
				alignItems: "center",
				marginBottom: 1
			}}>
				<Avatar sx={{ width: 40, height: 40, marginRight: 1 }}>
					{authUser?.name.charAt(0).toUpperCase()}
				</Avatar>
				<Typography>{authUser?.name}</Typography>
			</Box>
			<MenuItem onClick={handleProfile}>管理帳號</MenuItem>
			<MenuItem onClick={goToFavorites}>我的收藏</MenuItem>
			<MenuItem onClick={goToTicket}>我的票卷</MenuItem>
			<MenuItem onClick={handleLogout}>登出</MenuItem>
		</Box>
	);

	return (
		<Box
			sx={{
				flex: { xs: "0 1 112px", md: "0 1 500px" },
				justifyContent: "flex-end",
				textAlign: { md: "right" },
			}}
		>
			{!isClient ? (
				<Box></Box>
			) : (
				!authUser ? (
					<Box display="inline-flex">
						<Button color="inherit" onClick={() => setDialogOpen(true)}>
							登入 | 註冊
						</Button>
						<LoginDialog
							open={dialogOpen}
							onClose={() => setDialogOpen(false)}
						/>
					</Box>
				) : (
					<>
						<Box display="inline-flex">
							<Chip
								onClick={handleProfileMenuClick}
								className="chipAvatar"
								avatar={
									<Avatar alt={authUser.name}>
										{authUser.name.charAt(0).toUpperCase()}
									</Avatar>
								}
								label={
									<Typography
										color="#22252A"
										sx={{ 
											display: { xs: "none", md: "block" }, 
											pr: { xs: 0, md: 1 }
										}}
									>
										CIAO! <b>{authUser.name}</b>
									</Typography>
								}
								sx={{ 
									width: { xs: "48px", md: "auto" }, 
									pl: { xs: 1.5, md: 0 }, 
								}}
							/>
							<Button
								component={NextLink}
								href="/ticket"
								color="inherit"
							>
								<Badge badgeContent={4} color="secondary">
									<Image src={TicketSvg} width={24} height={24} alt="ticket" />
								</Badge>
							</Button>

							<Button
								component={NextLink}
								href="/favorites"
								color="inherit"
								sx={{ display: { xs: "none", md: "inline-flex" } }}
							>
								<Badge badgeContent={4} color="secondary">
									<Image src={LikedSvg} width={24} height={24} alt="favorites" />
								</Badge>
							</Button>

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
			)}
		</Box>
	);
}

export default LoginAction;
