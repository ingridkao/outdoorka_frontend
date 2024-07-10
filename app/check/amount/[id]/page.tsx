"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "@/plugins/api/axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HikingIcon from "@/components/icon/hikingIcon";
import PlusIcon from "@/components/icon/plusIcon";
import MinusIcon from "@/components/icon/minusIcon";
import StepperLayout from "@/components/layout/PaymentLayout/StepperLayout";
import CircularLoading from "@/components/ui/loading/CircularLoading";
import { ActivityTag } from "@/types/enum/activity";
import { formatTime } from "@/utils/formatTime";

function Amount() {
  const [quantity, setQuantity] = useState(1);
  const [activityData, setActivityData] = useState({});
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { activity } = axios;

  const listItemData = activityData
    ? [
        {
          value: formatTime(
            activityData?.activityStartTime,
            activityData?.activityEndTime,
          ),
        },
        { value: activityData?.address },
        { value: activityData?.location },
      ]
    : [];

  // 增加商品数量
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // 減少商品数量
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const paragraphs = (activityNote: string) =>
    activityNote.split("/n").map((line: string, index: number) => (
      <ListItem
        key={index}
        sx={{
          color: "#74777D",
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
      .split(/<\/?p>/)
      .filter((text: string) => text.trim() !== "");
    return paragraphs.map((paragraph, index) => {
      const lines = paragraph.split("/n").map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line}
          {lineIndex < paragraph.split("/n").length - 1 && <br />}
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

  const backPage = () => {
    router.back();
  };

  const nextPage = () => {
    router.push(`/check/details/${id}?quantity=${quantity}`);
  };

  useEffect(() => {
    if (id) {
      activity.getActivityDetail(id).then((res: any) => {
        setActivityData(res.data);
        setMounted(true);
      });
    }
  }, []);

  return (
    <StepperLayout>
      {mounted && (
        <Box>
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
              <List sx={{ padding: 0, display: "flex", alignItems: "center" }}>
                {activityData?.activityTags.map((detail, index) => (
                  <ListItem
                    key={index}
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
                      primary={ActivityTag[detail as keyof typeof ActivityTag]}
                      sx={{ m: 0, fontSize: 14, lineHeight: 1 }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center">
                  <HikingIcon />
                  <Box ml="8px" mr="24px" fontWeight="500" color="#74777D">
                    {activityData?.bookedCapacity}人已參加
                  </Box>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h3"
              component="h3"
              sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
            >
              {activityData?.subtitle}
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontSize: 44, color: "#22262C", mb: 3, fontWeight: 700 }}
            >
              {activityData?.title}
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
            sx={{ p: 5, backgroundColor: "#EDF1F9", mb: 3, color: "#24282D" }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, fontSize: 24 }}>
              聯絡須知
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              謝謝您，你應該先報名完成一堂打包課再報名下一堂。為保障消費者權益及社群活動品質，同一場合同時只能報名一堂課，透過多層驗證系統確保，購買屬於專打，系統將保留您一堂課單，取消其餘未報名完成之課單，敬請理解配合。
            </Typography>
          </Paper>
          <Accordion
            elevation={0}
            sx={{
              borderRadius: 1.5,
              border: 0,
              p: "42px 40px",
              backgroundColor: "#EDF1F9",
              boxShadow: "none",
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              活動簡介
            </AccordionSummary>
            <AccordionDetails>
              {paragraphsNote(activityData?.activityDetail)}
              <List sx={{ padding: 0 }}>
                {paragraphs(activityData?.activityNote)}
              </List>
            </AccordionDetails>
          </Accordion>
          <Card
            sx={{
              margin: "auto",
              bgcolor: "#FFFFFF",
              borderRadius: "12px",
              mt: 3,
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ px: 5, py: 4 }}>
              <Typography variant="h6" component="div" sx={{ mb: 5 }}>
                請填寫報名數量
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography
                  sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
                >
                  單價
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 28,
                  }}
                >
                  NT$ {activityData.price}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography
                  sx={{
                    fontSize: 24,
                    color: "#74777D",
                    mb: 1,
                    fontWeight: 700,
                  }}
                >
                  數量
                </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    disabled={quantity === 0}
                    onClick={handleDecrease}
                    sx={{
                      mb: 0,
                    }}
                  >
                    <MinusIcon />
                  </IconButton>
                  <Box sx={{ width: 68, fontSize: 28, textAlign: "center" }}>
                    {quantity}
                  </Box>
                  <IconButton
                    disabled={quantity >= activityData.remainingCapacity}
                    onClick={handleIncrease}
                    sx={{
                      mb: 0,
                    }}
                  >
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={3}
              >
                <Typography
                  sx={{ fontSize: 24, color: "#74777D", fontWeight: 700 }}
                >
                  總金額
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mt: 1, fontSize: 28 }}
                >
                  NT$ {activityData.price * quantity}
                </Typography>
              </Box>
            </CardContent>
            <Box px={5} pb={4} pt={1} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="medium"
                sx={{
                  bgcolor: "#E1E2E9",
                  color: "#22252A",
                  mr: 3,
                  boxShadow: "none",
                }}
                onClick={backPage}
              >
                返回
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                sx={{ boxShadow: "none" }}
                onClick={nextPage}
                disabled={quantity === 0}
              >
                下一步: 付款資料
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </StepperLayout>
  );
}

function WrappedAmountPage() {
  return (
    <Suspense fallback={<CircularLoading />}>
      <Amount />
    </Suspense>
  );
}

export default WrappedAmountPage;
