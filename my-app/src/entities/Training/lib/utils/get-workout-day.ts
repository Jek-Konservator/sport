import { PROGRAM } from "../../config/constants";
import type { Exercise, Progress, WorkoutDay } from "../../model/types";

export const getWorkoutDay = (exercise: Exercise, { week, day, level }: Progress): WorkoutDay => {
  const programDay = PROGRAM[exercise][week][day];

  return { restTime: programDay.restTime, sets: programDay.levels[level] };
};
