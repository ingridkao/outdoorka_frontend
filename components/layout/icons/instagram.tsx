import React from "react";
import Image from "next/image";
import { ListItemButton, ListItemText } from "@mui/material";
import instagramSvg from "@/public/icons/instagram.svg";

function Instagram() {
	return (
		<ListItemButton
			href="https://www.instagram.com/"
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
				src={instagramSvg}
				width={16}
				height={16}
				alt="instagram"
				style={{
					marginRight: "8px",
				}}
			/>
			<ListItemText>instagram</ListItemText>
		</ListItemButton>
	);
}

export default Instagram;
