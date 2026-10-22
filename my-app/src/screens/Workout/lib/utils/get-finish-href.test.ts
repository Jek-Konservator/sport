import { describe, expect, it } from "vitest";
import { Exercise } from "@entities/Training/model/types";
import { getFinishHref } from "./get-finish-href";

describe("getFinishHref", () => {
  it("ведёт на следующее упражнение", () => {
    expect(getFinishHref(Exercise.PushUps)).toBe("/workout/press");
    expect(getFinishHref(Exercise.Press)).toBe("/workout/squats");
  });

  it("после приседаний ведёт на итог дня", () => {
    expect(getFinishHref(Exercise.Squats)).toBe("/day-end");
  });
});
