"use client";

import TitleSection from "@/components/layout/home/TitleSection";
import Slider from "react-slick";
import HomeOrganizerCard from "./card/homeOrganizerCard";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, useTheme } from "@mui/material";

import organizerData from "@/_mock/organizerCarousel.json";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// TODO: 調整成共用元件
function HomeOrganizerCarousel() {
	return (
		<Box className="slider-container">
			<TitleSection title="優質主揪" />

			<Box sx={{ marginLeft: { sm: 0, xs: "-44px" } }}>
				<Slider {...settings}>
					{organizerData.map((el, i) => (
						<HomeOrganizerCard
							key={i}
							{...el} // 直接傳遞 el 物件中的所有屬性
						/>
					))}
				</Slider>
			</Box>
		</Box>
	);
}

// TODO: 調整程式碼寫法及樣式
function SampleNextArrow(props) {
	const { onClick } = props;
	const theme = useTheme();

	return (
		<IconButton
			className="slick-arrow"
			sx={{
				color: theme.palette.secondary.main,
				...arrowBtnConfig,
				right: { sm: "-64px", xs: "-44px" },
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
				left: "-64px",
				hidden: { sm: "block", xs: "none" },
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
	px: "16px",
	py: "28px",
	borderColor: "#DFE2EB",
	borderRadius: "100px",
};

const settings = {
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
	responsive: [
		{
			breakpoint: 1919,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 1119,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 376,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

export default HomeOrganizerCarousel;
