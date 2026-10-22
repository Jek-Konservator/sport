import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MantineProvider } from "@ui/MantineProvider";
import "@shared/config/dayjs";
import { DayEnd } from "./DayEnd";

describe("DayEnd", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("показывает дату следующей тренировки", () => {
    vi.useFakeTimers({ now: new Date("2026-10-22T18:00:00"), toFake: ["Date"] });

    render(
      <MantineProvider>
        <DayEnd />
      </MantineProvider>,
    );

    expect(screen.getByText("На сегодня всё!")).toBeInTheDocument();
    expect(screen.getByText("понедельник, 26 октября")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "На главную" })).toHaveAttribute("href", "/");
  });
});
