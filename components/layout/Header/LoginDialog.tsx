"use client";

import { SimpleDialogProps } from "@/types";
import {
	Box,
	Button,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@mui/material";

function SimpleDialog(props: SimpleDialogProps) {
	const { onClose, open } = props;
	const loginActions = [
		{
			title: "跟團仔",
			desc: "立刻參加活動、收藏感興趣的活動！",
			link: "/login",
			img: "/images/userBg.jpeg",
			icon: "/icons/users.svg",
		},
		{
			title: "主揪",
			desc: "發起活動揪好咖！",
			link: "/organizer/login",
			img: "/images/organizerBg.jpeg",
			icon: "/icons/organizer.svg",
		},
	];
	return (
		<Dialog onClose={() => onClose()} open={open}>
			<DialogTitle>登入/註冊</DialogTitle>
			<DialogContent>
				{loginActions.map((item) => (
					<Button
						key={item.link}
						href={item.link}
						sx={{
							display: "flex",
							height: "200px",
							px: 10,
							mb: 2,
							position: "relative",
							"&::before": {
								content: "''",
								position: "absolute",
								backgroundImage: `url(${item.img})`,
								backgroundSize: "cover",
								width: "100%",
								height: "100%",
								borderRadius: "24px",
								filter: "brightness(0.5)",
								zIndex: 0,
								transition: "filter 1s",
							},
							"&:hover::before": {
								filter: "brightness(0.2)",
							},
						}}
					>
						<Box
							sx={{
								zIndex: 1,
								width: "64px",
								height: "64px",
								backgroundImage: `url(${item.icon})`,
								backgroundSize: "contain",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
						/>
						<Box sx={{ zIndex: 1, width: "215px", color: "#fff", ml: 10 }}>
							<Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
								{item.title}
							</Typography>
							<Typography>{item.desc}</Typography>
						</Box>
					</Button>
				))}
			</DialogContent>
		</Dialog>
	);
}

export default SimpleDialog;
