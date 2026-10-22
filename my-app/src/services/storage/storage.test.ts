import { describe, expect, it } from "vitest";
import { storage } from "./storage";

describe("storage", () => {
  it("сохраняет и читает значение как JSON", () => {
    storage.set("key", { a: 1 });

    expect(window.localStorage.getItem("key")).toBe('{"a":1}');
    expect(storage.get("key")).toEqual({ a: 1 });
  });

  it("возвращает null для отсутствующего ключа", () => {
    expect(storage.get("missing")).toBeNull();
  });

  it("возвращает null для битого JSON", () => {
    window.localStorage.setItem("broken", "{oops");

    expect(storage.get("broken")).toBeNull();
  });
});
