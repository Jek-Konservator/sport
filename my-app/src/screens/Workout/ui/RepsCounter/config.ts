import { plural } from "@shared/utils/plural";

export const REPS_COUNTER_TEXT = {
  set: (number: number, total: number) => `Подход ${number} из ${total}`,
  atLeast: "не меньше",
  reps: (count: number) => plural(count, ["повторение", "повторения", "повторений"]),
  lastSetHint: "Последний подход — выложись по максимуму",
};
