import { allSettled, fork } from "effector";
import { afterEach, describe, expect, it, vi } from "vitest";
import { notify } from "@ui/NotificationSystem";
import { TrainingApi } from "@entities/Training/api";
import { PROGRESS_MAP_DEFAULT } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { Exercise } from "@entities/Training/model/types";
import { SettingsStore } from "./settings-store";

vi.mock("@ui/NotificationSystem", () => ({ notify: { show: vi.fn() } }));
vi.mock("@entities/Training/api", () => ({
  TrainingApi: { getProgress: vi.fn(), saveProgress: vi.fn() },
}));

const PAYLOAD = { exercise: Exercise.Press, progress: { week: 3, day: 2, level: 2 } } as const;

describe("SettingsStore", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("сохраняет прогресс упражнения, не трогая остальные", async () => {
    vi.mocked(TrainingApi.saveProgress).mockImplementation(({ progress }) =>
      Promise.resolve(progress),
    );
    const scope = fork();

    await allSettled(SettingsStore.event.progressSubmittedEv, { scope, params: PAYLOAD });

    const expected = { ...PROGRESS_MAP_DEFAULT, press: PAYLOAD.progress };
    expect(TrainingApi.saveProgress).toHaveBeenCalledWith({ progress: expected });
    expect(scope.getState(ProgressStore.store.$progress)).toEqual(expected);
    expect(notify.show).toHaveBeenCalledWith(expect.objectContaining({ title: "Готово" }));
  });

  it("при ошибке показывает уведомление и не меняет прогресс", async () => {
    vi.mocked(TrainingApi.saveProgress).mockRejectedValue("unknown");
    const scope = fork();

    await allSettled(SettingsStore.event.progressSubmittedEv, { scope, params: PAYLOAD });

    expect(scope.getState(ProgressStore.store.$progress)).toEqual(PROGRESS_MAP_DEFAULT);
    expect(notify.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Ошибка", message: "Не удалось сохранить прогресс" }),
    );
  });
});
