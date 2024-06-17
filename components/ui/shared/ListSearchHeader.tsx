/* eslint-disable no-unused-vars */
"use client";

import {
	Box,
	Button,
	Typography,
	Input
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

function ListSearchHeader(props: { 
	title: string; 
	subTitle: string; 
	search: string; 
  onSearch: (value: string) => void;
}) {
	const theme = useTheme();
	const { title, subTitle, search, onSearch } = props;

	return (
		<Box
			sx={{
				width: "100%",
				mb: 2,
				color: theme.palette.text.primary,
				background:
					"linear-gradient(270deg, rgba(196, 221, 255, 0.18) 0%, #C4DDFF 100%)",
				borderRadius: "48px",
				p: 5,
			}}
		>
			<Typography
				variant="h4"
				sx={{
					color: theme.palette.text.primary,
				}}
			>
				{title}
			</Typography>
			<Typography
				sx={{
					color: theme.palette.text.disabled,
				}}
			>
				{subTitle}
			</Typography>
			<Box className="search" sx={{ mt: "24px" }}>
				<Input
					value={search}
					disableUnderline={true}
					placeholder="縱走、浮潛、奇美博物館、陽明山"
					onChange={(e) => onSearch(e.target.value)}
				/>
				<Button variant="contained">
					<SearchIcon />
				</Button>
			</Box>
		</Box>
	);
}

export default ListSearchHeader;
