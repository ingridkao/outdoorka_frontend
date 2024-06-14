"use client";

import { useState, useEffect, MouseEvent, SyntheticEvent } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { profileName, getProfileCookieObj } from "@/utils/cookieHandler";
import { RootState } from "@/types";
import { logoutUser, setProfile } from "@/features/user/authSlice";
import {
	Box,
	Avatar,
	IconButton,
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
	const userProfile = getProfileCookieObj(profileName);
	const { profile } = useSelector((x: RootState) => x.auth);

	const [isClient, setIsClient] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const open = Boolean(anchorEl);

	// 避免重新整理後redux沒有資料
	useEffect(() => {
		setIsClient(true);
		if (!profile && userProfile) {
			dispatch(setProfile(userProfile));
		}
		// TODO 部分頁面無登入必須轉到首頁
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
					{profile?.name.charAt(0).toUpperCase()}
				</Avatar>
				<Typography>{profile?.name}</Typography>
			</Box>
			<MenuItem onClick={handleProfile}>管理帳號</MenuItem>
			<MenuItem onClick={handleProfileMenuClose}>我的收藏</MenuItem>
			<MenuItem onClick={goToTicket}>我的票卷</MenuItem>
			<MenuItem onClick={handleLogout}>登出</MenuItem>
		</Box>
	);

	return (
		<Box
			sx={{
				flex: { xs: "0 1 95px", md: "0 1 500px" },
				justifyContent: "flex-end",
				textAlign: { md: "right" },
			}}
		>
			{isClient ? (
				!profile ? (
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
									<Avatar alt={profile.name}>
										{profile.name.charAt(0).toUpperCase()}
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
										CIAO! <b>{profile.name}</b>
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
								sx={{ mr: 1 }}
							>
								<Badge badgeContent={4} color="secondary">
									<Image src={TicketSvg} width={24} height={24} alt="ticket" />
								</Badge>
							</Button>

							<IconButton
								color="info"
								sx={{ display: { xs: "none", md: "block" } }}
							>
								<Badge badgeContent={4} color="secondary">
									<Image src={LikedSvg} width={24} height={24} alt="liked" />
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
	);
}

export default LoginAction;
