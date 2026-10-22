"use client";

import React from "react";
import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  className?: string;
}

export const Form = <T extends FieldValues>({ children, className, onSubmit }: FormProps<T>) => {
  const { handleSubmit } = useFormContext<T>();

  return (
    <form className={className} noValidate onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
};
