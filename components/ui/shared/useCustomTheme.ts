import { useTheme } from "@mui/material/styles";

export default function useCustomTheme() {
	const theme = useTheme();
	return {
		h2Style: {
			fontSize: "44px",
			fontWeight: 700,
			color: theme.palette.text.primary,
			mb: 2,
		},
		h3TitleStyle: {
			fontSize: 24,
			fontWeight: 700,
			color: "#74777D",
			mb: 1,
		},
		h3BodyStyle: {
			fontSize: 20,
			fontWeight: 700,
			color: "#24282D",
		},
		h4Style: {
			fontSize: 24,
			fontWeight: 700,
			color: "#74777D",
			mb: 1,
		},
		descStyle: {
			color: "#74777D",
			my: 0.5,
		},
		paperStyle: {
			width: "100%",
			p: 5,
			borderRadius: 1,
			backgroundColor: "#EDF1F9",
		},
		paperStyle2: {
			width: "100%",
			p: 5,
			my: 3,
			borderRadius: 1,
			backgroundColor: "#FFF",
			display: "flex",
			flexDirection: { xs: "column", sm: "row" },
			justifyContent: "space-between",
			border: "2px solid #DFE2EB",
		},
		accordionStyle: {
			backgroundColor: "#EDF1F9",
			px: 0,
			borderRadius: 5,
			width: "100%",
			maxWidth: "1016px",
		},
		labelStyle: {
			fontSize: "24px",
			fontWeight: 700,
			px: 3,
			py: 1,
			mb: 5,
			backgroundColor: "#FFDAD9",
		},
	};
}
