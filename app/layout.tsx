"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import initializeStore from "@/features/index";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/customStyles.css";
import { lightTheme } from "@/styles/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialReduxState = {};

	const store = useMemo(
		() => initializeStore(initialReduxState),
		[initialReduxState],
	);

	return (
		<html lang="en">
			<head>
				<title>Outdoorka</title>
				<meta name="description" content="Generated by create next app" />
			</head>
			<body className={inter.className}>
				<ThemeProvider theme={lightTheme}>
					<Provider store={store}>{children}</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
