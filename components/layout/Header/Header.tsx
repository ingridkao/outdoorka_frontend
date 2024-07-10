"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AppBar,
  Box,
  List,
  ListItem,
  Drawer,
  Link,
  IconButton,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoHeader1 from "@/public/images/logoHeader_1.svg";
import LogoHeader2 from "@/public/images/logoHeader_2.svg";
import LoginAction from "./LoginAction";
export const drawerPaperStyle = {
  boxSizing: "border-box",
  width: 280,
  height: 587,
  mt: 2,
  ml: 2,
};

export const linkTitles = [
  { title: "關於我們", link: "/about", disabled: false },
  { title: "活動", link: "/activities", disabled: false },
  { title: "優良主揪", link: "#", disabled: true },
  { title: "Blog", link: "#", disabled: true },
  { title: "短影音", link: "#", disabled: true },
];

export function AsideDrawer(props: { drawerToggle: () => void }) {
  const { drawerToggle } = props;
  return (
    <Box>
      <IconButton onClick={drawerToggle}>
        <MenuIcon />
      </IconButton>
      <List sx={{ px: 2, py: 5 }}>
        {linkTitles.map((item) => (
          <ListItem
            key={item.title}
            sx={{
              py: 1,
              px: 3,
              mb: 1,
              justifyContent: "center",
            }}
          >
            <Link
              key={item.title}
              href={item.link}
              sx={{ fontSize: "18px" }}
              underline={item.disabled ? "none" : "hover"}
              className={item.disabled ? "disabled-link" : ""}
            >
              {item.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function Header() {
  const [container, setContainer] = useState<HTMLElement | undefined>(
    undefined,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollDownFlag = useScrollTrigger();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  useEffect(() => {
    setContainer(
      typeof window !== "undefined" ? window.document.body : undefined,
    );
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        elevation={scrollDownFlag ? 6 : 0}
        sx={{
          backgroundColor: scrollDownFlag ? "#D9D9D9" : "#FFFFFF",
          color: "#4A4642",
          transition: scrollDownFlag ? "0.3s" : "0.5s",
          boxShadow: "none",
          py: 2,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Mobile: 漢堡選單按鈕 */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              justifyContent: "flex-start",
              flex: "0 1 112px",
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Desktop: Menu*/}
          <Box
            sx={{
              display: { xs: "none", md: "inline-flex" },
              flex: "0 1 500px",
            }}
          >
            {linkTitles.map((item) => (
              <Link
                color="inherit"
                fontSize="inherit"
                noWrap
                key={item.title}
                href={item.link}
                underline={item.disabled ? "none" : "hover"}
                className={item.disabled ? "disabled-link" : ""}
                sx={{
                  py: 1,
                  px: 3,
                }}
              >
                {item.title}
              </Link>
            ))}
          </Box>
          <Link
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              height: { xs: "30px", md: "48px" },
              flex: "1 1 auto",
              justifyContent: "center",
              padding: 0,
              minWidth: 0,
            }}
          >
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={scrollDownFlag ? LogoHeader2 : LogoHeader1}
                layout="fill"
                objectFit="contain"
                alt="揪好咖"
                style={{
                  transition: scrollDownFlag ? "0.3s" : "0.5s",
                }}
                priority={false}
              />
            </Box>
          </Link>

          <LoginAction />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": drawerPaperStyle,
          }}
        >
          <AsideDrawer drawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
    </Box>
  );
}

export default Header;
