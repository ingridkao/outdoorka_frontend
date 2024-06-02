import Cookies from "js-cookie";

export const profileName = "OUTDOORKA_USER";
export const tokenName = "OUTDOORKA_TOKEN";

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
export const setProfileCookie = (value: any, days: number) => {
	Cookies.set(profileName, value, {
		expires: days,
	});
};

/**
 * Cookie讀取登入資訊
 */
export const getProfileCookieObj = () => {
	const string = Cookies.get(profileName);
	if (!string) return null;
	return JSON.parse(string);
};
