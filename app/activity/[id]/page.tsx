"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Container,
  IconButton,
  Paper,
  Rating,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import TimeIcon from "@/components/icon/timeIcon";
import PlaceIcon from "@/components/icon/placeIcon";
import LinkIcon from "@/components/icon/linkIcon";
import RatingIcon from "@/components/icon/ratingIcon";
import RatingEmptyIcon from "@/components/icon/ratingEmptyIcon";
import HikingIcon from "@/components/icon/hikingIcon";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { format, parseISO } from "date-fns";
import axios from "@/plugins/api/axios";
import CircularLoading from "@/components/ui/loading/CircularLoading";
import { ActivityTag } from "@/types/enum/activity";
import { decodeContent } from "@/utils/common";

const StyledRating = styled(Rating)({
  marginBottom: "8px",
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const StyledImageBox = styled(Box)({
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  height: "100%",
});

const dayOfWeekMap = {
  Monday: "週一",
  Tuesday: "週二",
  Wednesday: "週三",
  Thursday: "週四",
  Friday: "週五",
  Saturday: "週六",
  Sunday: "週日",
};

// const eventHistory = ["2024-03-01 修改報名結束時間", "2024-02-29 修改報名費用"];

const formatTime = (startTime: string, endTime = "") => {
  const startDateTime = parseISO(startTime);
  const endDateTime = endTime ? parseISO(endTime) : null;

  // 生成英文格式的日期時間字串
  const formattedStartTime = format(startDateTime, "yyyy/MM/dd iiii HH:mm");
  const formattedEndTime = endDateTime ? format(endDateTime, "HH:mm") : null;

  // 分割日期和星期，轉換星期至中文
  const [date, dayOfWeek, startTimeOnly] = formattedStartTime.split(" ");
  const dayOfWeekChinese = dayOfWeekMap[dayOfWeek as keyof typeof dayOfWeekMap];

  const timezoneOffset = new Date().getTimezoneOffset() / -60;
  const timezoneFormat =
    timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;

  return formattedEndTime
    ? `${date} ${dayOfWeekChinese} ${startTimeOnly} - ${formattedEndTime} (GMT${timezoneFormat})`
    : `${date} ${dayOfWeekChinese} ${startTimeOnly}`;
};

// 倒數計時 Timer
let leftTimer: any = null;

function Activity({ params }: { params: { id: string } }) {
  const { activity, favorite } = axios;
  const router = useRouter();
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [activityData, setActivityData] = React.useState<any>({});
  const [listItemData, setListItemData] = React.useState<any[]>([]);

  useEffect(() => {
    if (params.id) {
      activity.getActivityDetail(params.id).then((res: any) => {
        // 設定活動資料
        res.data.activityDetail = decodeContent(res.data.activityDetail);
        setActivityData(res.data);

        // 設定列表資料
        const tempListItemData = [
          {
            icon: <TimeIcon />,
            label: "時間：",
            value: formatTime(
              res.data.activityStartTime,
              res.data.activityEndTime,
            ),
          },
          {
            icon: <PlaceIcon />,
            label: "地址：",
            value: res.data.address,
          },
          {
            icon: <PlaceIcon />,
            label: "集合點：",
            value: res.data.location,
          },
        ];
        if (res.data.activityLinks?.length) {
          res.data.activityLinks.forEach((link: any) => {
            tempListItemData.push({
              icon: <LinkIcon />,
              label: "相關連結：",
              value: (
                <a href={link.url} target="_blank">
                  {link.name}
                </a>
              ),
            });
          });
        }
        setListItemData(tempListItemData);

        // 設定倒數計時
        setTimeLeftFunc(res.data);
      });
    }
  }, []);

  const setTimeLeftFunc = (data: any) => {
    if (leftTimer) {
      clearTimeout(leftTimer);
    }

    if (data?._id && data.activitySignupEndTime) {
      const now = new Date();
      const endDate: Date = new Date(data.activitySignupEndTime);
      // 計算時間差 轉換為秒
      const totalSeconds: number = (endDate.getTime() - now.getTime()) / 1000;

      if (totalSeconds <= 0 && data?._id) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const seconds = Math.floor(totalSeconds) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
      leftTimer = setTimeout(() => {
        setTimeLeftFunc(data);
      }, 1000);
    }
  };

  const paragraphs = (activityNote: string) =>
    activityNote.split(/\r?\n/g).map((line: string, index: number) => (
      <ListItem
        key={index}
        sx={{
          color: "#74777D",
          marginTop: 1,
          marginBottom: 1,
          p: 0,
          lineHeight: 1,
          fontSize: 16,
        }}
      >
        <ListItemText primary={line} sx={{ m: 0 }} />
      </ListItem>
    ));

  const paragraphsNote = (activityDetail: string) => {
    // 將<p>標籤內容提取出來，並將/n替換為<br />
    const paragraphs = activityDetail
      .replace(/<br>/g, "\n")
      .split(/<\/?p>/)
      .filter((text: string) => text.trim() !== "");
    return paragraphs.map((paragraph, index) => {
      const lines = paragraph.split(/\r?\n/g).map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line}
          {/* {lineIndex < paragraph.split(/\r?\n/g).length - 1 && <br />} */}
        </React.Fragment>
      ));

      return (
        <Typography
          key={index}
          variant="body1"
          paragraph
          sx={{ color: "#74777D" }}
        >
          {lines}
        </Typography>
      );
    });
  };

  const toggleFavorite = async () => {
    try {
      if (activityData.isLiked) {
        await favorite.removeFavorite(activityData._id);
        setActivityData((data: any) => ({ ...data, isLiked: false }));
      } else {
        await favorite.addFavorite(activityData._id);
        setActivityData((data: any) => ({ ...data, isLiked: true }));
      }
      // TODO reload isLike info
    } catch (error: any) {
      console.error(String(error?.message));
    }
  };

  const linkToInfo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/check/amount/${activityData._id}`);
  };

  return (
    <MainLayout>
      <Container
        component="div"
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {!activityData?._id ? (
          <CircularLoading />
        ) : (
          <>
            <Box display="flex" width="100%" height={500} mb={3}>
              <StyledImageBox
                sx={{
                  flex: 2,
                  backgroundImage: `url("${activityData.activityImageUrls[0]}")`,
                  mr: 3,
                  borderRadius: "12px",
                }}
              />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <StyledImageBox
                  sx={{
                    flex: 1,
                    backgroundImage: `url("${activityData.activityImageUrls[1] || "/images/sample_two.png"}")`,
                    mb: 3,
                    borderRadius: "12px",
                  }}
                />
                <StyledImageBox
                  sx={{
                    flex: 1,
                    backgroundImage: `url("${activityData.activityImageUrls[2] || "/images/sample_three.jpeg"}")`,
                    borderRadius: "12px",
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box flex={2}>
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "#EDF1F9",
                    borderRadius: "25px",
                    padding: 5,
                    mb: 3,
                  }}
                >
                  <Box
                    mb="24px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <List
                      sx={{ padding: 0, display: "flex", alignItems: "center" }}
                    >
                      {activityData.activityTags.map((detail: string) => (
                        <ListItem
                          key={detail}
                          sx={{
                            mr: 2,
                            backgroundColor: "#D1E4FF",
                            borderRadius: "8px",
                            color: "#001D36",
                            px: "12px",
                            py: "6px",
                            textAlign: "center",
                            width: "auto",
                          }}
                        >
                          <ListItemText
                            primary={
                              ActivityTag[detail as keyof typeof ActivityTag]
                            }
                            sx={{ m: 0, fontSize: 14, lineHeight: 1 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box display="flex" alignItems="center">
                      <Box display="flex" alignItems="center">
                        <HikingIcon />
                        <Box
                          ml="8px"
                          mr="24px"
                          fontWeight="500"
                          color="#74777D"
                        >
                          {activityData.bookedCapacity}人已參加
                        </Box>
                      </Box>

                      <IconButton
                        sx={{
                          border: "1px solid #8D9199",
                          borderRadius: "25px",
                          p: "6px 16px",
                        }}
                        onClick={toggleFavorite}
                      >
                        <FavoriteIcon
                          sx={{
                            color: activityData.isLiked ? "#FF0000" : "#22252A",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
                  >
                    {activityData.subtitle}
                  </Typography>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontSize: 44,
                      color: "#22262C",
                      mb: 3,
                      fontWeight: 700,
                    }}
                  >
                    {activityData.title}
                  </Typography>
                  {listItemData.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        color: "#74777D",
                        marginBottom: 1,
                        p: 0,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: 24, mr: 1 }}>{item.icon}</Box>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 16 }}
                        sx={{
                          m: 0,
                          flex: "none",
                          width: 85,
                          fontSize: 16,
                        }}
                      />
                      {typeof item.value === "string" ? (
                        <ListItemText
                          primary={item.value}
                          primaryTypographyProps={{ fontSize: 16 }}
                          sx={{ m: 0 }}
                        />
                      ) : (
                        item.value
                      )}
                    </ListItem>
                  ))}
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "#EDF1F9",
                    borderRadius: "25px",
                    padding: 5,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontSize: 24,
                      color: "#22262C",
                      mb: 2,
                      fontWeight: 700,
                    }}
                  >
                    活動簡介
                  </Typography>
                  {paragraphsNote(activityData.activityDetail)}

                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontSize: 24,
                      color: "#22262C",
                      mb: 2,
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  >
                    注意事項
                  </Typography>
                  <List sx={{ padding: 0 }}>
                    {paragraphs(activityData.activityNote)}
                  </List>
                </Paper>
                {/* <Paper
									elevation={0}
									sx={{
										backgroundColor: "#EDF1F9",
										borderRadius: "25px",
										padding: 5,
										mb: 3,
									}}
								>
									<Typography
										variant="h3"
										component="h3"
										sx={{
											fontSize: 24,
											color: "#22262C",
											mb: 2,
											fontWeight: 700,
										}}
									>
										活動異動歷史紀錄
									</Typography>
									<List sx={{ padding: 0 }}>
										{eventHistory.map((detail, index) => (
											<ListItem
												key={index}
												sx={{
													color: "#74777D",
													marginBottom: 1,
													p: 0,
													lineHeight: 1,
												}}
											>
												<ListItemText primary={detail} sx={{ m: 0 }} />
											</ListItem>
										))}
									</List>
								</Paper> */}
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "#EDF1F9",
                    borderRadius: "25px",
                    padding: 5,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontSize: 24,
                      color: "#22262C",
                      mb: 2,
                      fontWeight: 700,
                    }}
                  >
                    參加過的揪團仔評論
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: 16,
                      color: "#74777D",
                      mb: 5,
                      fontWeight: 700,
                    }}
                  >
                    目前尚無評論，推薦其他跟團仔！
                  </Typography>
                  <Button
                    sx={{
                      color: "#44474C",
                      backgroundColor: "#E1E2E9",
                      px: 6,
                      py: 2,
                    }}
                  >
                    前往評論活動
                  </Button>
                </Paper>
              </Box>
              <Box ml={3} width={408}>
                <Box display="flex" alignItems="center" px={2} py={3}>
                  <Avatar
                    sx={{ width: 64, height: 64, border: "1px solid #8D9199" }}
                    alt="Remy Sharp"
                    src={activityData.organizer.photo}
                  />
                  <Box ml={2}>
                    <StyledRating
                      name="customized-color"
                      defaultValue={activityData.organizer.rating}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={1}
                      icon={<RatingIcon size={"12"} />}
                      emptyIcon={<RatingEmptyIcon size={"12"} />}
                      readOnly
                    />
                    <Box sx={{ fontSize: 22 }}>
                      {activityData.organizer.name}
                    </Box>
                  </Box>
                </Box>
                <Box
                  px={3}
                  py={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius="25px 25px 12px 12px"
                  mb={1}
                  sx={{
                    backgroundColor: "#D1E4FF",
                  }}
                >
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        fontSize: 28,
                        color: "#22262C",
                        fontWeight: 700,
                        mr: 2,
                      }}
                    >
                      {activityData.organizer.rating}
                    </Typography>
                    <StyledRating
                      name="customized-color"
                      defaultValue={activityData.organizer.rating}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={1}
                      icon={<RatingIcon size={"25"} />}
                      emptyIcon={<RatingEmptyIcon size={"25"} />}
                      size="large"
                      readOnly
                    />
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontSize: 18, color: "#70AFF5", fontWeight: 700 }}
                  >
                    (0)
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "24px 24px 12px 12px",
                    p: "40px 32px 16px",
                    mb: 1,
                  }}
                >
                  <List sx={{ p: 0 }}>
                    <ListItem
                      sx={{
                        color: "#22262C",
                        marginBottom: 3,
                        p: 0,
                        lineHeight: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 24 }}
                        primary={"報名截止日期"}
                        sx={{ m: 0 }}
                      />
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 20 }}
                        primary={formatTime(activityData.activitySignupEndTime)}
                        sx={{ m: 0, color: "#B1AAA5" }}
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        color: "#22262C",
                        marginBottom: 3,
                        p: 0,
                        lineHeight: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 24 }}
                        primary={"剩餘人數"}
                        sx={{ m: 0 }}
                      />
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 20 }}
                        primary={`${activityData.remainingCapacity}人`}
                        sx={{ m: 0, color: "#B1AAA5" }}
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        color: "#22262C",
                        marginBottom: 3,
                        p: 0,
                        lineHeight: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 24 }}
                        primary={"報名費用"}
                        sx={{ m: 0 }}
                      />
                      <ListItemText
                        primaryTypographyProps={{ fontSize: 20 }}
                        primary={`NT$ ${activityData.price}`}
                        sx={{ m: 0, color: "#B1AAA5" }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    onClick={linkToInfo}
                    fullWidth
                    sx={{ backgroundColor: "#22252A", color: "#FFFFFF" }}
                  >
                    立即報名
                  </Button>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "12px 12px 24px 24px",
                    p: "32px 24px",
                    mb: 1,
                    backgroundImage: "url('/images/banner_bg.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 65%",
                    backgroundPositionY: "bottom",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontSize: 24,
                      color: "#000000",
                      mb: 3,
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    報名截止倒數
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#357ABC",
                        borderRadius: "25px",
                        p: "16px 24px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: 20,
                          marginRight: 0.5,
                          width: "24px",
                          textAlign: "center",
                        }}
                      >
                        {timeLeft.days}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>天</Typography>
                    </Box>
                    <Box
                      sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#357ABC",
                        borderRadius: "25px",
                        p: "16px 24px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: 20,
                          marginRight: 0.5,
                          width: "24px",
                          textAlign: "center",
                        }}
                      >
                        {timeLeft.hours}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>時</Typography>
                    </Box>
                    <Box
                      sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#357ABC",
                        borderRadius: "25px",
                        p: "16px 24px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: 20,
                          marginRight: 0.5,
                          width: "24px",
                          textAlign: "center",
                        }}
                      >
                        {timeLeft.minutes}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>分</Typography>
                    </Box>
                    <Box
                      sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#357ABC",
                        borderRadius: "25px",
                        p: "16px 24px",
                        display: "flex",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: 20,
                          marginRight: 0.5,
                          width: "24px",
                          textAlign: "center",
                        }}
                      >
                        {timeLeft.seconds}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>秒</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </MainLayout>
  );
}

export default Activity;
