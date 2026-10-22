import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MantineProvider } from "@ui/MantineProvider";
import { SetTracker } from "./SetTracker";

describe("SetTracker", () => {
  it("показывает выполненные, текущий и будущие подходы", () => {
    render(
      <MantineProvider>
        <SetTracker current={1} sets={[5, 7, 9]} />
      </MantineProvider>,
    );

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass("done");
    expect(items[0]).not.toHaveTextContent("5");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[1]).toHaveTextContent("7");
    expect(items[2]).toHaveTextContent("9");
  });
});
