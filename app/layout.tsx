"use client";

import { useMemo, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { USER_T0KEN_COOKIE, OG_TOK0N_COOKIE,  getCookie } from "@/utils/cookieHandler";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import initializeStore from "@/features/index";

import "@/styles/globals.css";
import "@/styles/customStyles.css";
import "@/styles/componentStyles.css";
import { lightTheme } from "@/styles/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const pathname = usePathname()
	const initialReduxState = {};

	const store = useMemo(
		() => initializeStore(initialReduxState),
		[initialReduxState],
	);

	useEffect(() => {
		// 首頁不判斷權限
		if(pathname === "/") return
		// 註冊登入不判斷權限
		if(pathname && ["/login/", "/register/", "/organizer/login/", "/organizer/register/"].includes(pathname)) return

		const token = getCookie(USER_T0KEN_COOKIE);
		const getOgToken = getCookie(OG_TOK0N_COOKIE);
		if (!token && !getOgToken){
			router.push("/");
		}

	}, [pathname, router]);

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
