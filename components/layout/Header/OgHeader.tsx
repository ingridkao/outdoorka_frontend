"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { getOrganizer } from "@/features/organizer/ogAuthSlice";
import { OG_TOK0N_COOKIE, getCookie } from "@/utils/cookieHandler";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import LogoHeader1 from "@/public/images/logoHeader_1.svg";

import { RootState } from "@/types";

function OgHeader() {
	const router = useRouter();
	const dispatch = useDispatch();
	const {profile} = useSelector((state: RootState) => state.ogAuth);
	
	useEffect(() => {
		const getOgToken = getCookie(OG_TOK0N_COOKIE);
		if (getOgToken) {
			dispatch(getOrganizer() as any).then((res: any) => {
				if (res.error?.message) {
					router.push("/organizer/login");
				}
			});
		}else{
			router.push("/organizer/login");
		}
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				component="nav"
				sx={{
					color: "#4A4642",

					boxShadow: "none",
				}}
			>
				<Toolbar
					sx={{
						justifyContent: "space-between",
						py: 2,
					}}
				>
					<Button component={NextLink} href="/organizer/activity">
						<Image
							src={LogoHeader1}
							width={100}
							height={48}
							alt="揪好咖"
							style={{
								transition: "0.3s",
								flexGrow: 1,
							}}
							priority={true}
						/>
					</Button>

					<Box>
						{profile && profile.photo && (
							<Stack direction="row" spacing={2}>
								<Avatar
									alt={profile.name}
									src={profile.photo}
									sx={{ width: 56, height: 56 }}
								/>
								<Button
									sx={{
										margin: "0 8px 0 0",
										borderRadius: "5px",
									}}
									component={NextLink}
									href="#"
								>
									<Typography
										variant="h6"
										component="h6"
										sx={{
											color: "#fff",
										}}
									>
										{profile.name}
									</Typography>
								</Button>
							</Stack>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default OgHeader;
