import type { WorkoutDay } from "@entities/Training/model/types";

export interface WorkoutSummary {
  /** Количество подходов */
  sets: number;
  /** Сумма повторений за все подходы */
  totalReps: number;
  /** Отдых между подходами, секунды */
  restTime: number;
}

export const getWorkoutSummary = ({ restTime, sets }: WorkoutDay): WorkoutSummary => ({
  sets: sets.length,
  totalReps: sets.reduce((sum, reps) => sum + reps, 0),
  restTime,
});
