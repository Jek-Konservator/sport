import type { Exercise, Progress, WorkoutDay } from "@entities/Training/model/types";

/** Снимок тренировки на момент открытия страницы */
export interface WorkoutSession extends WorkoutDay {
  /** Текущее упражнение */
  exercise: Exercise;
  /** Прогресс, по которому собрана тренировка */
  progress: Progress;
}
