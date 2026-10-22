import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { allSettled, fork } from "effector";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithScope } from "@shared/test";
import { TrainingApi } from "@entities/Training/api";
import { PROGRESS_MAP_DEFAULT } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { Exercise } from "@entities/Training/model/types";
import { Workout } from "./Workout";

vi.mock("@services/sound", () => ({ playSound: vi.fn() }));
vi.mock("@entities/Training/api", () => ({
  TrainingApi: { getProgress: vi.fn(), saveProgress: vi.fn() },
}));

const renderWorkout = async (exercise: Exercise) => {
  const scope = fork();
  await allSettled(ProgressStore.event.progressRequestedEv, { scope });

  return renderWithScope(<Workout exercise={exercise} />, scope);
};

describe("Workout", () => {
  beforeEach(() => {
    vi.mocked(TrainingApi.getProgress).mockResolvedValue(PROGRESS_MAP_DEFAULT);
    vi.mocked(TrainingApi.saveProgress).mockImplementation(({ progress }) =>
      Promise.resolve(progress),
    );
  });

  it("пока прогресс не загружен, показывает загрузку", () => {
    renderWithScope(<Workout exercise={Exercise.PushUps} />);

    expect(screen.queryByText("Отжимания")).not.toBeInTheDocument();
  });

  it("показывает упражнение и первый подход", async () => {
    await renderWorkout(Exercise.PushUps);

    expect(screen.getByRole("heading", { name: "Отжимания" })).toBeInTheDocument();
    expect(screen.getByText("Подход 1 из 5")).toBeInTheDocument();
    expect(screen.getByLabelText("Предыдущий подход")).toBeDisabled();
  });

  it("после подхода показывает таймер отдыха, который можно пропустить", async () => {
    const user = userEvent.setup();
    await renderWorkout(Exercise.PushUps);

    await user.click(screen.getByRole("button", { name: "Подход выполнен" }));

    expect(screen.getByText("01:00")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Пропустить отдых" }));

    expect(screen.getByText("Подход 2 из 5")).toBeInTheDocument();
  });

  it("на последнем подходе ведёт к следующему упражнению и сохраняет прогресс", async () => {
    const user = userEvent.setup();
    const { scope } = await renderWorkout(Exercise.Press);

    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByLabelText("Следующий подход"));
    }

    const finish = screen.getByRole("link", { name: "Следующее упражнение" });
    expect(finish).toHaveAttribute("href", "/workout/squats");

    await user.click(finish);

    await waitFor(() => {
      expect(scope.getState(ProgressStore.store.$progress).press).toEqual({
        week: 1,
        day: 2,
        level: 1,
      });
    });
  });

  it("после приседаний предлагает завершить тренировку", async () => {
    const user = userEvent.setup();
    await renderWorkout(Exercise.Squats);

    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByLabelText("Следующий подход"));
    }

    expect(screen.getByRole("link", { name: "Завершить тренировку" })).toHaveAttribute(
      "href",
      "/day-end",
    );
  });
});
