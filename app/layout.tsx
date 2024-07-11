"use client";

import { useMemo, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import {
  USER_T0KEN_COOKIE,
  OG_TOK0N_COOKIE,
  getCookie,
} from "@/utils/cookieHandler";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import initializeStore from "@/features/index";

import "@/styles/globals.css";
import "@/styles/customStyles.css";
import "@/styles/componentStyles.css";
import { lightTheme } from "@/styles/theme";
import { Dialog, DialogTitle } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const initialReduxState = {};

  const [dialogOpen, setDialogOpen] = useState(false);

  const store = useMemo(
    () => initializeStore(initialReduxState),
    [initialReduxState],
  );

  useEffect(() => {
    // 以下頁面不判斷權限
    if (
      pathname &&
      [
        "/",
        "/login/",
        "/register/",
        "/organizer/login/",
        "/organizer/register/",
        "/about/",
        "/activities/",
      ].includes(pathname)
    )
      return;
    const token = getCookie(USER_T0KEN_COOKIE);
    const getOgToken = getCookie(OG_TOK0N_COOKIE);
    if (!(token || getOgToken)) {
      setDialogOpen(true);
      router.replace("/");
    }
  }, [pathname, router]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <html lang="zh-TW">
      <head>
        <title>揪好咖 | 揪團系統</title>
        <meta name="description" content="揪好咖，戶外活動揪團系統" />
        <meta name="keywords" content="揪團, 戶外, 活動, 聚會, 社交" />
        <meta name="author" content="OUTDOORKA" />

        <meta property="og:title" content="戶外活動揪團系統" />
        <meta
          property="og:description"
          content="揪好咖讓你輕鬆揪團和參與各種戶外活動"
        />
        <meta
          property="og:image"
          content="https://outdoorka-frontend-ten.vercel.app/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fbanner_logo.f95006fb.png&w=256&q=75"
        />
        <meta
          property="og:url"
          content="https://outdoorka-frontend-ten.vercel.app/"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={lightTheme}>
          <Provider store={store}>{children}</Provider>

          <Dialog onClose={handleDialogClose} open={dialogOpen}>
            <div style={{ textAlign: "center", padding: "30px 0 3px 0" }}>
              <ErrorOutlineIcon sx={{ fontSize: 110, color: "#FFB3B3" }} />
            </div>
            <DialogTitle sx={{ mb: 2 }}>
              尚未登入，請先登入才可完整瀏覽!
            </DialogTitle>
          </Dialog>
        </ThemeProvider>
      </body>
    </html>
  );
}
