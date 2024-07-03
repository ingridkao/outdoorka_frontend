"use client";

// import React from "react";
import { Box, CircularProgress } from "@mui/material";

function CircularLoading() {
	return (
		<Box
			sx={{
				textAlign: "center",
				px: 0,
				py: 40,
			}}
		>
			<CircularProgress color="secondary" size={60} />
		</Box>
	);
}

export default CircularLoading;
