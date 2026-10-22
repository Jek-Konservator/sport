import React from "react";
import { screen } from "@testing-library/react";
import { allSettled, fork } from "effector";
import { describe, expect, it, vi } from "vitest";
import { renderWithScope } from "@shared/test";
import { TrainingApi } from "@entities/Training/api";
import { PROGRESS_MAP_DEFAULT } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { Home } from "./Home";

vi.mock("@entities/Training/api", () => ({
  TrainingApi: { getProgress: vi.fn() },
}));

describe("Home", () => {
  it("показывает карточки упражнений с текущим прогрессом", async () => {
    vi.mocked(TrainingApi.getProgress).mockResolvedValue({
      ...PROGRESS_MAP_DEFAULT,
      squats: { week: 3, day: 2, level: 2 },
    });
    const scope = fork();
    await allSettled(ProgressStore.event.progressRequestedEv, { scope });

    renderWithScope(<Home />, scope);

    expect(screen.getByRole("link", { name: "Начать тренировку" })).toHaveAttribute(
      "href",
      "/workout/pushUps",
    );
    expect(screen.getByRole("heading", { name: "Приседания" })).toBeInTheDocument();
    expect(screen.getByText("Неделя 3")).toBeInTheDocument();
    expect(screen.getByText("5 подходов · 12 повторений · отдых 60 с")).toBeInTheDocument();
  });
});
