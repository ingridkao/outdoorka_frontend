"use client";

import { useState, useEffect, MouseEvent, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import axios from "@/plugins/api/axios";

import { logoutUser } from "@/features/user/authSlice";
import {
	getCookie,
	getProfileCookieObj,
	USER_T0KEN_COOKIE,
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
import HeartIcon from "@/components/icon/HeartIcon";
import TicketIcon from "@/components/icon/TicketIcon";
import LogoutIcon from "@/components/icon/LogoutIcon";
import ProfileIcon from "@/components/icon/ProfileIcon";
import LoginDialog from "./LoginDialog";

function LoginAction() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [authUser, setAuthUser] = useState<{
		name: string;
		photo: string;
	} | null>(null);
	const [isClient, setIsClient] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const open = Boolean(anchorEl);

	const [suspenseCount, setSuspenseCount] = useState<number>(0);
	const [favoritesCount, setFavoritesCount] = useState<number>(0);
	const { ticket, favorite } = axios;
	async function loadData() {
		try {
			const [res1, res2] = await Promise.all([ ticket.getSuspenseTicketInfo(), favorite.getFavorites()])
			if (res1 && res1.data) {
				const unusedCount = res1.data.reduce((acc: number, item: any) => acc += (item.unused > 0) ?1: 0, 0);				
				setSuspenseCount(unusedCount);
			}
			if (res2 && res2.data) {
				setFavoritesCount(res2.data.length)
			}
		} catch (error) {
			console.error("Failed to fetch data: " + String(error));
		}
	}
	useEffect(() => {
		setIsClient(true);
		if (isClient) return;
		const getUserT0ken = getCookie(USER_T0KEN_COOKIE);
		if (getUserT0ken) {
			const profile = getProfileCookieObj();
			setAuthUser(profile);
			loadData();
		} else {
			router.push("/");
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
		setAuthUser(null);
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

	const MenuIconStyle = {
		mr: 1,
		width: 24,
		height: 24,
	};
	const profileMenu = (
		<Box
			sx={{
				borderRadius: 0.75,
				p: 2,
				backgroundColor: "#fff",
			}}
		>
			<Box
				sx={{
					display: "inline-flex",
					alignItems: "center",
					mb: 2,
				}}
			>
				<Avatar
					alt={authUser?.name}
					src={authUser?.photo}
					sx={{ width: 40, height: 40, mr: 1 }}
				/>
				<Typography>{authUser?.name}</Typography>
			</Box>
			<MenuItem onClick={handleProfile}>
				<ProfileIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
				<Typography>管理帳號</Typography>
			</MenuItem>
			<MenuItem onClick={goToFavorites}>
				<HeartIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
				<Typography>我的收藏</Typography>
			</MenuItem>
			<MenuItem onClick={goToTicket}>
				<TicketIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
				<Typography>我的票卷</Typography>
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				<LogoutIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
				<Typography>登出</Typography>
			</MenuItem>
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
			) : authUser ? (
				<>
					<Box display="inline-flex">
						<Chip
							onClick={handleProfileMenuClick}
							className="chipAvatar"
							avatar={
								<Avatar
									alt={authUser.name}
									src={authUser.photo}
								/>
							}
							label={
								<Typography
									color="#22252A"
									sx={{
										display: { xs: "none", md: "block" },
										pr: { xs: 0, md: 1 },
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
						<Button component={NextLink} href="/ticket" color="inherit">
							<Badge badgeContent={suspenseCount} color="secondary">
								<TicketIcon
									sx={{ width: 24, height: 24 }}
									fillcolor="#4a4642"
								/>
							</Badge>
						</Button>

						<Button
							component={NextLink}
							href="/favorites"
							color="inherit"
							sx={{ display: { xs: "none", md: "inline-flex" } }}
						>
							<Badge badgeContent={favoritesCount} color="secondary">
								<HeartIcon sx={{ width: 24, height: 24 }} fillcolor="#4a4642" />
							</Badge>
						</Button>
					</Box>
					<ClickAwayListener onClickAway={handleProfileMenuClose}>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleProfileMenuClose}
							transformOrigin={{ horizontal: "left", vertical: "top" }}
							anchorOrigin={{ horizontal: "left", vertical: "top" }}
							PaperProps={{
								sx: {
									width: 336,
									px: 2,
									pt: 1,
									pb: 4,
									borderRadius: 0.75,
									backdropFilter: "invert(5%)",
									backgroundColor: "rgba(255, 255, 255, .5)",
								},
							}}
						>
							{profileMenu}
						</Menu>
					</ClickAwayListener>
				</>
			) : (
				<Box display="inline-flex">
					<Button color="inherit" onClick={() => setDialogOpen(true)}>
						登入 | 註冊
					</Button>
					<LoginDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
				</Box>
			)}
		</Box>
	);
}

export default LoginAction;
