import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MantineProvider } from "@ui/MantineProvider";
import { RepsCounter } from "./RepsCounter";

const renderCounter = (isLast: boolean) =>
  render(
    <MantineProvider>
      <RepsCounter isLast={isLast} reps={12} setNumber={isLast ? 5 : 2} total={5} />
    </MantineProvider>,
  );

describe("RepsCounter", () => {
  it("показывает номер подхода и повторения", () => {
    renderCounter(false);

    expect(screen.getByText("Подход 2 из 5")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("повторений")).toBeInTheDocument();
    expect(screen.queryByText("не меньше")).not.toBeInTheDocument();
  });

  it("на последнем подходе просит сделать не меньше", () => {
    renderCounter(true);

    expect(screen.getByText("не меньше")).toBeInTheDocument();
    expect(screen.getByText("Последний подход — выложись по максимуму")).toBeInTheDocument();
  });
});
