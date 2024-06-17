"use client";

import { Grid, Skeleton } from "@mui/material";

function ListLoading() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} height="4rem"></Grid>
			{[1,2,3,4,5,6].map((value) => (
				<Grid item xs={12} sm={6} md={4} key={value}>
					<Skeleton variant="rectangular" width="100%" height={244} />
					<Skeleton width="50%" height="1.5rem"/>
					<Skeleton width="60%" height="1.5rem"/>
					<Skeleton width="100%" height="2rem"/>
				</Grid>
			))}
		</Grid>
	);
}

export default ListLoading;
