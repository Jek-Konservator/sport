import { describe, expect, it } from "vitest";
import { PROGRESS_MAP_DEFAULT } from "../../config/constants";
import { transformGetProgressResponseToModel } from "./transform";

describe("transformGetProgressResponseToModel", () => {
  it("переименовывает step в level", () => {
    const result = transformGetProgressResponseToModel({
      pushUps: { week: 2, day: 3, step: 2 },
      press: { week: 1, day: 1, step: 1 },
      squats: { week: 6, day: 1, step: 3 },
    });

    expect(result).toEqual({
      pushUps: { week: 2, day: 3, level: 2 },
      press: { week: 1, day: 1, level: 1 },
      squats: { week: 6, day: 1, level: 3 },
    });
  });

  it("без данных возвращает прогресс по умолчанию", () => {
    expect(transformGetProgressResponseToModel(null)).toEqual(PROGRESS_MAP_DEFAULT);
  });

  it("заменяет невалидные значения на прогресс по умолчанию", () => {
    const result = transformGetProgressResponseToModel({
      pushUps: { week: 7, day: 1, step: 1 },
      press: { week: 0, day: 1, step: 1 },
    });

    expect(result).toEqual(PROGRESS_MAP_DEFAULT);
  });
});
