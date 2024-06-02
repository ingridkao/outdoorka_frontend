"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Box,
	List,
	ListItem,
	ListItemText,
	TextField,
	Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Facebook from "@/components/layout/icons/facebook";
import Instagram from "@/components/layout/icons/instagram";
import Xtwitter from "@/components/layout/icons/xtwitter";
import LogoImage from "@/public/images/logoFooter.png";

const items = [
	{
		item: ["聯絡資訊", "關於我們", "聯絡我們", "常見問題", "使用者條款"],
	},
	{
		item: ["更多探索", "活動介紹", "優良主揪", "短影音", "Blog"],
	},
	{
		item: ["帳號資訊", "我的帳號", "我的訂單", "我的票券"],
	},
];

const SendButton = () => (
	<Button href="#text-buttons" color="inherit">
		送出
	</Button>
);

function Footer() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up("sm"));

	return (
		<Box component="footer" bgcolor="#171C22">
			<Box
				component="section"
				px={4}
				py={10}
				margin="auto"
				maxWidth="1280px"
				sx={{
					[theme.breakpoints.down("md")]: {
						px: "40px",
					},
				}}
			>
				<Box
					display="flex"
					flexWrap="wrap"
					color="#A9ABB1"
					justifyContent="space-between"
					sx={{
						[theme.breakpoints.down("md")]: {
							justifyContent: "center",
						},
					}}
				>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="space-around"
						alignItems="center"
						sx={{
							mb: "16px",
							[theme.breakpoints.down("md")]: {
								mb: 0,
								width: "100%",
							},
						}}
					>
						<Image src={LogoImage} width={268} height={49} alt="揪好咖" />
						<Box component="section">
							<Box component="p" mt="24px" mb="8px">
								© 揪好咖專題使用{" "}
							</Box>
							<Box component="p" mb="0">
								{" "}
								Handwritten Font by Chenyuluoyan
							</Box>
						</Box>
						<Box
							width="100%"
							my={7}
							sx={{
								display: "none",
								[theme.breakpoints.down("md")]: {
									display: "block",
								},
							}}
						>
							訂閱電子報
							<Box
								component="section"
								marginTop={2}
								bgcolor="#FFFF"
								borderRadius={2}
							>
								<TextField
									fullWidth
									label="Email Address"
									InputProps={{ endAdornment: <SendButton /> }}
								/>
							</Box>
						</Box>
					</Box>

					<Box
						display="flex"
						flexDirection="row"
						justifyContent="space-around"
						flexWrap="wrap"
						sx={{
							[theme.breakpoints.down("md")]: {
								justifyContent: "flex-start",
								width: "100%",
							},
						}}
					>
						{items.map((list, listIndex) => (
							<List
								key={listIndex}
								sx={{
									padding: 0,
									mr: 9.5,
									[theme.breakpoints.down("md")]: {
										width: "50%",
										pr: 2,
										mr: 0,
										mb: 5,
									},
								}}
							>
								{list.item.map((value, index) => (
									<ListItem
										key={index}
										sx={{
											padding: 0,
										}}
									>
										<Link href="/">
											<ListItemText
												primary={
													<span
														style={{
															marginBottom: index === 0 ? 20 : 1,
															color: index === 0 ? "#A9ABB1" : "#EDF1F9",
															display: "block",
														}}
													>
														{value}
													</span>
												}
											/>
										</Link>
									</ListItem>
								))}
							</List>
						))}
						<Box
							sx={{
								[theme.breakpoints.down("md")]: {
									width: "50%",
								},
							}}
						>
							<List sx={{ padding: 0 }}>
								<ListItem sx={{ padding: 0 }}>
									<ListItemText
										primary={
											<span
												style={{
													marginBottom: 12,
													color: "#A9ABB1",
													display: "block",
												}}
											>
												追蹤我們
											</span>
										}
									/>
								</ListItem>
								<Box
									component="section"
									display="flex"
									flexDirection="row"
									justifyContent="space-around"
									flexWrap="wrap"
									mb="2"
								>
									<Facebook />
									<Instagram />
									<Xtwitter />
								</Box>
							</List>
							<Box
								sx={{
									[theme.breakpoints.down("md")]: {
										display: "none",
									},
								}}
							>
								訂閱電子報
								<Box
									component="section"
									marginTop={2}
									bgcolor="#FFFF"
									borderRadius={2}
								>
									<TextField
										fullWidth
										label="Email Address"
										InputProps={{ endAdornment: <SendButton /> }}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default Footer;
