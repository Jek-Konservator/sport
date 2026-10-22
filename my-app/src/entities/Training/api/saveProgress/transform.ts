import type { Progress, ProgressMap } from "../../model/types";
import type { GetProgressOutputDto, ProgressDto } from "../getProgress/output.dto";

const transformProgressToDto = ({ week, day, level }: Progress): ProgressDto => ({
  week,
  day,
  step: level,
});

export const transformProgressToStorage = (progress: ProgressMap): GetProgressOutputDto => ({
  pushUps: transformProgressToDto(progress.pushUps),
  press: transformProgressToDto(progress.press),
  squats: transformProgressToDto(progress.squats),
});
