"use client";

import React from "react";
import { useController } from "react-hook-form";
import { NumberInput as UiNumberInput } from "@ui/NumberInput";
import type { NumberInputProps as UiNumberInputProps } from "@ui/NumberInput";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface NumberInputProps<T extends FieldValues> extends Omit<
  UiNumberInputProps,
  "value" | "defaultValue" | "onChange" | "name" | "error"
> {
  control: Control<T>;
  name: FieldPath<T>;
}

export const NumberInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: NumberInputProps<T>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <UiNumberInput
      {...props}
      error={fieldState.error?.message}
      name={field.name}
      onBlur={field.onBlur}
      onChange={(value) => {
        field.onChange(value === "" ? undefined : Number(value));
      }}
      ref={field.ref}
      value={field.value as number | undefined}
    />
  );
};
