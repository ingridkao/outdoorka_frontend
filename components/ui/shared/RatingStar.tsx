"use client";

import React from "react";
import { Box } from "@mui/material";
import StarFullIcon from "@/components/icon/starFullIcon";
import StarEmptyIcon from "@/components/icon/starEmptyIcon";

function RatingStars({ rating = 0 }: { rating: number }) {
	const RatingStarsStyle = {
		mr: "2px",
		width: "12px",
		height: "12px",
	};
	return (
		<Box sx={{ height: "16px" }}>
			{Array.from({ length: rating }, (_, i) => (
				<StarFullIcon
					key={`start-full-${i}`}
					sx={RatingStarsStyle}
					color="action"
				/>
			))}
			{Array.from({ length: 5 - rating }, (_, i) => (
				<StarEmptyIcon
					key={`start-${i}`}
					sx={RatingStarsStyle}
					color="action"
				/>
			))}
		</Box>
	);
}

export default RatingStars;
