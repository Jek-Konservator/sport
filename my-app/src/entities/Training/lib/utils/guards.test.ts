import { describe, expect, it } from "vitest";
import { isDay, isExercise, isLevel, isWeek } from "./guards";

describe("guards", () => {
  it("isWeek принимает целые 1–6", () => {
    expect(isWeek(1)).toBe(true);
    expect(isWeek(6)).toBe(true);
    expect(isWeek(0)).toBe(false);
    expect(isWeek(7)).toBe(false);
    expect(isWeek(2.5)).toBe(false);
    expect(isWeek("2")).toBe(false);
  });

  it("isDay и isLevel принимают целые 1–3", () => {
    expect(isDay(3)).toBe(true);
    expect(isDay(4)).toBe(false);
    expect(isLevel(1)).toBe(true);
    expect(isLevel(undefined)).toBe(false);
  });

  it("isExercise принимает только известные упражнения", () => {
    expect(isExercise("pushUps")).toBe(true);
    expect(isExercise("squats")).toBe(true);
    expect(isExercise("burpees")).toBe(false);
    expect(isExercise(1)).toBe(false);
  });
});
