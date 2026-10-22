import React from "react";
import { screen } from "@testing-library/react";
import { allSettled, fork } from "effector";
import { describe, expect, it, vi } from "vitest";
import { renderWithScope } from "@shared/test";
import { TrainingApi } from "@entities/Training/api";
import { PROGRESS_MAP_DEFAULT } from "@entities/Training/config/constants";
import { ProgressStore } from "@entities/Training/model/store";
import { Settings } from "./Settings";

vi.mock("@entities/Training/api", () => ({
  TrainingApi: { getProgress: vi.fn(), saveProgress: vi.fn() },
}));

describe("Settings", () => {
  it("до загрузки прогресса не показывает формы", () => {
    renderWithScope(<Settings />);

    expect(screen.queryByRole("button", { name: "Сохранить" })).not.toBeInTheDocument();
  });

  it("показывает форму для каждого упражнения", async () => {
    vi.mocked(TrainingApi.getProgress).mockResolvedValue(PROGRESS_MAP_DEFAULT);
    const scope = fork();
    await allSettled(ProgressStore.event.progressRequestedEv, { scope });

    renderWithScope(<Settings />, scope);

    expect(screen.getAllByRole("button", { name: "Сохранить" })).toHaveLength(3);
    expect(screen.getAllByLabelText("Неделя")).toHaveLength(3);
  });
});
