import { WeekNumberValues, WeekStringValues } from "@shared/types";

export const WeekMapperToNumber: Record<WeekStringValues, WeekNumberValues> = {
  oneWeek: 1,
  twoWeek: 2,
  threeWeek: 3,
  fourWeek: 4,
  fiveWeek: 5,
  sixWeek: 6,
};

export const WeekMapperToString: Record<WeekNumberValues, WeekStringValues> = {
  1: "oneWeek",
  2: "twoWeek",
  3: "threeWeek",
  4: "fourWeek",
  5: "fiveWeek",
  6: "sixWeek",
};
