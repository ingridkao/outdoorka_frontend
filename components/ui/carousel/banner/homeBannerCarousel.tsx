import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import banner01 from "@/public/images/banner01.jpeg";
import banner02 from "@/public/images/banner02.jpeg";
import banner04 from "@/public/images/banner04.jpeg";
import banner05 from "@/public/images/banner05.jpeg";
import BannerImage from "@/public/images/banner_logo.png";

import { Box, Button } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function homeBannerCarousel() {
  const originalImages = [
    {
      index: 1,
      src: banner01,
    },
    {
      index: 2,
      src: banner02,
    },
    {
      index: 3,
      src: banner04,
    },
    {
      index: 4,
      src: banner05,
    },
  ];
  const [images, setImages] = useState([...originalImages, ...originalImages]);
  const [index, setIndex] = useState(0);
  const visibleCount = 5; // 一次顯示的元素數
  const refIndex = useRef(index);

  const nextImage = () => {
    if (index === originalImages.length) {
      setIndex(0); // 重置為0以實現無縫循環
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    refIndex.current = index; // 更新 ref 的當前值
  }, [index]);

  return (
    <Box
      style={{
        width: "100%",
        height: "1010px",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
        display: "flex", // 使用 flexbox
        justifyContent: "flex-start", // 確保子元素從左側開始排列
        alignItems: "center", // 垂直居中
        flexDirection: "column",
        backgroundImage: "url(\"/images/banner_bg.png\")",
        backgroundSize: "100% 60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        borderRadius: "25px",
      }}
    >
      <Box mb={6}>
        <Image src={BannerImage} alt="banner" />
      </Box>
      <Box>
        <Button
          variant="outlined"
          onClick={prevImage}
          style={{
            position: "absolute",
            left: 48,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2, // 確保按鈕位於最上層
            color: "#70AFF5",
            padding: "29px 16px",
            borderColor: "#DFE2EB",
          }}
        >
          <ArrowBackIosNewIcon />
        </Button>
      </Box>
      <Box
        position="relative"
        maxWidth="1280px"
        height="773px"
        padding="2rem 0.5rem 5.75rem"
      >
        <Box>
          <Box
            style={{
              overflow: "hidden",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <Box
              style={{
                display: "flex",
                transition: "transform 0.4s ease-in",
                transform: `translateX(-${(index * 100) / visibleCount}%)`,
                maxWidth: "1492px",
              }}
            >
              {images.map((img, i) => (
                <Box
                  key={`${img.index}-${i}`}
                  style={{
                    height: "725px",
                    minWidth:
                      i % originalImages.length ===
                      (index + Math.floor(visibleCount / 2)) %
                        originalImages.length
                        ? "calc(30% - 16px)" // 宽度放大到两倍，高度保持不变
                        : "15%",
                    transition: "min-width 1.5s linear",
                    position: "relative",
                    margin: "0 16px",
                  }}
                >
                  <Image
                    src={img.src}
                    width={266}
                    height={725}
                    alt={`Background ${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Button
          variant="outlined"
          onClick={nextImage}
          style={{
            position: "absolute",
            right: 48,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            color: "#70AFF5",
            padding: "29px 16px",
            borderColor: "#DFE2EB",
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default homeBannerCarousel;
