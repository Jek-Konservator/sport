import { allSettled, fork } from "effector";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { notify } from "@ui/NotificationSystem";
import { playSound } from "@services/sound";
import { TrainingApi } from "@entities/Training/api";
import { PROGRESS_MAP_DEFAULT } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { Exercise } from "@entities/Training/model/types";
import { WorkoutStore } from "./workout-store";

vi.mock("@services/sound", () => ({ playSound: vi.fn() }));
vi.mock("@ui/NotificationSystem", () => ({ notify: { show: vi.fn() } }));
vi.mock("@entities/Training/api", () => ({
  TrainingApi: { getProgress: vi.fn(), saveProgress: vi.fn() },
}));

const { event, store } = WorkoutStore;

// Отжимания, 1 неделя, 1 день, 1 уровень: [2, 3, 2, 2, 3], отдых 60 с
const openPushUps = async () => {
  const scope = fork();
  await allSettled(event.pageOpenedEv, { scope, params: Exercise.PushUps });

  return scope;
};

describe("WorkoutStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("при открытии собирает тренировку из прогресса", async () => {
    const scope = await openPushUps();

    expect(scope.getState(store.$session)).toEqual({
      exercise: Exercise.PushUps,
      progress: { week: 1, day: 1, level: 1 },
      restTime: 60,
      sets: [2, 3, 2, 2, 3],
    });
    expect(scope.getState(store.$setIndex)).toBe(0);
  });

  it("пересобирает тренировку, когда прогресс загрузился позже", async () => {
    vi.mocked(TrainingApi.getProgress).mockResolvedValue({
      ...PROGRESS_MAP_DEFAULT,
      pushUps: { week: 1, day: 3, level: 2 },
    });
    const scope = await openPushUps();

    await allSettled(ProgressStore.event.progressRequestedEv, { scope });

    expect(scope.getState(store.$session)?.sets).toEqual([8, 10, 7, 7, 10]);
    expect(scope.getState(store.$session)?.restTime).toBe(120);
  });

  it("после подхода отсчитывает отдых, играет звук и переходит к следующему", async () => {
    const scope = await openPushUps();

    const settled = allSettled(event.setDoneEv, { scope });

    expect(scope.getState(store.$isResting)).toBe(true);
    expect(scope.getState(store.$restLeft)).toBe(60);

    await vi.advanceTimersByTimeAsync(30_000);
    expect(scope.getState(store.$restLeft)).toBe(30);

    await vi.advanceTimersByTimeAsync(30_000);
    await settled;

    expect(scope.getState(store.$isResting)).toBe(false);
    expect(scope.getState(store.$setIndex)).toBe(1);
    expect(playSound).toHaveBeenCalledWith("/sounds/timer.mp3");
  });

  it("пропуск отдыха сразу переходит к следующему подходу без звука", async () => {
    const scope = await openPushUps();

    const settled = allSettled(event.setDoneEv, { scope });
    await allSettled(event.restSkippedEv, { scope });
    await vi.runOnlyPendingTimersAsync();
    await settled;

    expect(scope.getState(store.$isResting)).toBe(false);
    expect(scope.getState(store.$setIndex)).toBe(1);
    expect(playSound).not.toHaveBeenCalled();
  });

  it("листает подходы в пределах дня", async () => {
    const scope = await openPushUps();

    await allSettled(event.prevSetEv, { scope });
    expect(scope.getState(store.$setIndex)).toBe(0);

    for (let i = 0; i < 10; i++) {
      await allSettled(event.nextSetEv, { scope });
    }

    expect(scope.getState(store.$setIndex)).toBe(4);
    expect(scope.getState(store.$isLastSet)).toBe(true);

    await allSettled(event.setDoneEv, { scope });
    expect(scope.getState(store.$isResting)).toBe(false);

    await allSettled(event.prevSetEv, { scope });
    expect(scope.getState(store.$setIndex)).toBe(3);
  });

  it("завершение упражнения сохраняет следующий день", async () => {
    vi.mocked(TrainingApi.saveProgress).mockImplementation(({ progress }) =>
      Promise.resolve(progress),
    );
    const scope = await openPushUps();

    await allSettled(event.exerciseFinishedEv, { scope });

    const expected = { ...PROGRESS_MAP_DEFAULT, pushUps: { week: 1, day: 2, level: 1 } };
    expect(TrainingApi.saveProgress).toHaveBeenCalledWith({ progress: expected });
    expect(scope.getState(ProgressStore.store.$progress)).toEqual(expected);
  });

  it("при ошибке сохранения показывает уведомление", async () => {
    vi.mocked(TrainingApi.saveProgress).mockRejectedValue(new Error("Нет места"));
    const scope = await openPushUps();

    await allSettled(event.exerciseFinishedEv, { scope });

    expect(notify.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Ошибка", message: "Нет места" }),
    );
  });

  it("закрытие страницы сбрасывает тренировку", async () => {
    const scope = await openPushUps();

    await allSettled(event.pageClosedEv, { scope });

    expect(scope.getState(store.$session)).toBeNull();
    expect(scope.getState(store.$isLastSet)).toBe(false);
  });
});
