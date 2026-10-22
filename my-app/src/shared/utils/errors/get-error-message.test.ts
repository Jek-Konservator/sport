import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./get-error-message";

describe("getErrorMessage", () => {
  it("возвращает текст из Error", () => {
    expect(getErrorMessage(new Error("Хранилище переполнено"))).toBe("Хранилище переполнено");
  });

  it("возвращает общий текст для неизвестной ошибки", () => {
    expect(getErrorMessage("oops")).toBe("Что-то пошло не так. Попробуйте ещё раз");
  });

  it("возвращает переданный fallback для Error без текста", () => {
    expect(getErrorMessage(new Error(""), "Не удалось")).toBe("Не удалось");
  });
});
