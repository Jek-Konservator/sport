import React from "react";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithScope } from "@shared/test";
import { TrainingApi } from "@entities/Training/api";
import { ProgressStore } from "@entities/Training/model/store";
import { Exercise } from "@entities/Training/model/types";
import { ProgressForm } from "./ProgressForm";

vi.mock("@ui/NotificationSystem", () => ({ notify: { show: vi.fn() } }));
vi.mock("@entities/Training/api", () => ({
  TrainingApi: { getProgress: vi.fn(), saveProgress: vi.fn() },
}));

describe("ProgressForm", () => {
  it("сохраняет изменённый прогресс упражнения", async () => {
    vi.mocked(TrainingApi.saveProgress).mockImplementation(({ progress }) =>
      Promise.resolve(progress),
    );
    const user = userEvent.setup();
    const { scope } = renderWithScope(
      <ProgressForm exercise={Exercise.Squats} progress={{ week: 1, day: 1, level: 1 }} />,
    );
    const save = screen.getByRole("button", { name: "Сохранить" });

    expect(save).toBeDisabled();

    const week = screen.getByLabelText("Неделя");
    await user.clear(week);
    await user.type(week, "4");
    await user.click(save);

    await waitFor(() => {
      expect(scope.getState(ProgressStore.store.$progress).squats).toEqual({
        week: 4,
        day: 1,
        level: 1,
      });
    });
  });

  it("показывает ошибку и не сохраняет пустое поле", async () => {
    const user = userEvent.setup();
    renderWithScope(
      <ProgressForm exercise={Exercise.Press} progress={{ week: 2, day: 1, level: 1 }} />,
    );

    const level = screen.getByLabelText("Уровень");
    await user.clear(level);
    await user.click(screen.getByRole("button", { name: "Сохранить" }));

    const field = level.closest(".mantine-InputWrapper-root");
    expect(field).not.toBeNull();
    expect(within(field as HTMLElement).getByText("Обязательное поле")).toBeInTheDocument();
    expect(TrainingApi.saveProgress).not.toHaveBeenCalled();
  });
});
