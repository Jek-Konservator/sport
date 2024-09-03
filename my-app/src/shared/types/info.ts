import { WeekNumberValues } from "./weekTypes";
import { DayNumberValues } from "./dayTypes";
import { StepNumberValues } from "./stepTypes";

export interface ProgressInfo {
  week: WeekNumberValues;
  day: DayNumberValues;
  step: StepNumberValues;
}
