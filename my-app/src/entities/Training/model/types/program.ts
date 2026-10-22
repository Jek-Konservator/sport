import type { Day, Level, Week } from "./progress";

export interface ProgramDay {
  /** Отдых между подходами, секунды */
  restTime: number;
  /** Количество повторений в подходах для каждого уровня */
  levels: Record<Level, number[]>;
}

/** Программа упражнения: неделя → день */
export type Program = Record<Week, Record<Day, ProgramDay>>;

export interface WorkoutDay {
  /** Отдых между подходами, секунды */
  restTime: number;
  /** Количество повторений в каждом подходе */
  sets: number[];
}
