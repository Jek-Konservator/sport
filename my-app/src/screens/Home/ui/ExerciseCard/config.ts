import { plural } from "@shared/utils/plural";

export const EXERCISE_CARD_TEXT = {
  start: "Начать",
  sets: (count: number) => `${count} ${plural(count, ["подход", "подхода", "подходов"])}`,
  totalReps: (count: number) =>
    `${count} ${plural(count, ["повторение", "повторения", "повторений"])}`,
  rest: (seconds: number) => `отдых ${seconds} с`,
};
