"use client";

import React from "react";
import Slider from "react-slick";
import HomeOrganizerCard from "./card/homeOrganizerCard";
import TitleSection from "@/components/layout/home/TitleSection";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, useTheme } from "@mui/material";

import orgainizerData from "@/_mock/organizerCarousel.json";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// TODO: 調整成共用元件
function HomeOrganizerCarousel() {
	return (
		<Box className="slider-container" sx={{ position: "relative" }}>
			<TitleSection title="優質主揪" />

			<Slider {...settings}>
				{orgainizerData.map((el, i) => (
					<HomeOrganizerCard
						key={i}
						{...el} // 直接傳遞 el 物件中的所有屬性
					/>
				))}
			</Slider>
		</Box>
	);
}

// TODO: 調整程式碼寫法及樣式
function SampleNextArrow(props) {
	const { onClick } = props;
	const theme = useTheme();

	return (
		<IconButton
			sx={{
				color: theme.palette.secondary.main,
				...arrowBtnConfig,
				right: "-62px",
			}}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faAngleRight} />
		</IconButton>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	const theme = useTheme();

	return (
		<IconButton
			sx={{
				color: theme.palette.secondary.main,
				...arrowBtnConfig,
				left: "-84px",
			}}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faAngleLeft} />
		</IconButton>
	);
}

const arrowBtnConfig = {
	top: "45%",
	border: 1,
	position: "absolute",
	paddingX: "16px",
	paddingY: "28px",
	borderColor: "#DFE2EB",
	borderRadius: "100px",
};

const settings = {
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	// autoplay: true, // 自動播放
	autoplaySpeed: 3000, // 自動播放的間隔時間（毫秒）
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
};

export default HomeOrganizerCarousel;
