"use client";

import { useState, useEffect } from "react";
import { ActivityState } from "@/types/ActivitiesType";

import {
	Box,
	Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useCardTheme from "@/components/ui/card/useCardTheme";
import axios from "@/plugins/api/axios";
import { getCookie, USER_T0KEN_COOKIE } from "@/utils/cookieHandler";

/**
 * 活動收藏加入移除按鈕
 * @param home     呈現於首頁
 * @param activity 單一活動資料
 */
function FavoriteAction(props: {
	home: boolean,
	activity: ActivityState,
	onLoad: (res:boolean) => void;
}){
	const { home, activity, onLoad } = props;
	const cardStyle = useCardTheme();
	const { favorite } = axios;
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const getUserT0ken = getCookie(USER_T0KEN_COOKIE);
		setIsLogin(getUserT0ken? true: false)
	}, []);

	const toggleFavorite = async(
		e: { stopPropagation: () => void }
	) => {
		// 阻止事件冒泡，防止觸發卡片的點擊事件
		e.stopPropagation()

		// 未登入無法點擊
		if(!isLogin) return

		try {
			if(activity.isLike){
				await favorite.removeFavorite(activity._id);
			}else{
				await favorite.addFavorite(activity._id);
			}
			// 觸發資料更新
			onLoad(true)
		} catch (error: any) {
			console.error(String(error?.message));
			// TODO 顯示錯誤提示
		}		
	}

	return (
		<Box 
			display="inline-flex" 
			alignItems="center"
			onClick={toggleFavorite}
			sx={{
				cursor: isLogin? "pointer": ""
			}}
		>
			<FavoriteIcon sx={cardStyle.chipIcon} />
			<Typography
				sx={{
					...cardStyle.chipText,
					minWidth: home
						? "2rem"
						: { xs: "1rem", sm: "0.75rem", md: "1.5rem" },
				}}
			>
				{ home?activity.likers || 0:activity.likeCount || 0}
			</Typography>
	</Box>
	);
}

export default FavoriteAction;
