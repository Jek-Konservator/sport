import { describe, expect, it } from "vitest";
import { Exercise } from "../../model/types";
import { getWorkoutDay } from "./get-workout-day";

describe("getWorkoutDay", () => {
  it("берёт отдых и подходы из программы", () => {
    expect(getWorkoutDay(Exercise.PushUps, { week: 1, day: 3, level: 2 })).toEqual({
      restTime: 120,
      sets: [8, 10, 7, 7, 10],
    });
  });

  it("поддерживает длинные дни из 9 подходов", () => {
    const { restTime, sets } = getWorkoutDay(Exercise.Squats, { week: 6, day: 3, level: 3 });

    expect(restTime).toBe(45);
    expect(sets).toHaveLength(9);
    expect(sets.at(-1)).toBe(100);
  });
});
