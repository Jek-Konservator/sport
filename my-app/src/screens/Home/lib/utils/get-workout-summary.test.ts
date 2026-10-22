import { describe, expect, it } from "vitest";
import { getWorkoutSummary } from "./get-workout-summary";

describe("getWorkoutSummary", () => {
  it("считает подходы и общее число повторений", () => {
    expect(getWorkoutSummary({ restTime: 60, sets: [2, 3, 2, 2, 3] })).toEqual({
      sets: 5,
      totalReps: 12,
      restTime: 60,
    });
  });
});
