import { describe, expect, it } from "vitest";
import { transformProgressToStorage } from "./transform";

describe("transformProgressToStorage", () => {
  it("переименовывает level в step для localStorage", () => {
    const result = transformProgressToStorage({
      pushUps: { week: 2, day: 3, level: 2 },
      press: { week: 1, day: 1, level: 1 },
      squats: { week: 6, day: 1, level: 3 },
    });

    expect(result).toEqual({
      pushUps: { week: 2, day: 3, step: 2 },
      press: { week: 1, day: 1, step: 1 },
      squats: { week: 6, day: 1, step: 3 },
    });
  });
});
