import Cookies from "js-cookie";

export const profileName = "OUTDOORKA_USER";
export const tokenName = "OUTDOORKA_TOKEN";
export const ogProfileName = "OUTDOORKA_OG_USER";
export const ogTokenName = "OUTDOORKA_OG_TOKEN";

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
export const getProfileCookieObj = (name: string) => {
	const value = Cookies.get(name);
	if(typeof value === "string" ){
		return JSON.parse(value)
	}else{
		return null
	}
};
