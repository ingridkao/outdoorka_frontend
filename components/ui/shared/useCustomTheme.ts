import { useTheme } from "@mui/material/styles";

export default function useCustomTheme() {
	const theme = useTheme();
	return {
		h2Style: {
			fontSize: "44px",
			fontWeight: "700",
			color: theme.palette.text.primary,
			mb: 2,
		},
		h3Style: {
			fontSize: "24px",
			fontWeight: "700",
			color: "#74777D",
			mb: 1,
		},
		descStyle: {
			color: "#74777D",
			my: 0.5
		},
		paperStyle:{
			width: "100%",
			backgroundColor: "#EDF1F9",
			p: 5,
			borderRadius: 1,
		},
		accordionStyle: {
			backgroundColor: "#EDF1F9",
			px: 0,
			borderRadius: 5,
			width: "100%",
			maxWidth: "1016px",
		}
	};
}
