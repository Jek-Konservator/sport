import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { getNextTrainingDate } from "./get-next-training-date";

const next = (date: string) => dayjs(getNextTrainingDate(new Date(date))).format("YYYY-MM-DD");

describe("getNextTrainingDate", () => {
  it.each([
    ["понедельник → среда", "2026-10-19", "2026-10-21"],
    ["вторник → пятница", "2026-10-20", "2026-10-23"],
    ["среда → пятница", "2026-10-21", "2026-10-23"],
    ["четверг → понедельник", "2026-10-22", "2026-10-26"],
    ["пятница → понедельник", "2026-10-23", "2026-10-26"],
    ["суббота → понедельник", "2026-10-24", "2026-10-26"],
    ["воскресенье → среда", "2026-10-25", "2026-10-28"],
  ])("%s", (_, from, expected) => {
    expect(next(`${from}T18:00:00`)).toBe(expected);
  });
});
