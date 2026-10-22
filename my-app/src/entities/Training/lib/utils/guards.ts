import { PROGRESS_LIMIT } from "../../config/constants";
import { Exercise } from "../../model/types";
import type { Day, Level, Week } from "../../model/types";

const isInRange = (value: unknown, max: number): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= max;

export const isWeek = (value: unknown): value is Week => isInRange(value, PROGRESS_LIMIT.week);

export const isDay = (value: unknown): value is Day => isInRange(value, PROGRESS_LIMIT.day);

export const isLevel = (value: unknown): value is Level => isInRange(value, PROGRESS_LIMIT.level);

const EXERCISES: readonly string[] = Object.values(Exercise);

export const isExercise = (value: unknown): value is Exercise =>
  typeof value === "string" && EXERCISES.includes(value);
