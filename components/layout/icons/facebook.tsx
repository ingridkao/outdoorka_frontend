import React from "react";
import Image from "next/image";
import { ListItemButton, ListItemText } from "@mui/material";
import facebookSvg from "@/public/icons/facebook.svg";

function Facebook() {
	return (
		<ListItemButton
			href="https://www.facebook.com/"
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
				src={facebookSvg}
				width={16}
				height={16}
				alt="facebook"
				style={{
					marginRight: "8px",
				}}
			/>
			<ListItemText>facebook</ListItemText>
		</ListItemButton>
	);
}

export default Facebook;
