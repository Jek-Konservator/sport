import { describe, expect, it, vi } from "vitest";
import { Exercise } from "@entities/Training/model/types";
import { createOnSubmit, transformFormToProgress } from "./onSubmit";

describe("transformFormToProgress", () => {
  it("возвращает прогресс для значений в допустимых пределах", () => {
    expect(transformFormToProgress({ week: 2, day: 3, level: 1 })).toEqual({
      week: 2,
      day: 3,
      level: 1,
    });
  });

  it("возвращает null для значений вне пределов", () => {
    expect(transformFormToProgress({ week: 9, day: 1, level: 1 })).toBeNull();
  });
});

describe("createOnSubmit", () => {
  it("отправляет упражнение и прогресс", () => {
    const submit = vi.fn();

    createOnSubmit(Exercise.Squats, submit)({ week: 4, day: 1, level: 3 });

    expect(submit).toHaveBeenCalledWith({
      exercise: Exercise.Squats,
      progress: { week: 4, day: 1, level: 3 },
    });
  });

  it("не отправляет невалидные значения", () => {
    const submit = vi.fn();

    createOnSubmit(Exercise.Squats, submit)({ week: 0, day: 1, level: 3 });

    expect(submit).not.toHaveBeenCalled();
  });
});
