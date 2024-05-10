import React from "react";

import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Button,
} from "@mui/material";

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

const socialLinks = [
	{
		title: "facebook",
		link: "#",
		src: "images/facebook.png",
		alt: "facebook",
	},
	{
		title: "instagram",
		link: "#",
		src: "images/instagram.png",
		alt: "instagram",
	},
	{
		title: "x-twitter",
		link: "#",
		src: "images/Vector.png",
		alt: "x-twitter",
	},
];
const SendButton = () => (
	<Button href="#text-buttons" color="inherit">
		送出
	</Button>
);

function Footer() {
	return (
		<div>
			<Box component="footer" bgcolor="#171C22">
				<Box
					component="section"
					paddingTop={10}
					paddingBottom={10}
					margin="auto"
					width="90%"
				>
					<Box
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						gap={2}
						color="#A9ABB1"
					>
						<Box
							gridColumn="span 3"
							display="flex"
							flexDirection="column"
							justifyContent="space-around"
						>
							<Box
								component="img"
								marginBottom={2}
								width="268px"
								height="49px"
								src="images/logoFooter.png"
							></Box>
							<Box component="section">
								<Box component="p">© 揪好咖專題使用 </Box>
								<Box component="p"> Handwritten Font by Chenyuluoyan</Box>
							</Box>
						</Box>
						<Box
							gridColumn="span 9"
							display="flex"
							flexDirection="row"
							justifyContent="space-around"
						>
							{items.map((list) => (
								<List sx={{ padding: 0 }}>
									{list.item.map((value, index) => (
										<ListItem sx={{ padding: 0 }}>
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
											{/* {value} */}
										</ListItem>
									))}
								</List>
							))}
							<Box>
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
									>
										{socialLinks.map((value) => (
											<ListItemButton
												sx={{
													paddingTop: 0.5,
													paddingBottom: 0.5,
													marginBottom: 2,
													marginRight: 1,
													backgroundColor: "#22252A",
													borderRadius: "10px",
												}}
											>
												<Box
													component="img"
													marginRight={0.5}
													src={value.src}
													alt={value.alt}
												></Box>
												<ListItemText>{value.title}</ListItemText>
											</ListItemButton>
										))}

										{/* <ListItemButton
											sx={{
												paddingTop: 0.5,
												paddingBottom: 0.5,
												marginBottom: 2,
												backgroundColor: "#22252A",
												borderRadius: "10px",
											}}
										>
											<Box
												component="img"
												marginRight={0.5}
												src="images/facebook.png"
												alt="facebook"
											></Box>
											<ListItemText>facebook</ListItemText>
										</ListItemButton>

										<ListItemButton>
											<Box
												component="img"
												marginRight={0.5}
												src="images/instagram.png"
												alt="instagram"
											></Box>
											<ListItemText>instagram</ListItemText>
										</ListItemButton>
										<ListItemButton>
											<Box
												component="img"
												marginRight={0.5}
												src="images/Vector.png"
												alt="x-twitter"
											></Box>
											<ListItemText>x-twitter</ListItemText>
										</ListItemButton> */}
									</Box>
								</List>

								<Box>
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
		</div>
	);
}

export default Footer;
