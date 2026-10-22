import { ROUTES } from "@shared/constants";
import { getNextExercise } from "@entities/Training/lib/utils";
import type { Exercise } from "@entities/Training/model/types";

/** Куда перейти после последнего подхода: следующее упражнение или итог дня */
export const getFinishHref = (exercise: Exercise): string => {
  const nextExercise = getNextExercise(exercise);

  return nextExercise ? ROUTES.workout(nextExercise) : ROUTES.dayEnd;
};
