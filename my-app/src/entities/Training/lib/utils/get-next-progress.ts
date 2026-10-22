import { isDay, isWeek } from "./guards";
import type { Progress } from "../../model/types";

/** Следующий день программы; после последнего дня прогресс не меняется */
export const getNextProgress = (progress: Progress): Progress => {
  const nextDay = progress.day + 1;

  if (isDay(nextDay)) {
    return { ...progress, day: nextDay };
  }

  const nextWeek = progress.week + 1;

  if (isWeek(nextWeek)) {
    return { ...progress, week: nextWeek, day: 1 };
  }

  return progress;
};
