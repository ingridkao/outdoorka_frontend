import { useTheme } from "@mui/material/styles";

// chip: 圖片下方標示
export default function useCardTheme() {
	const theme = useTheme();
	return {
		container:{
			width: "100%",
			maxWidth: "29rem",
			m: "auto",
			borderRadius: "1.5rem",
			backgroundColor: theme.palette.background.default
		},
		topInfoWrapper:{
			position: "relative",
			Height: 244
		},
		topBg:{
			position: "relative",
			objectFit: "cover",
			borderTopLeftRadius: "1.5rem",
			borderTopRightRadius: "1.5rem",
			overflow: "hidden",
			"&::before": {
				content: "''",
				position: "absolute",
				width: "100%",
				height: "100%",
				background:
					"linear-gradient(180deg, transparent 50%, rgb(0,0,0,0.8) 100%)",
				pointerEvents: "none",
			},
		},
		topInfoTopRow: {
			position: "absolute",
			width: "100%",
			p: 1,
		},
		topInfoTopRightBtn: {
			top: 0,
			justifyContent: "flex-end",
		},
		topInfoTopMainRow: {
			bottom: 0,
			columnGap: 1,
			alignItems:"center",
		},
		chip: {
			display: "inline-flex",
			alignItems: "center",
			height: 36,
			borderRadius: 36,
			px: 0.25,
			py: 0,
			fontSize: "1rem",
			border: "1px solid rgba(255, 255, 255, .8)",
			backgroundColor: "rgba(255, 255, 255, .15)",
			backdropFilter: "invert(25%)", //毛玻璃效果
			color: theme.palette.background.default
		},
		chipIcon: {
			mr: 1,
			width: "1.5rem",
			height: "1.5rem",
			color: theme.palette.background.default
		},
		chipText: {
			textAlign: "right",
			fontSize: "1rem",
			fontWeight: "500",
		},
		chipOrganizerName: {
			display: "inline-block",
			color: theme.palette.background.default,
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			maxWidth: "7.5em",
			fontSize: "0.875rem",
			fontWeight: "400",
			lineHeight: 1
		},
		infoRow: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			letterSpacing: "0.25px",
			mb:1,
			color: theme.palette.text.secondary,
		},
		infoTitle: {
			marginTop: "1rem",
			fontWeight: "700",
			lineHeight: "2.25rem",
		}
	};
}
