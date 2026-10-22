import { describe, expect, it, vi } from "vitest";
import { storage } from "@services/storage";
import { saveProgress } from ".";
import { PROGRESS_MAP_DEFAULT } from "../../config/constants";

vi.mock("@services/storage", () => ({
  storage: { set: vi.fn() },
}));

describe("saveProgress", () => {
  it("пишет прогресс в формате localStorage и возвращает модель", async () => {
    const result = await saveProgress({ progress: PROGRESS_MAP_DEFAULT });

    expect(storage.set).toHaveBeenCalledWith("InfoStorage", {
      pushUps: { week: 1, day: 1, step: 1 },
      press: { week: 1, day: 1, step: 1 },
      squats: { week: 1, day: 1, step: 1 },
    });
    expect(result).toBe(PROGRESS_MAP_DEFAULT);
  });

  it("пробрасывает ошибку хранилища", async () => {
    vi.mocked(storage.set).mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    await expect(saveProgress({ progress: PROGRESS_MAP_DEFAULT })).rejects.toThrow(
      "QuotaExceededError",
    );
  });
});
