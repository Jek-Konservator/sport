import dayjs from "dayjs";
import { MIN_REST_DAYS, TRAINING_WEEKDAYS } from "../../config/constants";

/** Ближайший тренировочный день (пн/ср/пт) не раньше чем через MIN_REST_DAYS */
export const getNextTrainingDate = (from: Date): Date => {
  let date = dayjs(from).startOf("day").add(MIN_REST_DAYS, "day");

  while (!TRAINING_WEEKDAYS.includes(date.day())) {
    date = date.add(1, "day");
  }

  return date.toDate();
};
