import type { Exercise, Progress } from "@entities/Training/model/types";

export enum ProgressFormNames {
  Week = "week",
  Day = "day",
  Level = "level",
}

export interface ProgressSubmitPayload {
  exercise: Exercise;
  progress: Progress;
}
