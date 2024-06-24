"use client";
import React, { useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "@/plugins/api/axios";
import { USER_T0KEN_COOKIE, getCookie } from "@/utils/cookieHandler";

import MainLayout from "@/components/layout/MainLayout/MainLayout";
import UserProfile from "@/components/layout/user/userProfile";
import ChangeEmail from "@/components/layout/user/changeEmail";
import ChangePassword from "@/components/layout/user/changePassword";

import {
	Box,
	Grid,
	ListItemIcon,
	MenuItem,
	MenuList,
	Typography,
} from "@mui/material";

const { user } = axios;

function UserPage() {
	const [userData, setUserData] = React.useState<any>({});
	const [switchTab, setSwitchTab] = React.useState(0);

	useEffect(() => {
		const token = getCookie(USER_T0KEN_COOKIE);
		if (!token) return console.log("no token");

		const fetchUser = async () => {
			const getUser = await user.getUser();
			if (!getUser || !getUser.data) return;
			setUserData(getUser.data);
		};

		fetchUser();
	}, []);

	const handleSwitchTab = (tab: number) => {
		setSwitchTab(tab);
	};

	return (
		<MainLayout>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<MenuList>
							<MenuItem
								selected={switchTab === 0}
								onClick={() => handleSwitchTab(0)}
							>
								{switchTab === 0 ? (
									<ListItemIcon>
										<KeyboardArrowRightIcon />
									</ListItemIcon>
								) : (
									<ListItemIcon></ListItemIcon>
								)}
								<Typography variant="inherit">個人資料</Typography>
							</MenuItem>
							<MenuItem
								selected={switchTab === 1}
								onClick={() => handleSwitchTab(1)}
							>
								{switchTab === 1 ? (
									<ListItemIcon>
										<KeyboardArrowRightIcon />
									</ListItemIcon>
								) : (
									<ListItemIcon></ListItemIcon>
								)}
								<Typography variant="inherit">變更Email</Typography>
							</MenuItem>
							<MenuItem
								selected={switchTab === 2}
								onClick={() => handleSwitchTab(2)}
							>
								{switchTab === 2 ? (
									<ListItemIcon>
										<KeyboardArrowRightIcon />
									</ListItemIcon>
								) : (
									<ListItemIcon></ListItemIcon>
								)}
								<Typography variant="inherit" noWrap>
									變更密碼
								</Typography>
							</MenuItem>
						</MenuList>
					</Grid>
					<Grid item xs={8}>
						{switchTab === 0 && userData && userData.email && (
							<UserProfile userData={userData} />
						)}

						{switchTab === 1 && userData && userData.email && (
							<ChangeEmail userData={userData} />
						)}

						{switchTab === 2 && userData && userData.email && (
							<ChangePassword userData={userData} />
						)}
					</Grid>
				</Grid>
			</Box>
		</MainLayout>
	);
}

export default UserPage;
