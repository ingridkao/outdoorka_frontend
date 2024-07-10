"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  getCookie,
  USER_T0KEN_COOKIE,
  OG_TOK0N_COOKIE,
} from "@/utils/cookieHandler";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Facebook from "@/components/layout/icons/facebook";
import Instagram from "@/components/layout/icons/instagram";
import Xtwitter from "@/components/layout/icons/xtwitter";
import LogoImage from "@/public/images/logoFooter.png";

const SendButton = () => (
  <Button href="#text-buttons" color="inherit">
    送出
  </Button>
);

function Footer() {
  const theme = useTheme();
  const titleItem = ["聯絡資訊", "更多探索", "帳號資訊"]
  const [subItem, setSubItem] = useState<{
    title: string;
    link: string;
    disabled: boolean;
  }[][]>([]);

  useEffect(() => {
    const getUserT0ken = getCookie(USER_T0KEN_COOKIE);
    const getOgT0ken = getCookie(OG_TOK0N_COOKIE);
    const newItem = [
      [
        { title: "關於我們", link: "/about", disabled: false },
        { title: "聯絡我們", link: "#", disabled: true },
        { title: "常見問題", link: "#", disabled: true },
        { title: "使用者條款", link: "#", disabled: true },
      ],
      [
        { title: "活動介紹", link: "/activities", disabled: false },
        { title: "優良主揪", link: "#", disabled: true },
        { title: "短影音", link: "#", disabled: true },
        { title: "Blog", link: "#", disabled: true },
      ]
    ]
    if (getUserT0ken) {
      newItem.push([
        { title: "我的帳號", link: "/user/profile/", disabled: false },
        { title: "我的收藏", link: "/favorites", disabled: false },
        { title: "我的票券", link: "/ticket", disabled: false },
      ])
    } else if (getOgT0ken) {
      newItem.push([
        { title: "我的帳號", link: "/organizer/profile", disabled: false },
        { title: "我的活動", link: "/organizer/activity/", disabled: false },
      ])
    }
    setSubItem(newItem)

  }, []);

  return (
    <Box component="footer" bgcolor="#171C22">
      <Box
        component="section"
        px={4}
        py={10}
        margin="auto"
        maxWidth="1280px"
        sx={{
          [theme.breakpoints.down("md")]: {
            px: "40px",
          },
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          color="#A9ABB1"
          justifyContent="space-between"
          sx={{
            [theme.breakpoints.down("md")]: {
              justifyContent: "center",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              mb: "16px",
              [theme.breakpoints.down("md")]: {
                mb: 0,
                width: "100%",
              },
            }}
          >
            <Image
              src={LogoImage}
              width={268}
              height={49}
              alt="揪好咖"
              priority={true}
            />
            <Box component="section">
              <Box component="p" mt="24px" mb="8px">
                © 揪好咖專題使用{" "}
              </Box>
              <Box component="p" mb="0">
                {" "}
                Handwritten Font by Chenyuluoyan
              </Box>
            </Box>
            <Box
              width="100%"
              my={7}
              sx={{
                display: "none",
                [theme.breakpoints.down("md")]: {
                  display: "block",
                },
              }}
            >
              訂閱電子報
              <Box
                component="section"
                marginTop={2}
                bgcolor="#FFFF"
                borderRadius={2}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  InputProps={{ endAdornment: <SendButton /> }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            flexWrap="wrap"
            sx={{
              [theme.breakpoints.down("md")]: {
                justifyContent: "flex-start",
                width: "100%",
              },
            }}
          >
            {subItem.map((list, listIndex) => (
              <List
                key={listIndex}
                sx={{
                  padding: 0,
                  mr: 9.5,
                  [theme.breakpoints.down("md")]: {
                    width: "50%",
                    pr: 2,
                    mr: 0,
                    mb: 5,
                  },
                }}
              >
                <span style={{
                  marginBottom: 20,
                  display: "block",
                }}>
                  {titleItem[listIndex]}
                </span>
                {list.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      p: 0,
                    }}
                  >
                    <MuiLink 
                      component={NextLink} 
                      href={item.link}
                      className={item.disabled ? "disabled-link" : ""}
                      sx={{
                        mb: 2,
                        color: "#EDF1F9",
                      }}
                    >
                      {item.title}
                    </MuiLink>
                  </ListItem>
                ))}
              </List>
            ))}
            <Box
              sx={{
                [theme.breakpoints.down("md")]: {
                  width: "50%",
                },
              }}
            >
              <List sx={{ padding: 0 }}>
                <ListItem sx={{ padding: 0 }}>
                  <ListItemText
                    primary={
                      <span
                        style={{
                          marginBottom: 12,
                          color: "#A9ABB1",
                          display: "block",
                        }}
                      >
                        追蹤我們
                      </span>
                    }
                  />
                </ListItem>
                <Box
                  component="section"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  flexWrap="wrap"
                  mb="2"
                >
                  <Facebook />
                  <Instagram />
                  <Xtwitter />
                </Box>
              </List>
              <Box
                sx={{
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                }}
              >
                訂閱電子報
                <Box
                  component="section"
                  marginTop={2}
                  bgcolor="#FFFF"
                  borderRadius={2}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    InputProps={{ endAdornment: <SendButton /> }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
