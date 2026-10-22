import { describe, expect, it } from "vitest";
import { Exercise } from "@entities/Training/model/types";
import { createWorkoutSession } from "./create-workout-session";

describe("createWorkoutSession", () => {
  it("собирает упражнение, прогресс и подходы дня", () => {
    const progress = { week: 1, day: 1, level: 1 } as const;

    expect(createWorkoutSession(Exercise.Press, progress)).toEqual({
      exercise: Exercise.Press,
      progress,
      restTime: 60,
      sets: [3, 4, 3, 3, 5],
    });
  });
});
