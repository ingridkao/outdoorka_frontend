import { parseISO, format } from "date-fns";

const dayOfWeekMap = {
  Monday: "週一",
  Tuesday: "週二",
  Wednesday: "週三",
  Thursday: "週四",
  Friday: "週五",
  Saturday: "週六",
  Sunday: "週日",
};

export const formatTime = (startTime: string, endTime = "") => {
  try {
    if (!startTime) {
      throw new Error("Invalid start time");
    }

    const startDateTime = parseISO(startTime);
    const endDateTime = endTime ? parseISO(endTime) : null;

    // 生成英文格式的日期时间字符串
    const formattedStartTime = format(startDateTime, "yyyy/MM/dd EEEE HH:mm");
    const formattedEndTime = endDateTime ? format(endDateTime, "HH:mm") : null;

    // 分割日期和星期，转换星期至中文
    const [date, dayOfWeek, startTimeOnly] = formattedStartTime.split(" ");
    const dayOfWeekChinese = dayOfWeekMap[dayOfWeek];

    const timezoneOffset = new Date().getTimezoneOffset() / -60;
    const timezoneFormat =
      timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;

    return formattedEndTime
      ? `${date} ${dayOfWeekChinese} ${startTimeOnly} - ${formattedEndTime} (GMT${timezoneFormat})`
      : `${date} ${dayOfWeekChinese} ${startTimeOnly}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time format";
  }
};
