"use client";

import { Unstable_Grid2 as Grid, Box, Typography } from "@mui/material";
import HotActivities from "@/components/layout/home/HotActivities";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import useCardTheme from "@/components/ui/card/useCardTheme";

import "@fortawesome/fontawesome-svg-core/styles.css";

function About() {
  const cardStyle = useCardTheme();

  const h3Style = {
    fontSize: 24,
    fontWeight: 700,
    color: "#22252A",
    mb: 2,
    lineHeight: 1.5,
  }
  const h4Style = {
    fontSize: 22,
    fontWeight: 700,
    color: "#22252A",
    mt: 3
  }
  const bodyStyle = { 
    color: "#44474C", 
    fontWeight: 400,
    mb: 2,
  }
	return (
		<PageLayout>
			<Grid container justifyContent="center">
				<Grid 
          xs={12}
          sx={{
            width: {xs: "98%", sm:"96%"},
            mb: 2,
            mx: "auto",
            pb: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundImage: `url('/images/banner_bg.png')`,
            backgroundSize: "100% 60%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            borderRadius: 22
          }}
        >
          <Box my={8}>
            <img src="/images/banner_logo.png" alt="" />
          </Box>
          <Box sx={cardStyle.box}>
            <Typography variant="h3" sx={h3Style}>
              歡迎來到陽光活力的戶外活動揪團網站，我們是您最佳的戶外冒險夥伴！
            </Typography>
            <br/>
            <Typography variant="h4" sx={h4Style}>
              我們的使命
            </Typography>
            <Typography variant="body1" sx={bodyStyle}>
              我們致力於將所有熱愛戶外活動的人聚集在一起，讓每一場活動都充滿歡樂與挑戰。無論你是經驗豐富的冒險家還是剛剛踏上戶外之旅的新手，我們都為你準備了豐富多彩的活動，讓你盡情享受大自然的美好。
            </Typography>
            <Typography variant="h4" sx={h4Style}>
              我們的特色
            </Typography>
            <Typography variant="body1" sx={bodyStyle}>
              <b>成為主揪，策劃你的專屬活動！</b>在這裡，你可以發起徒步、登山、衝浪、露營等各類活動，招募志同道合的夥伴一起探險。無論是單日行程還是多日挑戰，你的創意都能在這裡大放異彩！
            </Typography>
            <Typography variant="body1" sx={bodyStyle}>
              <b>跟團仔們，準備好一起出發吧！</b>瀏覽我們的活動列表，選擇心儀的活動報名參加。結識新朋友、體驗新挑戰，每一次出行都將是難忘的回憶。我們的活動涵蓋了各種難度和類型，讓你輕鬆找到適合自己的冒險之旅。
            </Typography>
            <Typography variant="h4" sx={h4Style}>
              為什麼選擇我們？
            </Typography>
            <Typography variant="body1" sx={bodyStyle}>
              <b>豐富多樣的活動</b>：從海灘到山巔，從城市到荒野，我們的活動覆蓋各種地形和場景，滿足你對戶外的所有想像。
            </Typography>
            <Typography variant="body1" sx={bodyStyle}>
              <b>活力社群</b>：加入我們，你將成為這個充滿活力和陽光的社群一員，與大家一起分享戶外的樂趣和經驗。
            </Typography>
            <Typography variant="body1" sx={bodyStyle}>
              <b>個性化推薦</b>：根據你的興趣和活動偏好，我們為你推薦最適合的活動，讓每一次出行都更加精彩。
            </Typography>
            <br/>
            <Typography variant="h4" sx={h4Style}>
              無論是熱愛大自然的你，還是渴望突破自我的你，都能在這裡找到心儀的活動。
            </Typography>
          </Box>

				</Grid>
				<Grid sx={{ maxWidth: { sm: "850px", md: "1280px", lg: "1536px" } }}>
					<HotActivities count={4}/>
				</Grid>
			</Grid>
		</PageLayout>
	);
}

export default About;
