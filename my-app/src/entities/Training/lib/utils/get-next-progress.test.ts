import { describe, expect, it } from "vitest";
import { getNextProgress } from "./get-next-progress";
import type { Progress } from "../../model/types";

describe("getNextProgress", () => {
  it("переходит на следующий день", () => {
    expect(getNextProgress({ week: 2, day: 1, level: 3 })).toEqual({ week: 2, day: 2, level: 3 });
  });

  it("после третьего дня переходит на следующую неделю", () => {
    expect(getNextProgress({ week: 2, day: 3, level: 1 })).toEqual({ week: 3, day: 1, level: 1 });
  });

  it("после последнего дня программы остаётся на месте", () => {
    const last: Progress = { week: 6, day: 3, level: 2 };

    expect(getNextProgress(last)).toEqual(last);
  });
});
