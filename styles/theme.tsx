"use client";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
	palette: {
		primary: {
			main: "#22252A",
			light: "#FFFFFF",
			dark: "#EFF0F7",
		},
		secondary: {
			main: "#70AFF5",
			light: "#D1E4FF",
			dark: "#001D36",
		},
		tertiary: {
			main: "#E1E2E9",
			light: "#E9E1DC",
			dark: "#3C3834",
		},
		error: {
			main: "#BE565B",
			light: "#FFDAD9",
			dark: "#40000A",
		},
		info: {
			main: "#001D36",
			light: "#D1E4FF",
			dark: "#00497D",
		},
		background: {
			default: "#f8f9ff",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#22262C",
			secondary: "#B1AAA5",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 768,
			md: 1280,
			lg: 1848,
			xl: 1920,
		},
	},
	typography: {
		fontFamily: "Noto Sans TC, sans-serif",
		fontSize: 16,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	components: {
		MuiMenu: {
			styleOverrides: {
				paper: {
					px: 2,
					pt: 1,
					pb: 4,
					borderRadius: 0.75,
					backdropFilter: "invert(5%)",
					backgroundColor: "rgba(255, 255, 255, .8)",
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					borderRadius: "0.5rem 1.5rem 1.5rem 0.5rem",
					backgroundColor: "rgba(255, 255, 255, .9)",
				},
			},
		},
		MuiBackdrop: {
			styleOverrides: {
				root: {
					backgroundColor: "rgba(53, 122, 188, 0.6)",
				},
			},
		},
	},
	// shape: {
	// borderRadius: 32,
	// },
});

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#9BCBFB",
			light: "#0F4A73",
			dark: "#003353",
		},
		secondary: {
			main: "#A0CAFD",
			light: "#194975",
			dark: "#003258",
		},
		tertiary: {
			main: "#F7BB70",
			light: "#653E00",
			dark: "#462A00",
		},
		text: {
			primary: "#001D33",
			secondary: "#4A4458",
		},
		error: {
			main: "#FFB3B3",
			light: "#733336",
			dark: "#561D21",
		},
		info: {
			main: "#E0E2E8",
			light: "#FFFFFF",
			dark: "#101418",
		},
		background: {
			default: "#101418",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 800,
			lg: 1280,
			xl: 1920,
		},
	},
	typography: {
		fontFamily: "Noto Sans TC, sans-serif",
		fontSize: 16,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
});

export { lightTheme, darkTheme };
