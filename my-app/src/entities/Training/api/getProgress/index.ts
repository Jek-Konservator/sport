import { storage } from "@services/storage";
import { PROGRESS_STORAGE_KEY } from "../../config/constants";
import { transformGetProgressResponseToModel } from "./transform";
import type { ProgressMap } from "../../model/types";
import type { GetProgressOutputDto } from "./output.dto";

export const getProgress = async (): Promise<ProgressMap> => {
  const data = storage.get<GetProgressOutputDto>(PROGRESS_STORAGE_KEY);

  return Promise.resolve(transformGetProgressResponseToModel(data));
};
