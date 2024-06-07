import dayjs from "dayjs";
/**
 * 取得票卷顯示日期時間
 * @param  startTime
 * @param  endTime
 */
export const parseDate = (startTime: string, endTime: string) => {
	const startDate = dayjs(startTime);
	const endDate = dayjs(endTime);
	if (startDate.isSame(endDate, "date")) {
		return `${startDate.format("YYYY/MM/DD HH:00")} - ${endDate.format("HH:00")}`;
	} else {
		return `${startDate.format("YYYY/MM/DD")} - ${endDate.format("YYYY/MM/DD")}`;
	}
};

const parseTimeZone = (value: string) => {
	const Date = dayjs(value);
	return `(GMT${Date.format("Z").slice(0, 3)})`;
};
/**
 * 取得票卷detail顯示日期時間
 * @param  startTime
 * @param  endTime
 */
export const parseDetailDate = (startTime: string, endTime: string) => {
	const startDate = dayjs(startTime);
	const endDate = dayjs(endTime);
	const timeZone = parseTimeZone(endTime);
	if (startDate.isSame(endDate, "date")) {
		return `${startDate.format("YYYY/MM/DD HH:00")} - ${endDate.format("YYYY/MM/DD HH:00")} ${timeZone}`;
	} else {
		return `${startDate.format("YYYY/MM/DD HH:00")} - ${endDate.format("YYYY/MM/DD HH:00")} ${timeZone}`;
	}
};
