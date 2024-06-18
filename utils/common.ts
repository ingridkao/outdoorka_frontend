import he from "he";

/**
 * 取得 Firebase 的路徑
 * @param url
 * @returns
 */
export const getFirebaseFileName = (url: string) => {
	// 取出的結果如：images/92288311-6c78-4b95-8270-1ca98298c66c.png
	const regex = /images\/[^?]+/;
	const match = url.match(regex);
	return match ? match[0] : "";
};

/**
 * HTML 內容 Escape
 * @param content
 * @returns
 */
export const escapeContent = (content: string) => {
	if (!content) return "";

	return he.escape(content);
};

/**
 * HTML 內容 Decode
 * @param content
 * @returns
 */
export const decodeContent = (content: string) => {
	if (!content) return "";

	return he.decode(content);
};
