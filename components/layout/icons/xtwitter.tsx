import React from "react";
import Image from "next/image";
import { ListItemButton, ListItemText } from "@mui/material";
import twitterSvg from "@/public/icons/xtwitter.svg";

function Xtwitter() {
	return (
		<ListItemButton
			href="https://twitter.com/"
			target="_blank"
			sx={{
				paddingTop: 0.5,
				paddingBottom: 0.5,
				marginBottom: 2,
				marginRight: 1,
				backgroundColor: "#22252A",
				borderRadius: "10px",
			}}
		>
			<Image
				src={twitterSvg}
				width={16}
				height={18}
				alt="x-twitter"
				style={{
					marginRight: "8px",
				}}
			/>
			<ListItemText>X-twitter</ListItemText>
		</ListItemButton>
	);
}

export default Xtwitter;
