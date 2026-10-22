import { Exercise } from "../../model/types";

/** Порядок упражнений в тренировочном дне */
export const EXERCISE_ORDER: readonly Exercise[] = [
  Exercise.PushUps,
  Exercise.Press,
  Exercise.Squats,
];

export const EXERCISE_TITLE: Record<Exercise, string> = {
  [Exercise.PushUps]: "Отжимания",
  [Exercise.Press]: "Пресс",
  [Exercise.Squats]: "Приседания",
};
