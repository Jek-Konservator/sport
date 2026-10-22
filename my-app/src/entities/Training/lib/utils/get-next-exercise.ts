import { EXERCISE_ORDER } from "../../config/constants";
import type { Exercise } from "../../model/types";

/** Следующее упражнение дня или null, если это было последнее */
export const getNextExercise = (exercise: Exercise): Exercise | null =>
  EXERCISE_ORDER[EXERCISE_ORDER.indexOf(exercise) + 1] ?? null;
