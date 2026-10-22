import { describe, expect, it } from "vitest";
import { progressFormSchema } from ".";

const validate = (values: Record<string, unknown>) =>
  progressFormSchema.validate(values, { abortEarly: true });

describe("progressFormSchema", () => {
  it("пропускает валидные значения", async () => {
    await expect(validate({ week: 6, day: 3, level: 1 })).resolves.toEqual({
      week: 6,
      day: 3,
      level: 1,
    });
  });

  it.each([
    [{ week: 7, day: 1, level: 1 }, "Максимум 6"],
    [{ week: 1, day: 4, level: 1 }, "Максимум 3"],
    [{ week: 1, day: 1, level: 0 }, "Минимум 1"],
    [{ week: 1.5, day: 1, level: 1 }, "Только целое число"],
    [{ week: undefined, day: 1, level: 1 }, "Обязательное поле"],
    [{ week: "abc", day: 1, level: 1 }, "Введите число"],
  ])("%o → %s", async (values, message) => {
    await expect(validate(values)).rejects.toThrow(message);
  });
});
