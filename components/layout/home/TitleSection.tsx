"use client";

import { Typography } from "@mui/material";

const TitleSection = ({ title }: { title: string }) => {
	return (
		<Typography
			component="h2"
			sx={{
				fontSize: "56px",
				fontWeight: "700",
				mt: 10,
				mb: 7.5,
				textAlign: "center",
				letterSpacing: "-0.25px",
				color: "#00497D",
			}}
		>
			{title}
		</Typography>
	);
};

export default TitleSection;
