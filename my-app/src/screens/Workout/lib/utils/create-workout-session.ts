import { getWorkoutDay } from "@entities/Training/lib/utils";
import type { Exercise, Progress } from "@entities/Training/model/types";
import type { WorkoutSession } from "../../model/types";

export const createWorkoutSession = (exercise: Exercise, progress: Progress): WorkoutSession => ({
  exercise,
  progress,
  ...getWorkoutDay(exercise, progress),
});
