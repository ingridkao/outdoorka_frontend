"use client";

import { useState, useEffect, MouseEvent, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/user/authSlice";
import { logoutOrganizer } from "@/features/organizer/ogAuthSlice";
import { showLikes } from "@/features/user/likeSlice";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import axios from "@/plugins/api/axios";
import {
	getCookie,
	getProfileCookieObj,
	USER_T0KEN_COOKIE,
	OG_TOK0N_COOKIE,
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
	const { likesCount } = useSelector((state: any) => state.likes);
	const [authUser, setAuthUser] = useState<{
		name: string;
		photo: string;
	} | null>(null);
	const [isClient, setIsClient] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isOg, setIsOg] = useState(false);
	const open = Boolean(anchorEl);

	const [suspenseCount, setSuspenseCount] = useState<number>(0);
	const { ticket, organizer } = axios;
	async function loadData(user: boolean) {
		try {
			if (user) {
				dispatch(showLikes());
				const res = await ticket.getSuspenseTicketInfo();
				if (res && res.data) {
					const unusedCount = res.data.reduce(
						(acc: number, item: any) => (acc += item.unused > 0 ? 1 : 0),
						0,
					);
					setSuspenseCount(unusedCount);
				}
			} else {
				setIsOg(true);
				const res = await organizer.getOrganizer();
				if (res && res.data) {
					setAuthUser({
						name: res.data.name,
						photo: res.data.photo,
					});
				}
			}
		} catch (error) {
			console.error("Failed to fetch data: " + String(error));
		}
	}
	useEffect(() => {
		setIsClient(true);
		if (isClient) return;
		const getUserT0ken = getCookie(USER_T0KEN_COOKIE);
		const getOgT0ken = getCookie(OG_TOK0N_COOKIE);
		if (getUserT0ken) {
			const profile = getProfileCookieObj();
			setAuthUser(profile);
			loadData(true);
		} else if (getOgT0ken) {
			loadData(false);
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
		setAuthUser(null);
		if (isOg) {
			dispatch(logoutOrganizer());
			router.push("/organizer/login");
		} else {
			dispatch(logoutUser());
			router.push("/");
		}
	};

	const goToProfile = () => {
		handleProfileMenuClose(new Event("navigate"));
		if (isOg) {
			router.push("/organizer/profile");
		} else {
			router.push("/user/profile/");
		}
	};

	const goToTicket = () => {
		handleProfileMenuClose(new Event("ticket"));
		router.push("/ticket");
	};

	const goToFavorites = () => {
		handleProfileMenuClose(new Event("favorites"));
		router.push("/favorites");
	};

	const goToActivity = () => {
		handleProfileMenuClose(new Event("activity"));
		router.push("/organizer/activity/");
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
			<MenuItem onClick={goToProfile}>
				<ProfileIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
				<Typography>管理帳號</Typography>
			</MenuItem>
			{!isOg ? (
				<>
					<MenuItem onClick={goToFavorites}>
						<HeartIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
						<Typography>我的收藏</Typography>
					</MenuItem>
					<MenuItem onClick={goToTicket}>
						<TicketIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
						<Typography>我的票卷</Typography>
					</MenuItem>
				</>
			) : (
				<>
					<MenuItem onClick={goToActivity}>
						<TicketIcon sx={MenuIconStyle} fillcolor="#B1AAA5" />
						<Typography>活動列表</Typography>
					</MenuItem>
				</>
			)}
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
				textAlign: { md: "right" }
			}}
		>
			{!isClient ? (
				<Box></Box>
			) : authUser ? (
				<>
					<Box display="inline-flex" sx={{flexDirection:{ xs:"row-reverse",sm:"row"}}}>
						<Chip
							onClick={handleProfileMenuClick}
							className={`chipAvatar ${isOg ? "og" : ""}`}
							sx={{
								width: { xs: "48px", md: "auto" },
								pl: { xs: 1.5, md: 0 },
							}}
							avatar={<Avatar alt={authUser.name} src={authUser.photo} />}
							label={
								<Typography
									sx={{
										display: { xs: "none", md: "block" },
										pr: { xs: 0, md: 1 },
										color: isOg ? "#eff0f7" : "#22252A",
									}}
								>
									{isOg ? "主揪! " : "CIAO! "}
									<b>{authUser.name}</b>
								</Typography>
							}
						/>

						{!isOg && (
							<>
								<Button
									component={NextLink}
									href="/ticket"
									color="inherit"
									sx={{ ml: 1 }}
								>
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
									sx={{ display: { xs: "none", md: "inline-flex" }, ml: 1 }}
								>
									<Badge badgeContent={likesCount} color="secondary">
										<HeartIcon
											sx={{ width: 24, height: 24 }}
											fillcolor="#4a4642"
										/>
									</Badge>
								</Button>
							</>
						)}
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
