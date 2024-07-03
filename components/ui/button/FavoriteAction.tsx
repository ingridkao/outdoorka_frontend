"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLikes } from "@/features/user/likeSlice";
import { ActivityState } from "@/types/ActivitiesType";
import {
	Chip,
	Box,
	Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
	const { favorite } = axios;
	const dispatch = useDispatch();
	const { likesList } = useSelector((state:any) => state.likes);
	const isLike = likesList.some((likeId:string) => likeId == activity._id)
	const [modify, setModify] = useState(false);

	const cardStyle = useCardTheme();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const getUserT0ken = getCookie(USER_T0KEN_COOKIE);
		if(getUserT0ken)setIsLogin(true)
	}, []);

	const toggleFavorite = async(
		e: { stopPropagation: () => void }
	) => {
		// 阻止事件冒泡，防止觸發卡片的點擊事件
		e.stopPropagation()
		// 未登入無法點擊
		if(!isLogin) return
		try {
			if(isLike){
				await favorite.removeFavorite(activity._id);
			}else{
				await favorite.addFavorite(activity._id);
			}
			// 觸發資料更新
			dispatch(showLikes());
			onLoad(true)
			setModify(true)
			const interval = setInterval(() => {
				setModify(false)
			}, 500);
			return () => clearInterval(interval);
		} catch (error: any) {
			console.error(String(error?.message));
			// TODO 顯示錯誤提示
		}		
	}

	return (
		<Chip
			sx={cardStyle.chip}
			clickable={isLogin}
			onClick={toggleFavorite}
			label={
				<Box display="inline-flex" alignItems="center">
					<Box sx={{
						transition: "transform 500ms ease-out",
						transform: modify? "scale(1.5)" : "scale(1)"
					}}>
						{!isLike
							?<FavoriteBorderIcon sx={cardStyle.chipIcon} />
							:<FavoriteIcon sx={cardStyle.chipIcon} />
						}
					</Box>
					<Typography
						sx={{
							...cardStyle.chipText,
							minWidth: home
								? "2rem"
								: { xs: "1rem", sm: "0.75rem", md: "1.5rem" },
						}}
					>
						{ activity.likeCount || activity.likers || 0}
					</Typography>
				</Box>
			}
		/>
	);
}

export default FavoriteAction;
