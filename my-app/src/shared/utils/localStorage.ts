import {
  DayNumberValues,
  InfoStorageType,
  ProgressInfo,
  WeekNumberValues,
} from "@shared/types";
import { InfoStorage } from "@shared/constants";

export const setInfoStorage = (infoStorage: InfoStorageType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("InfoStorage", JSON.stringify(infoStorage));
  }
};

export const getInfoStorage = (): InfoStorageType => {
  if (typeof window !== "undefined") {
    const infoStorage = localStorage.getItem("InfoStorage");
    if (infoStorage !== null) {
      return JSON.parse(infoStorage);
    }
  }
  return InfoStorage;
};

export const setInfoStorageFunc = ({
  info,
  name,
}: {
  name: "press" | "pushUps" | "squats";
  info: ProgressInfo;
}) => {
  let value: ProgressInfo = info;

  if (info.day === 1 || info.day === 2) {
    value = { ...info, day: (info.day + 1) as DayNumberValues };
  }

  if (info.day === 3) {
    value = {
      ...info,
      day: 1 as DayNumberValues,
      week: (info.week + 1) as WeekNumberValues,
    };
  }

  setInfoStorage({ ...getInfoStorage(), [name]: value });
};
