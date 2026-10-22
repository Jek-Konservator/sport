import { describe, expect, it } from "vitest";
import { formatTime } from "./format-time";

describe("formatTime", () => {
  it.each([
    [0, "00:00"],
    [9, "00:09"],
    [60, "01:00"],
    [125, "02:05"],
    [-3, "00:00"],
  ])("%i → %s", (seconds, expected) => {
    expect(formatTime(seconds)).toBe(expected);
  });
});
