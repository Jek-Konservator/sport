import type { Exercise } from "./exercise";

/** Неделя программы */
export type Week = 1 | 2 | 3 | 4 | 5 | 6;

/** Тренировочный день внутри недели */
export type Day = 1 | 2 | 3;

/** Уровень сложности */
export type Level = 1 | 2 | 3;

export interface Progress {
  /** Текущая неделя программы */
  week: Week;
  /** Текущий день недели программы */
  day: Day;
  /** Уровень сложности */
  level: Level;
}

/** Прогресс по каждому упражнению */
export type ProgressMap = Record<Exercise, Progress>;
