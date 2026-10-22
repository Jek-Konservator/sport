import { allSettled, fork } from "effector";
import { describe, expect, it, vi } from "vitest";
import { TrainingApi } from "../../../api";
import { PROGRESS_MAP_DEFAULT } from "../../../config/constants";
import { ProgressStore } from "./progress-store";
import type { ProgressMap } from "../../types";

vi.mock("../../../api", () => ({
  TrainingApi: { getProgress: vi.fn() },
}));

const PROGRESS: ProgressMap = {
  ...PROGRESS_MAP_DEFAULT,
  squats: { week: 4, day: 2, level: 3 },
};

describe("ProgressStore", () => {
  it("загружает прогресс и отмечает готовность", async () => {
    vi.mocked(TrainingApi.getProgress).mockResolvedValue(PROGRESS);
    const scope = fork();

    expect(scope.getState(ProgressStore.store.$isReady)).toBe(false);

    await allSettled(ProgressStore.event.progressRequestedEv, { scope });

    expect(scope.getState(ProgressStore.store.$progress)).toEqual(PROGRESS);
    expect(scope.getState(ProgressStore.store.$isReady)).toBe(true);
  });

  it("при ошибке оставляет прогресс по умолчанию, но отмечает готовность", async () => {
    vi.mocked(TrainingApi.getProgress).mockRejectedValue(new Error("boom"));
    const scope = fork();

    await allSettled(ProgressStore.event.progressRequestedEv, { scope });

    expect(scope.getState(ProgressStore.store.$progress)).toEqual(PROGRESS_MAP_DEFAULT);
    expect(scope.getState(ProgressStore.store.$isReady)).toBe(true);
  });

  it("обновляет прогресс по событию", async () => {
    const scope = fork();

    await allSettled(ProgressStore.event.progressUpdatedEv, { scope, params: PROGRESS });

    expect(scope.getState(ProgressStore.store.$progress)).toEqual(PROGRESS);
  });
});
