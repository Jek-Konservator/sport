import { WeekNumberValues } from "./weekTypes";
import { DayNumberValues } from "./dayTypes";
import { StepNumberValues } from "./stepTypes";

export interface ProgressInfo {
  week: WeekNumberValues;
  day: DayNumberValues;
  step: StepNumberValues;
}

export interface InfoStorageType {
  press: ProgressInfo;
  pushUps: ProgressInfo;
  squats: ProgressInfo;
}
