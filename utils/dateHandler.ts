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
    return `${startDate.format("YYYY/MM/DD HH:mm")} - ${endDate.format("HH:mm")}`;
  } else {
    return `${startDate.format("YYYY/MM/DD")} - ${endDate.format("YYYY/MM/DD")}`;
  }
};

/**
 * 取得票卷顯示開始時間
 * @param  startTime
 */
export const parseStartTime = (startTime: string) => {
  const startDate = dayjs(startTime);
  return `${startDate.format("YYYY/MM/DD HH:mm")}`;
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

/**
 * 判斷票卷狀態
 * 0已報名：活動開始時間前|已報名
 * 1已使用：活動結束時間後|活動進行中
 * 2已逾期：活動結束時間後|已結束
 * @param  startTime
 * @param  endTime
 */
export const parstTicketStatus = (startTime: string, endTime: string) => {
  const now = dayjs();
  const startDate = dayjs(startTime);
  const endDate = dayjs(endTime);
  if (now.isAfter(endDate, "date")) return 2;
  if (now.isBefore(startDate, "date")) return 0;
  return 1;
};

/**
 * 時間排序
 * @param  dataArray
 * @param  asc
 */
export const sortTimeData = (dataArray: any, key: string, asc: boolean) => {
  const newDataArray = dataArray.sort((a: any, b: any) => {
    if (asc) {
      return dayjs(a[key]).isAfter(dayjs(b[key])) ? 1 : -1;
    } else {
      return dayjs(a[key]).isAfter(dayjs(b[key])) ? -1 : 1;
    }
  });
  return newDataArray;
};
