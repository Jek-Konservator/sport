import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { MantineProvider } from "@ui/MantineProvider";
import { NumberInput } from "./NumberInput";

interface Values {
  week?: number;
}

const Probe = ({ onValue }: { onValue: (value: Values) => void }) => {
  const { control, watch } = useForm<Values>({ defaultValues: { week: 2 } });
  onValue(watch());

  return <NumberInput control={control} label="Неделя" name="week" />;
};

describe("NumberInput adapter", () => {
  it("пишет в форму число и undefined при очистке", async () => {
    const values: Values[] = [];
    render(
      <MantineProvider>
        <Probe onValue={(value) => values.push(value)} />
      </MantineProvider>,
    );
    const input = screen.getByLabelText("Неделя");

    await userEvent.clear(input);
    expect(values.at(-1)?.week).toBeUndefined();

    await userEvent.type(input, "5");
    expect(values.at(-1)?.week).toBe(5);
  });
});
