"use client";

import { Grid, Skeleton, Box } from "@mui/material";

export function ActivitiesListLoading() {
	return (<>
		{[1, 2, 3, 4, 5].map((value:number) => (
			<Grid item xs={12} sm={6} md={4} key={value}>
				<Skeleton variant="rounded" width={464} height={310} />
				<Box sx={{p: 1}}>
					<Skeleton width="40%" variant="text" sx={{ fontSize: "1.75rem" }} />
					<Skeleton width="60%" variant="text" sx={{ fontSize: "1.75rem" }} />
					<Skeleton width="90%" height="2rem" />
				</Box>
			</Grid>
		))}
	</>);
}

function ListLoading() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} height="2rem"></Grid>
			<ActivitiesListLoading/>
		</Grid>
	);
}

export default ListLoading;
