import { PROGRESS_DEFAULT } from "../../config/constants";
import { isDay, isLevel, isWeek } from "../../lib/utils";
import { Exercise } from "../../model/types";
import type { Progress, ProgressMap } from "../../model/types";
import type { GetProgressOutputDto, ProgressDto } from "./output.dto";

const transformProgressDtoToModel = (dto: ProgressDto | undefined): Progress => {
  if (!dto || !isWeek(dto.week) || !isDay(dto.day) || !isLevel(dto.step)) {
    return PROGRESS_DEFAULT;
  }

  return { week: dto.week, day: dto.day, level: dto.step };
};

/** Невалидные или отсутствующие данные заменяются прогрессом по умолчанию */
export const transformGetProgressResponseToModel = (
  dto: GetProgressOutputDto | null,
): ProgressMap => ({
  [Exercise.PushUps]: transformProgressDtoToModel(dto?.pushUps),
  [Exercise.Press]: transformProgressDtoToModel(dto?.press),
  [Exercise.Squats]: transformProgressDtoToModel(dto?.squats),
});
