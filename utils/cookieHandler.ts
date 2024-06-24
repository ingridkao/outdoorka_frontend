"use client";
import Cookies from "js-cookie";

export const USER_ACCOUNT_COOKIE = "OUTDOORKA_U_ACC"; // For login remember
export const USER_T0KEN_COOKIE = "OUTDOORKA_U";
export const USER_PROFILE_COOKIE = "OUTDOORKA_U_PROFILE";

export const OG_TOK0N_COOKIE = "OUTDOORKA_OG";
export const OG_ACCOUNT_COOKIE = "OUTDOORKA_OG_ACC"; // For login remember

export const setCookie = (name: string, value: any, days: number) => {
	Cookies.set(name, value, {
		expires: days,
	});
};

export const getCookie = (name: string) => {
	const string = Cookies.get(name);
	return string || null;
};

export const removeCookie = (name: string) => Cookies.remove(name);

/**
 * 登入資訊寫進Cookie
 * @param value
 * @param days
 */
export const setProfileCookie = (name: string, value: any, days: number) => {
	Cookies.set(name, JSON.stringify(value), {
		expires: days,
	});
};

/**
 * Cookie讀取登入資訊
 */
export const getProfileCookieObj = () => {
	const value = Cookies.get(USER_PROFILE_COOKIE);
	if(value && typeof value === "string" ){
		return JSON.parse(value)
	}else{
		return null
	}
};

/**
 * 刪除用戶登入Cookie
 */
export const removeUserCookie = () => {
	Cookies.remove(USER_PROFILE_COOKIE);
	Cookies.remove(USER_T0KEN_COOKIE);
};

/**
 * 刪除主揪登入Cookie
 */
export const removeOgCookie = () => {
	Cookies.remove(OG_TOK0N_COOKIE);
};

