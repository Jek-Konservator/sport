import { describe, expect, it, vi } from "vitest";
import { storage } from "@services/storage";
import { getProgress } from ".";

vi.mock("@services/storage", () => ({
  storage: { get: vi.fn() },
}));

describe("getProgress", () => {
  it("читает прогресс по ключу InfoStorage и приводит к модели", async () => {
    vi.mocked(storage.get).mockReturnValue({ squats: { week: 3, day: 2, step: 2 } });

    const result = await getProgress();

    expect(storage.get).toHaveBeenCalledWith("InfoStorage");
    expect(result.squats).toEqual({ week: 3, day: 2, level: 2 });
    expect(result.pushUps).toEqual({ week: 1, day: 1, level: 1 });
  });
});
