import { Exercise } from "../../model/types";
import type { Progress, ProgressMap } from "../../model/types";

export const PROGRESS_DEFAULT: Progress = { week: 1, day: 1, level: 1 };

export const PROGRESS_MAP_DEFAULT: ProgressMap = {
  [Exercise.PushUps]: PROGRESS_DEFAULT,
  [Exercise.Press]: PROGRESS_DEFAULT,
  [Exercise.Squats]: PROGRESS_DEFAULT,
};

export const PROGRESS_LIMIT = { week: 6, day: 3, level: 3 } as const;

/** Ключ в localStorage, совместимый со старой версией приложения */
export const PROGRESS_STORAGE_KEY = "InfoStorage";
