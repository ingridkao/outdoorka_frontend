"use client";

import NextLink from "next/link";
import Image from "next/image";
import ArrowLeftSvg from "@/public/icons/arrowLeft.svg";
import { Button, Typography } from "@mui/material";

function BackBtn({
	href = "/",
	name = "首頁",
}: {
	href: string;
	name: string;
}) {
	return (
		<Button
			component={NextLink}
			href={href}
			variant="text"
			sx={{
				display: "inline-flex",
				alignItems: "center",
			}}
		>
			<Image
				src={ArrowLeftSvg}
				width={24}
				height={24}
				alt="返回"
				style={{
					marginRight: "8px",
				}}
			/>
			<Typography>{name}</Typography>
		</Button>
	);
}

export default BackBtn;
