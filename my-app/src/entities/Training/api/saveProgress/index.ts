import { storage } from "@services/storage";
import { PROGRESS_STORAGE_KEY } from "../../config/constants";
import { transformProgressToStorage } from "./transform";
import type { ProgressMap } from "../../model/types";
import type { SaveProgressInputDto } from "./input.dto";

/** Сохраняет прогресс и возвращает сохранённое значение */
export const saveProgress = async ({ progress }: SaveProgressInputDto): Promise<ProgressMap> => {
  storage.set(PROGRESS_STORAGE_KEY, transformProgressToStorage(progress));

  return Promise.resolve(progress);
};
