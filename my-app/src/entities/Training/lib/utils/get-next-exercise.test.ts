import { describe, expect, it } from "vitest";
import { Exercise } from "../../model/types";
import { getNextExercise } from "./get-next-exercise";

describe("getNextExercise", () => {
  it("идёт по порядку отжимания → пресс → приседания", () => {
    expect(getNextExercise(Exercise.PushUps)).toBe(Exercise.Press);
    expect(getNextExercise(Exercise.Press)).toBe(Exercise.Squats);
  });

  it("после последнего упражнения возвращает null", () => {
    expect(getNextExercise(Exercise.Squats)).toBeNull();
  });
});
