import { DayNumberValues, DayStringValues } from "@shared/types";

export const DeyMapperToNumber: Record<DayStringValues, DayNumberValues> = {
  oneDay: 1,
  twoDay: 2,
  threeDay: 3,
};

export const DeyMapperToString: Record<DayNumberValues, DayStringValues> = {
  1: "oneDay",
  2: "twoDay",
  3: "threeDay",
};
